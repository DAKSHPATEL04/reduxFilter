import { createSlice } from "@reduxjs/toolkit";

// ✅ This MUST be the structure!
const initialState = {
  data: [],
  filterDate: "",
};

const TimeLogSlice = createSlice({
  name: "timeLog",
  initialState,
  reducers: {
    addUsere: (state, action) => {
      if (!state.data) state.data = []; // ✅ fail-safe
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, chack, startTime, endTime, house, work, description, date } =
        action.payload;
      const user = state.data.find((u) => u.id === id);
      if (user) {
        Object.assign(user, {
          chack,
          startTime,
          endTime,
          house,
          work,
          description,
          date,
        });
      }
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
  },
});

export const { addUsere, deleteUser, updateUser, setFilterDate } =
  TimeLogSlice.actions;
export default TimeLogSlice.reducer;
