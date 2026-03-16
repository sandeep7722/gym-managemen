import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { customerDetails } from '../data/customerDetails';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // 'attendance' or 'addCustomer'
  const [customerIdentifier, setCustomerIdentifier] = useState('');
  const [error, setError] = useState('');
  // Add Customer form states
  const [customerName, setCustomerName] = useState('');
  const [customerGender, setCustomerGender] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerReferenceId, setCustomerReferenceId] = useState('');
  const [customerAge, setCustomerAge] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [uploadPic, setUploadPic] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentTill, setPaymentTill] = useState('');
  const [membership, setMembership] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddCustomer = () => {
    setModalType('addCustomer');
  };

  const handleMarkAttendance = () => {
    setModalType('attendance');
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    const customer = customerDetails.find(
      (c) => c.customer_id === customerIdentifier || c.customer_phoneNo === customerIdentifier
    );
    if (customer) {
      customer.last_attendance_date = new Date().toISOString().split('T')[0];
      alert(`Attendance marked for ${customer.customer_name}`);
      closeModal();
    } else {
      setError('Customer not found');
    }
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    const newCustomer = {
      customer_id: (customerDetails.length + 1).toString(),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phoneNo: customerPhone,
      customer_address: customerAddress,
      customer_age: parseInt(customerAge) || 0,
      customer_gender: customerGender,
      customer_referenceId: customerReferenceId,
      customer_gymId: 'GYM001', // Default
      customer_paymentStatus: 'Pending', // Default
      customer_picUrl: uploadPic ? 'uploaded' : 'https://example.com/default.jpg',
      payment_date: paymentDate,
      payment_till: paymentTill,
      membership: membership,
      last_attendance_date: '',
      last_profile_update: currentDate
    };
    customerDetails.push(newCustomer);
    alert('Customer added successfully');
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setCustomerIdentifier('');
    setError('');
    // Reset add customer fields
    setCustomerName('');
    setCustomerGender('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerReferenceId('');
    setCustomerAge('');
    setCustomerAddress('');
    setUploadPic(null);
    setPaymentDate('');
    setPaymentTill('');
    setMembership('');
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

      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalType === 'attendance' && (
              <>
                <h3>Mark Attendance</h3>
                <form onSubmit={handleAttendanceSubmit}>
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
              </>
            )}
            {modalType === 'addCustomer' && (
              <>
                <h3>Add Customer</h3>
                <form onSubmit={handleAddCustomerSubmit}>
                  <label>Name <span style={{color: 'red'}}>*</span>:</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

                  <label>Gender <span style={{color: 'red'}}>*</span>:</label>
                  <select value={customerGender} onChange={(e) => setCustomerGender(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <label>Age:</label>
                  <input type="number" value={customerAge} onChange={(e) => setCustomerAge(e.target.value)} />

                  <label>Phone Number <span style={{color: 'red'}}>*</span>:</label>
                  <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />

                  <label>Address:</label>
                  <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />

                  <label>Email:</label>
                  <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />

                  <label>Reference ID:</label>
                  <input type="text" value={customerReferenceId} onChange={(e) => setCustomerReferenceId(e.target.value)} required />

                  <label>Upload Picture:</label>
                  <input type="file" onChange={(e) => setUploadPic(e.target.files[0])} />

                  <label>Payment Date:</label>
                  <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />

                  <label>Payment Till:</label>
                  <input type="date" value={paymentTill} onChange={(e) => setPaymentTill(e.target.value)} required />

                  <label>Membership:</label>
                  <select value={membership} onChange={(e) => setMembership(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Gold">Gold</option>
                    <option value="Basic">Basic</option>
                  </select>

                  <button type="submit">Add Customer</button>
                </form>
              </>
            )}
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;