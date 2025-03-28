import React, { useState } from 'react';

// Main App Component
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Login Form Component
  const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Simple validation
      if (email === 'user@example.com' && password === 'password123') {
        setIsLoggedIn(true);
        setUsername(email);
      } else {
        setError('Invalid email or password');
      }
    };

    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard: React.FC = () => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
    };

    return (
      <div className="dashboard">
        <h2>Welcome, {username}!</h2>
        <p>You are now logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  // Render logic
  return (
    <div className="app">
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
};

export default App;