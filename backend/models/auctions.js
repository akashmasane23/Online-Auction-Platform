const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: String, default: null },
  endTime: { type: Date, required: true },
  isClosed: { type: Boolean, default: false }
});

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
