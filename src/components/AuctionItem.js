import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AuctionItem.css';

const AuctionItem = () => {
  const { id } = useParams();
  const [currentBid, setCurrentBid] = useState(200);

  const handleBid = () => {
    setCurrentBid(currentBid + 10);
  };

  return (
    <div className="auction-item">
      <h2>Auction Item {id}</h2>
      <p>Current Bid: ${currentBid}</p>
      <button onClick={handleBid}>Place Bid (+$10)</button>
    </div>
  );
};

export default AuctionItem;