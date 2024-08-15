import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreFormData } from '../../types/types';

export interface FormState {
  formDataList: StoreFormData[];
}

const initialState: FormState = {
  formDataList: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData(state, action: PayloadAction<StoreFormData>) {
      state.formDataList.push(action.payload);
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
