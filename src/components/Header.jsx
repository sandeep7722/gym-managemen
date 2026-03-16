import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { customerDetails } from '../data/customerDetails';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerIdentifier, setCustomerIdentifier] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddCustomer = () => {
    alert('Add Customer - Feature coming soon');
  };

  const handleMarkAttendance = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const customer = customerDetails.find(
      (c) => c.customer_id === customerIdentifier || c.customer_phoneNo === customerIdentifier
    );
    if (customer) {
      alert(`Attendance marked for ${customer.customer_name}`);
      setIsModalOpen(false);
      setCustomerIdentifier('');
      setError('');
    } else {
      setError('Customer not found');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomerIdentifier('');
    setError('');
  };

  return (
    <>
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Gym Management</h1>
        <div>
          {location.pathname === '/' ? (
            <button onClick={handleMarkAttendance} style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}>Mark Attendance</button>
          ) : (
            <>
              <button onClick={handleAddCustomer} style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}>Add Customer</button>
              <button onClick={handleMarkAttendance} style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}>Mark Attendance</button>
              <button onClick={handleLogout} style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}>Logout</button>
            </>
          )}
        </div>
      </header>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Mark Attendance</h3>
            <form onSubmit={handleModalSubmit}>
              <label>Customer ID or Phone Number:</label>
              <input
                type="text"
                value={customerIdentifier}
                onChange={(e) => setCustomerIdentifier(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Submit</button>
            </form>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;