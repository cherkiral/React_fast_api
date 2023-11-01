import React, { useState, useEffect } from 'react';
import './WalletForm.css';

function WalletForm() {
  const [walletAddress, setWalletAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [numTransactions, setNumTransactions] = useState(10);
  const [showValue, setShowValue] = useState(false);
  const [showReceiver, setShowReceiver] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(false);

  const handleValueChange = (e) => {
    setShowValue(e.target.checked);
  };

  const handleReceiverChange = (e) => {
    setShowReceiver(e.target.checked);
  };

  const handleTimestampChange = (e) => {
    setShowTimestamp(e.target.checked);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newWalletAddress = document.getElementById('walletAddress').value;

    // Gradually make the existing transactions disappear
    const transactionItems = document.querySelectorAll('.transactions li');
    transactionItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 0;
        setTimeout(() => {
          setTransactions([]); // Clear the transactions
        }, 500); // After the fade-out animation
      }, index * 100);
    });

    // Fetch new transactions
    setTimeout(() => {
      fetchNewTransactions(newWalletAddress);
    }, numTransactions * 100);
  };

  const fetchNewTransactions = async (address) => {
    try {
      const response = await fetch(`http://localhost:8000/get_last_transactions/${address}?number_of_transactions=${numTransactions}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.data);
      } else {
        console.error('Failed to fetch transaction data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
  };

  useEffect(() => {
    const transactionItems = document.querySelectorAll('.transactions li');
    transactionItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
      }, index * 100);
    });
  }, [transactions]);

  return (
    <div className="wallet-form">
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

        <div className="range-slider">
          <input
            type="range"
            id="numTransactions"
            min="1"
            max="10"
            value={numTransactions}
            onChange={(e) => setNumTransactions(e.target.value)}
          />
        </div>

        <p className="serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}>
          Number of Transactions: {numTransactions}
        </p>

        <div className="checkboxes">
          <label className="checkbox-label serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}>
            <input
              type="checkbox"
              checked={showValue}
              onChange={handleValueChange}
            />
            Show Value
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-label serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}>
            <input
              type="checkbox"
              checked={showReceiver}
              onChange={handleReceiverChange}
            />
            Show Receiver
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-label serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}>
            <input
              type="checkbox"
              checked={showTimestamp}
              onChange={handleTimestampChange}
            />
            Show Timestamp
            <span className="checkmark"></span>
          </label>
        </div>

        <input type="submit" value="Submit" className="custom-button" />
      </form>

      <div className="transactions">
        {submitted && (
          <h2 className="serif-font">Recent Transactions</h2>
        )}
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">
                {transaction.hash}
              </a>
              {showValue && <span className="serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}> Value: {transaction.value}</span>}
              {showReceiver && <span className="serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}> Receiver: {transaction.to}</span>}
              {showTimestamp && <span className="serif-font" style={{ color: '#8F8F8F', fontSize: '18px' }}> Timestamp: {transaction.timeStamp}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default WalletForm;