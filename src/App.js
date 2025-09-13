import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Add this
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'; 
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView'; // We'll create this
 // We'll create this
import './App.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/tasks" />;
}
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                 <Route path="/" element={<HomePage />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={
                  <ProtectedRoute><TaskList /></ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute><CalendarView /></ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;