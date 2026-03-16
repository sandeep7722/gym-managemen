import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerDetails } from '../data/ownerDetails';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const owner = ownerDetails.find(
      (o) => (o.owner_id === identifier || o.owner_phoneNo === identifier) && o.password === password
    );
    if (owner) {
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Owner Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Owner ID or Phone Number:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;