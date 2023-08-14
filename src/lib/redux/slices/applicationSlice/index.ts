import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ApplicationSliceState = {
  sidebar: {
    open: true,
    expandedChildren: [],
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.sidebar = { open: action.payload, expandedChildren: [] };
      } else {
        state.sidebar.open = action.payload;
      }
    },
    setExpansionState: (state, action: PayloadAction<string[]>) => {
      state.sidebar.expandedChildren = action.payload;
    },
  },
});

/* Types */
export interface ApplicationSliceState {
  sidebar: {
    open: boolean;
    expandedChildren: string[];
  };
}
