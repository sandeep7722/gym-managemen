import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to login
    navigate('/');
  };

  const handleAddCustomer = () => {
    // Placeholder for add customer functionality
    alert('Add Customer - Feature coming soon');
  };

  const handleMarkAttendance = () => {
    // Placeholder for mark attendance functionality
    alert('Mark Attendance - Feature coming soon');
  };

  return (
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
  );
}

export default Header;