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
    if (filter !== '') {
      return;
    }

    if (contacts.length !== 0) {
      localStorage.setItem(KEY, JSON.stringify(contacts));
    }
  }, [contacts, filter]);

  const addContact = (name, number) => {
    const checkName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (filter !== '') {
      alert('filter needs to be cleaned');
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
    setFilter(target.value);
    filterContact(target.value.toLowerCase());
  };

  const filterContact = filterLow => {
    const saveContacts = JSON.parse(localStorage.getItem(KEY));

    if (filterLow === '') {
      setContacts(saveContacts);
      return;
    }

    setContacts(
      saveContacts.filter(contact =>
        contact.name.toLowerCase().includes(filterLow)
      )
    );
    //setFilter(filterLow);
  };

  const deleteContact = id => {
    if (filter !== '') {
      alert('filter needs to be cleaned');
      return;
    }

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
        contacts={contacts}
        deleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};
