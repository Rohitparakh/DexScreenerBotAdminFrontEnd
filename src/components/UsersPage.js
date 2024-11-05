import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dexscreenerbot-admin.onrender.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className='text-white'>Users List</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-card">
            <h2>{user.username}</h2>
            <p><strong>Chat ID:</strong> {user.chatId}</p>
            <p><strong>Subscribed:</strong> {user.isSubscribed ? 'Yes' : 'No'}</p>
            <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
