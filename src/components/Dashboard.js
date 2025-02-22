import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ isAuthenticated }) => {
  const auctions = [
    { id: 1, title: 'Vintage Watch', description: 'A rare vintage watch.', currentBid: 150, image: 'watch.jpg' },
    { id: 2, title: 'Art Painting', description: 'A beautiful landscape painting.', currentBid: 300, image: 'painting.jpg' },
  ];

  return (
    <div className="dashboard-container">
      <h2>Active Auctions</h2>
      <div className="auctions-grid">
        {auctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <img src={auction.image} alt={auction.title} className="auction-image" />
            <div className="auction-details">
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
              <p>Current Bid: ${auction.currentBid}</p>
              <Link to={`/auction/${auction.id}`} className="bid-button">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;