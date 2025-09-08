import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  // Trigger the refresh when a new user is created
  const handleUserCreation = () => {
    setRefresh(!refresh);  // Toggle refresh to trigger re-fetch of users
  };

  return (
    <div>
      <h1>React and FastAPI Example</h1>
      <UserForm onUserCreated={handleUserCreation} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;
