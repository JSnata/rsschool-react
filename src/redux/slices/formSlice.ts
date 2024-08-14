import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
}

export interface FormState {
  uncontrolledData: FormData | null;
  controlledData: FormData | null;
}

const initialState: FormState = {
  uncontrolledData: null,
  controlledData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveUncontrolledData(state, action: PayloadAction<FormData>) {
      state.uncontrolledData = action.payload;
    },
    saveControlledData(state, action: PayloadAction<FormData>) {
      state.controlledData = action.payload;
    },
  },
});

export const { saveUncontrolledData, saveControlledData } = formSlice.actions;
export default formSlice.reducer;
