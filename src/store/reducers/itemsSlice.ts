import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { People } from '../../types/types';

export interface itemsState {
  items: People[];
  selectedItem: People | null;
  isLoading: boolean;
  error: string;
}

const initialState: itemsState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: '',
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<People[]>) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<People | null>) => {
      state.selectedItem = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setItems, setSelectedItem, setIsLoading, setError } =
  itemsSlice.actions;

export default itemsSlice.reducer;
