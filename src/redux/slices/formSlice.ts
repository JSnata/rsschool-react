import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreFormData } from '../../types/types';
import { countries } from '../../data/countries';

export interface FormState {
  formDataList: StoreFormData[];
  countries: string[];
}

const initialState: FormState = {
  formDataList: [],
  countries: countries,
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
