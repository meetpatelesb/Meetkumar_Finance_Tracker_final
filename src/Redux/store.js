import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./ducks/transactionSlice";
import registrationSlice from "./ducks/registrationSlice";
import loginSlice from "./ducks/loginSlice";

export const store = configureStore({
  reducer: {
    meet: transactionSlice,
    userData: registrationSlice,
    loginData:loginSlice
  },
});

export default store;
