import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // "light" , "dark"
  lang: "en", // "en" , "az" , "ru"
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // Action to set the theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    // Action to set the language
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setTheme, setLang } = settingSlice.actions;
export default settingSlice.reducer;
