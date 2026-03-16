import { useState } from 'react';
import { customerDetails } from '../data/customerDetails';

function Home() {
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phoneNo: '',
    customer_gender: '',
    customer_age: '',
    customer_address: '',
    customer_referenceId: '',
    payment_date: '',
    payment_till: '',
    membership: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const getCardClass = (paymentTill) => {
    const tillDate = new Date(paymentTill);
    const today = new Date();
    const diffTime = tillDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'red';
    if (diffDays <= 7) return 'yellow';
    return 'green';
  };

  const filteredCustomers = customerDetails.filter(customer =>
    customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_phoneNo.includes(searchTerm)
  );

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setEditForm({
      customer_name: customer.customer_name,
      customer_email: customer.customer_email,
      customer_phoneNo: customer.customer_phoneNo,
      customer_gender: customer.customer_gender,
      customer_age: customer.customer_age,
      customer_address: customer.customer_address,
      customer_referenceId: customer.customer_referenceId,
      payment_date: customer.payment_date,
      payment_till: customer.payment_till,
      membership: customer.membership
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const index = customerDetails.findIndex(c => c.customer_id === editingCustomer.customer_id);
    if (index !== -1) {
      customerDetails[index] = {
        ...customerDetails[index],
        ...editForm,
        last_profile_update: new Date().toISOString().split('T')[0]
      };
      alert('Customer updated successfully');
      setEditingCustomer(null);
    }
  };

  const closeEditModal = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="home">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID, Name, or Phone Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="customer-grid">
        {filteredCustomers.map((customer) => (
          <div key={customer.customer_id} className={`customer-card ${getCardClass(customer.payment_till)}`}>
            <div className="card-header">
              <h3>{customer.customer_name}</h3>
              <button className="edit-btn" onClick={() => handleEdit(customer)}>✏️</button>
            </div>
            <p><strong>ID:</strong> {customer.customer_id}</p>
            <p><strong>Phone:</strong> {customer.customer_phoneNo}</p>
            <p><strong>Gender:</strong> {customer.customer_gender}</p>
            <p><strong>Last Payment Date:</strong> {customer.payment_date}</p>
            <p><strong>Payment Till:</strong> {customer.payment_till}</p>
            <p><strong>Membership:</strong> {customer.membership}</p>
            <p><strong>Last Attendance:</strong> {customer.last_attendance_date || 'N/A'}</p>
            <p><strong>Last Profile Update:</strong> {customer.last_profile_update}</p>
          </div>
        ))}
      </div>

      {editingCustomer && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Customer</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>ID:</label>
                  <input type="text" value={editingCustomer.customer_id} readOnly />
                </div>
                <div className="form-group">
                  <label>Reference ID:</label>
                  <input type="text" value={editForm.customer_referenceId} onChange={(e) => setEditForm({...editForm, customer_referenceId: e.target.value})} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" value={editForm.customer_name} onChange={(e) => setEditForm({...editForm, customer_name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select value={editForm.customer_gender} onChange={(e) => setEditForm({...editForm, customer_gender: e.target.value})} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age:</label>
                  <input type="number" value={editForm.customer_age} onChange={(e) => setEditForm({...editForm, customer_age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input type="text" value={editForm.customer_phoneNo} onChange={(e) => setEditForm({...editForm, customer_phoneNo: e.target.value})} required />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Address:</label>
                <input type="text" value={editForm.customer_address} onChange={(e) => setEditForm({...editForm, customer_address: e.target.value})} />
              </div>

              <div className="form-group full-width">
                <label>Email:</label>
                <input type="email" value={editForm.customer_email} onChange={(e) => setEditForm({...editForm, customer_email: e.target.value})} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Payment Date:</label>
                  <input type="date" value={editForm.payment_date} onChange={(e) => setEditForm({...editForm, payment_date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Payment Till:</label>
                  <input type="date" value={editForm.payment_till} onChange={(e) => setEditForm({...editForm, payment_till: e.target.value})} required />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Membership:</label>
                <select value={editForm.membership} onChange={(e) => setEditForm({...editForm, membership: e.target.value})} required>
                  <option value="">Select</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={closeEditModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;