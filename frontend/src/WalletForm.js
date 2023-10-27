import React, { useState } from 'react';
import './WalletForm.css';

function WalletForm() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balanceInfo, setBalanceInfo] = useState(null); // State to store balance information

  const handleSubmit = async (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('walletAddress').value;

    // Make an HTTP request to your FastAPI backend
    try {
      const response = await fetch(`http://localhost:8000/balance/${walletAddress}`);
      if (response.ok) {
        const data = await response.json();
        setBalanceInfo(data); // Update the state with the balance information
      } else {
        console.error('Failed to fetch balance information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
  };

  return (
    <div className={`wallet-form ${balanceInfo ? 'show-balance' : ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="walletAddress"
          className="custom-input"
          value={walletAddress}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="walletAddress">
          <span>Ethereum Wallet Address:</span>
        </label>
        <input type="submit" value="Submit" className="custom-button" />
      </form>

      {balanceInfo && (
        <div className="balance-info">
          <h2>Transaction history</h2>
          <p>Amount: {balanceInfo.amount} {balanceInfo.tokenName}</p>
        </div>
      )}
    </div>
  );
}

export default WalletForm;
