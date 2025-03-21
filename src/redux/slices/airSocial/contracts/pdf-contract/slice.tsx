import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITextComponent, ISignatureComponent } from './types';

// Define the initial state with type
interface IAirSocialPdfContractState {
  textComponents: ITextComponent[];
  signatureComponents: ISignatureComponent[];
  currentPage: number;
}

const initialState: IAirSocialPdfContractState = {
  textComponents: [],
  signatureComponents: [],
  currentPage: 1,
};

const airSocialPdfContractSlice = createSlice({
  name: 'airSocialPdfContract',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setTextComponents: (state, action: PayloadAction<ITextComponent[]>) => {
      state.textComponents = action.payload;
    },

    // Add a new text component
    addTextComponent: (state) => {
      state.textComponents.push({
        id: `${Date.now()}`,
        name: `editor-${state.textComponents.length + 1}`,
        content: '',
        x: 0,
        y: 0,
        page: state.currentPage,
      });
    },

    // Delete a text component by ID
    deleteTextComponent: (state, action: PayloadAction<string>) => {
      state.textComponents = state.textComponents.filter(
        (comp) => comp.id !== action.payload,
      );
    },

    // Update a text component's position
    updateTextComponentPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>,
    ) => {
      const textComponent = state.textComponents.find(
        (comp) => comp.id === action.payload.id,
      );
      if (textComponent) {
        textComponent.x = action.payload.x;
        textComponent.y = action.payload.y;
      }
    },

    updateTextComponentContent: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const textComponent = state.textComponents.find(
        (comp) => comp.id === action.payload.id,
      );
      if (textComponent) {
        textComponent.content = action.payload.content;
      }
    },

    addSignatureComponent: (
      state,
      action: PayloadAction<Omit<ISignatureComponent, 'id'>>,
    ) => {
      state.signatureComponents.push({
        id: `${Date.now()}`,
        ...action.payload,
      });
    },
    updateSignaturePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>,
    ) => {
      const signature = state.signatureComponents.find(
        (sig) => sig.id === action.payload.id,
      );
      if (signature) {
        signature.x = action.payload.x;
        signature.y = action.payload.y;
      }
    },
    deleteSignatureComponent: (state, action: PayloadAction<string>) => {
      state.signatureComponents = state.signatureComponents.filter(
        (sig) => sig.id !== action.payload,
      );
    },
  },
});

// Export actions
export const {
  setTextComponents,
  setCurrentPage,
  addTextComponent,
  deleteTextComponent,
  updateTextComponentPosition,
  updateTextComponentContent,
  addSignatureComponent,
  updateSignaturePosition,
  deleteSignatureComponent,
} = airSocialPdfContractSlice.actions;

export default airSocialPdfContractSlice.reducer;
