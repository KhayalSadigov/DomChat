import { configureStore } from "@reduxjs/toolkit";
import settingsReducers from "./settingSlice/settingSlice.js";

const store = configureStore({
  reducer: {
    settings: settingsReducers,
  },
});

export default store;
