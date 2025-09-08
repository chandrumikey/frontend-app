import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ refresh }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
