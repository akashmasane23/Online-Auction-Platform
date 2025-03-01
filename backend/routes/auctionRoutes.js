const express = require("express");
const Auction = require("../models/auctions");
const router = express.Router();

// 🟢 POST - Add new auction
router.post("/auction", async (req, res) => {
  try {
    console.log("🔹 Auction POST request received:", req.body);

    const { title, description, startingBid, endTime } = req.body;

    if (!title || !description || !startingBid || !endTime) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const auction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid, // Default current bid
      endTime,
      isClosed: false,
      highestBidder: null,
    });

    await auction.save();
    console.log("✅ Auction created successfully:", auction);
    res.status(201).json({ message: "Auction created successfully!", auction });

  } catch (error) {
    console.error("❌ Error creating auction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟢 GET - Fetch all auctions
router.get("/auctions", async (req, res) => {
  try {
    console.log("🔹 Fetching all auctions...");
    const auctions = await Auction.find();
    console.log("✅ Auctions retrieved:", auctions);
    res.status(200).json(auctions);
  } catch (error) {
    console.error("❌ Error fetching auctions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟢 GET - Fetch single auction by ID
router.get("/auctions/:id", async (req, res) => {
  try {
    console.log("🔹 Fetching auction with ID:", req.params.id);
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }
    res.json(auction);
  } catch (error) {
    console.error("❌ Error fetching auction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟢 POST - Place a bid on an auction item
router.post("/bid/:id", async (req, res) => {
  try {
    const { bidAmount, bidderName } = req.body;
    const auctionId = req.params.id;

    console.log(`🔹 Received bid: ${bidAmount} from ${bidderName} for auction ${auctionId}`);

    if (!bidAmount || !bidderName) {
      return res.status(400).json({ error: "Bid amount and bidder name are required!" });
    }

    if (typeof bidAmount !== "number" || bidAmount <= 0) {
      return res.status(400).json({ error: "Bid amount must be a positive number!" });
    }

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ error: "Auction item not found" });
    }

    // Check if auction time has expired
    const currentTime = new Date();
    if (currentTime >= new Date(auction.endTime)) {
      auction.isClosed = true;
      await auction.save();
      return res.status(400).json({ error: "Auction time is over, no further bids allowed." });
    }

    // Check if auction is already closed
    if (auction.isClosed) {
      return res.status(400).json({ error: "Auction is already closed!" });
    }

    // Check if bid is higher than the current bid
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ error: "Bid must be higher than the current bid" });
    }

    // Update the auction with the new highest bid and bidder
    auction.currentBid = bidAmount;
    auction.highestBidder = bidderName;

    await auction.save();
    console.log("✅ Bid placed successfully:", auction);
    res.status(200).json({ message: "Bid placed successfully", auction });

  } catch (error) {
    console.error("❌ Error placing bid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
