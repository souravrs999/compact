/* Instruments */
import { counterSlice } from "./slices/counterSlice";
import { applicationSlice } from "./slices/applicationSlice";

export const reducer = {
  application: applicationSlice.reducer,
  counter: counterSlice.reducer,
};
