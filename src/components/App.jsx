import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import * as storage from "./LocalStorage/LocalStorage";

const STORAGE_KEY = "contacts";
const startContact = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState(startContact);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = storage.get(STORAGE_KEY);
    if (contacts && contacts.length > 0) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEY, contacts);
  }, [contacts]);

  // componentDidMount() {
  //   const savedContacts = storage.get(STORAGE_KEY);
  //   if (savedContacts) {
  //     this.setState({ contacts: savedContacts });
  //   }
  // }
  // componentDidUpdate(prevState) {
  //   const newContact = this.state.contacts;
  //   const prevContact = prevState.contacts;

  //   if (newContact?.length !== prevContact?.length)
  //     storage.save(STORAGE_KEY, newContact);
  // }

  function addContact(name, number) {
    const searchSameName = contacts
      .map((cont) => cont.name.toLowerCase())
      .includes(name.toLowerCase());

    if (searchSameName) {
      alert(`${name} is already in contacts`);
    } else if (name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      setContacts([...contacts, contact]);
    }
  }

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>

      <Filter filter={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemoveContact={removeContact}
      />
    </div>
  );
}
