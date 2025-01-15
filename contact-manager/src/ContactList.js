import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts yet!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {contacts.map((contact, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>
                <strong>{contact.name}</strong> <br />
                <span style={{ fontSize: '12px', color: '#555' }}>{contact.email}</span>
              </div>
              <FaTrash
                onClick={() => deleteContact(index)}
                style={{ color: 'red', cursor: 'pointer' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
