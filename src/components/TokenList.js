import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/TokenList.css'; // Import the CSS file

const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchTokens = async () => {
    try {
      const response = await axios.get('https://dexscreenerbot-admin.onrender.com/tokens', {
        params: {
          from: fromDate ? new Date(fromDate).toISOString() : '',
          to: toDate ? new Date(toDate).toISOString() : '',
        },
      });
      setTokens(response.data);
    } catch (error) {
      console.error('Error fetching tokens', error);
    }
  };

  function formatNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B'; // Billions
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M'; // Millions
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K'; // Thousands
    } else {
        return num?.toString(); // Less than 1000
    }
}

  useEffect(() => {
    fetchTokens();
  }, [fromDate, toDate]);

  return (
    <div className="token-list-container">
      <h1>Token List</h1>
      <div className="filter-container">
        <div>
        <label>From Date:</label>
        <input
          type="datetime-local"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        </div>
        <div>
        <label>To Date:</label>
        <input
          type="datetime-local"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        </div>
        <button onClick={fetchTokens}>Filter</button>
      </div>
      <div className='token-list-table'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Boost Amount</th>
            <th>Token Address</th>
            <th>First Fetched At</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token._id}>
              <td>{token.name}</td>
              <td>{token.symbol}</td>
              <td>{formatNumber(token.marketCap)}</td>
              <td>{token.boostAmount}</td>
              <td>{token.tokenAddress}</td>
              <td>{new Date(token.firstFetchedAt).toUTCString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TokenList;
