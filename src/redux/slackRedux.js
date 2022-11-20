import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
  userToken: "",
  // mobileId: "",
};

const slackSlice = createSlice({
  name: "slackReducer",
  initialState,
  reducers: {
    storeRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    storeUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    // storeMobileId: (state, { payload }) => {
    //   state.mobileId = payload;
    // },
    logoutMobileId: (state) => {
      state.userToken = "";
    },
  },
});

export const { storeRoomId, storeUserToken, storeMobileId, logoutMobileId } =
  slackSlice.actions;

export default slackSlice.reducer;
