import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { LiftStatus } from "../generated/graphql";

interface ILiftState {
  currentLiftStatus: LiftStatus | undefined | "ALL";
  liftId: string;
}

const initialState: ILiftState = {
  currentLiftStatus: undefined,
  liftId: "",
};

export const liftSlice = createSlice({
  name: "lift",
  initialState,
  reducers: {
    setCurrentLiftStatus: (
      state,
      action: PayloadAction<LiftStatus | undefined | "ALL">
    ) => {
      state.currentLiftStatus = action.payload;
    },
    setLiftId: (state, action: PayloadAction<string>) => {
      state.liftId = action.payload;
    },
  },
});

export const { setCurrentLiftStatus, setLiftId } = liftSlice.actions;

export const selectCurrentLiftStatus = (state: RootState) =>
  state.lift.currentLiftStatus;
export const selectLiftId = (state: RootState) => state.lift.liftId;

export default liftSlice.reducer;
