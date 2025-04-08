import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITextComponent, ISignatureComponent, ISignee } from './types';


// Define the initial state with type
interface IAirSocialPdfContractState {
  textComponents: ITextComponent[];
  signatureComponents: ISignatureComponent[];
  currentPage: number;
  containerWidth: number;
  pageDimensions: {
    width: number;
    height: number;
  } | null;

}

const initialState: IAirSocialPdfContractState = {
  textComponents: [],
  signatureComponents: [],
  currentPage: 1,
  containerWidth: 612,
  pageDimensions: null,

};

const airSocialPdfContractSlice = createSlice({
  name: 'airSocialPdfContract',
  initialState,
  reducers: {
    setContainerWidth: (state, action: PayloadAction<number>) => {
      state.containerWidth = action.payload;
    },

    setPageDimensions: (
      state,
      action: PayloadAction<{ width: number; height: number } | null>,
    ) => {
      state.pageDimensions = action.payload;
    },


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
        text: 'Double click to edit',
        x: 50,
        y:
          50 +
          state.textComponents.filter((c) => c.page === state.currentPage)
            .length *
            30,

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
      action: PayloadAction<{ id: string; text: string }>,

    ) => {
      const textComponent = state.textComponents.find(
        (comp) => comp.id === action.payload.id,
      );
      if (textComponent) {
        textComponent.text = action.payload.text;
      }
    },

    setSignatureComponents: (
      state,
      action: PayloadAction<ISignatureComponent[]>,
    ) => {
      state.signatureComponents = action.payload;
    },

    addSignatureComponent: (
      state,
      action: PayloadAction<{ signee: ISignee }>,
    ) => {
      const signaturesOnCurrentPage = state.signatureComponents.filter(
        (sig) => sig.page === state.currentPage,
      );

      const pdfPageWidth = state.pageDimensions?.width || 612;
      const signatureWidth = 150;
      const padding = 50;

      // Calculate positions in original PDF coordinates
      const defaultX = pdfPageWidth - signatureWidth - padding;
      const defaultY = 70 + signaturesOnCurrentPage.length * 30;

      state.signatureComponents.push({
        id: `${Date.now()}`,
        x: defaultX,
        y: defaultY,
        page: state.currentPage,
        signee: action.payload.signee,
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
  setContainerWidth,
  setPageDimensions,
  setCurrentPage,
  setTextComponents,

  addTextComponent,
  deleteTextComponent,
  updateTextComponentPosition,
  updateTextComponentContent,
  setSignatureComponents,

  addSignatureComponent,
  updateSignaturePosition,
  deleteSignatureComponent,
} = airSocialPdfContractSlice.actions;

export default airSocialPdfContractSlice.reducer;
