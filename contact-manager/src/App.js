import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load contacts from localStorage when the component mounts
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts)); // Parse the saved string into a JavaScript array
    }
  }, []);

  // Save contacts to localStorage whenever the contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (indexToDelete) => {
    const updatedContacts = contacts.filter((_, index) => index !== indexToDelete);
    setContacts(updatedContacts);
  };

  // Filtered contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Contact Manager</h1>
      <ContactForm addContact={addContact} />
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
