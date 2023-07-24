// import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { useEffect, useState } from 'react';
const KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saveContacts = JSON.parse(localStorage.getItem(KEY));
    if (saveContacts) {
      setContacts(saveContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== 0) {
      localStorage.setItem(KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (name, number) => {
    const checkName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const newContacts = [...contacts, contact];
    setContacts(newContacts);
  };

  const onFilter = ({ target }) => {
    setFilter(target.value.toLowerCase());
  };

  const filterContacts = filterLow => {
    if (filterLow.trim() === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLow)
    );
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact}> </ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={onFilter}></Filter>
      <ContactList
        contacts={filterContacts(filter.toLowerCase())}
        deleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};
