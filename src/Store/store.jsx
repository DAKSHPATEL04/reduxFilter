import { configureStore } from "@reduxjs/toolkit";
import TimeLogSlice from "../redux/TimeLogReducer";

const loadState = () => {
  try {
    const data = localStorage.getItem("timeLog");
    if (data !== null) {
      return { timeLog: JSON.parse(data) }; // ✅ wrap in `timeLog`
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return undefined;
};

const saveState = (state) => {
  try {
    const data = JSON.stringify(state.timeLog); // ✅ only store timeLog slice
    localStorage.setItem("timeLog", data);
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const store = configureStore({
  reducer: {
    timeLog: TimeLogSlice,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export default store;
