import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./contactsActions";

const items = createReducer([], {
  [actions.addContact]: (state, { payload }) => {
    const dublicate = state.some((c) => c.name === payload.name);
    if (dublicate) {
      return alert(`${payload.name} is already in contacts.`);
    }
    return [...state, payload];
  },
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer("", {
  [actions.changeFilter]: (state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
