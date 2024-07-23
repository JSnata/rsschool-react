import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { People } from '../../types/types';

export interface itemsState {
  items: People[];
  selectedItem: People | null;
  selectedItems: string[];
  isLoading: boolean;
  error: string;
}

const initialState: itemsState = {
  items: [],
  selectedItem: null,
  selectedItems: [],
  isLoading: false,
  error: '',
};

export const itemsSlice = createSlice({
  name: 'item',
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
    toggleSelectedItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter(
          (itemId) => itemId !== id,
        );
      } else {
        state.selectedItems.push(id);
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setItems,
  setSelectedItem,
  setIsLoading,
  setError,
  toggleSelectedItem,
  unselectAllItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;
