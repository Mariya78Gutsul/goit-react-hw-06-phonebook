import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import contactsActions from "../redux/contacts/contactsActions";
import {
  getContactsFiltered,
  getFilter,
} from "../redux/contacts/contactsSelector";
import * as storage from "./LocalStorage/LocalStorage";

const STORAGE_KEY = "contacts";

export default function App() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContactsFiltered);

  useEffect(() => {
    storage.set(STORAGE_KEY, contacts);
  }, [contacts]);

  const addContact = (name, number) => {
    dispatch(contactsActions.addContact(name, number));
  };

  const changeFilter = (e) => {
    dispatch(contactsActions.changeFilter(e.currentTarget.value));
    // setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteContact = (id) => {
    dispatch(contactsActions.deleteContact(id));
    // setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>

      <Filter filter={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemoveContact={deleteContact}
      />
    </div>
  );
}
