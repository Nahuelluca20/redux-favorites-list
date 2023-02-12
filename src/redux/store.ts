import {configureStore} from "@reduxjs/toolkit";

// import {favoritesSlice, peopleSlice} from "./states";
import favoritesSlice from "./states/favorites";
import peopleSlice from "./states/people";

import {Person} from "@/models";

export interface AppStore {
  people: Person[];
  favorites: Person[];
}

export default configureStore<AppStore>({
  reducer: {
    people: peopleSlice,
    favorites: favoritesSlice,
  },
});
