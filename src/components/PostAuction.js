import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostAuction.css';

const PostAuction = () => {
  const [formData, setFormData] = useState({ title: '', description: '', startingBid: '', image: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate posting an auction
    console.log('Auction Posted:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="post-auction-container">
      <div className="post-auction-form">
        <h2>Post Auction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter auction title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter auction description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startingBid">Starting Bid</label>
            <input
              type="number"
              id="startingBid"
              placeholder="Enter starting bid"
              value={formData.startingBid}
              onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
            />
          </div>
        
          <button type="submit" className="submit-button">Post Auction</button>
        </form>
      </div>
    </div>
  );
};

export default PostAuction;