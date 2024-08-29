import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';

const initialState = {
  color: 'black',
  fontSize: '16px',
  editorState: EditorState?.createEmpty(),
  columnsData: [] as any,
  fieldData: false,
  disableTemplate: false,
  showTemplate: false,
};

const genericReportSlice = createSlice({
  name: 'genericReport',
  initialState,
  reducers: {
    setColor: (state: any, action: PayloadAction<any>) => {
      state.color = action.payload;
    },
    setFontSize: (state, action: PayloadAction<any>) => {
      state.fontSize = action.payload;
    },
    setEditorState: (state, action: PayloadAction<any>) => {
      state.editorState = action.payload;
    },
    setColumnsData: (state, action: PayloadAction<any>) => {
      state.columnsData = action.payload;
    },
    setFieldData: (state, action: PayloadAction<any>) => {
      state.fieldData = action.payload;
    },
    setDisableTemplate: (state, action: PayloadAction<any>) => {
      state.disableTemplate = action.payload;
    },
    setShowTemplate: (state, action: PayloadAction<any>) => {
      state.showTemplate = action.payload;
    },
  },
});

export const {
  setColor,
  setFontSize,
  setEditorState,
  setColumnsData,
  setFieldData,
  setDisableTemplate,
  setShowTemplate,
} = genericReportSlice?.actions;
export default genericReportSlice.reducer;
