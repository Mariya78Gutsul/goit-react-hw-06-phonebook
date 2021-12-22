import { createAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const addContact = createAction("contact/add", (name, number) => ({
  payload: {
    id: nanoid(3),
    name,
    number,
  },
}));

const deleteContact = createAction("contact/delete");

const changeFilter = createAction("contact/changeFilter");

const getContacts = createAction("contact/get");

export default { addContact, deleteContact, changeFilter, getContacts };
