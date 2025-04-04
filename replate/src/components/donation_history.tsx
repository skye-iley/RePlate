import React from 'react';

const DonationHistory = () => {
  return (
    <div className="donation-history-container">
      <h2 className="history-heading">Donation History</h2>
      <ul className="donation-list">
        <li className="donation-item">
          <span className="donation-label">Visited Donators</span>
          <span className="donation-value">0</span>
        </li>
        <li className="donation-item">
          <span className="donation-label">Donations Received</span>
          <span className="donation-value">0</span> {/* Replace with appropriate data */}
        </li>
        <li className="donation-item">
          <span className="donation-label">Donations Given</span>
          <span className="donation-value">0</span>
        </li>
        <li className="donation-item">
          <span className="donation-label">Donations Requested</span>
          <span className="donation-value">0</span>
        </li>
      </ul>
    </div>
  );
};

export default DonationHistory;
