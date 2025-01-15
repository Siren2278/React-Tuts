import React, { useState, useRef } from 'react';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);

  const handleValidation = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    addContact({ name, email });
    setName('');
    setEmail('');
    nameInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameInputRef}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: `1px solid ${errors.name ? 'red' : '#ccc'}`,
          }}
        />
        {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: `1px solid ${errors.email ? 'red' : '#ccc'}`,
          }}
        />
        {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
