import {createSlice, current} from "@reduxjs/toolkit";

import {LocalStorageTypes, Person} from "@/models";
import {getLocalStorage, setLocalStorage} from "@/utilities";

const initialState: Person[] = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getLocalStorage(LocalStorageTypes.FAVORITES)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string)
    : initialState,
  reducers: {
    addFavorite: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVORITES, action.payload);

      return action.payload;
    },
    revomeFavorite: (state, action) => {
      const filteredState = current(state).filter((p: Person) => p.id !== action.payload.id);

      setLocalStorage(LocalStorageTypes.FAVORITES, filteredState);

      return filteredState;
    },
  },
});

export const {addFavorite, revomeFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
