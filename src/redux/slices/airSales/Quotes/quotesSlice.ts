import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  describeForm: {},
  consumers: {},
  redeemReward: [],
  giftCardData: {},
  voucherData: {},
  rewardId: '',
  includeSignature: 'noSignature',
  templatePDF: null,
  openModalChooseSignature: false,
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setDescribeFormData: (state, action) => {
      state.describeForm = action?.payload;
    },
    setConsumersData: (state, action) => {
      state.consumers = action?.payload;
    },
    setRedeemReward: (state, action) => {
      state.redeemReward = action?.payload;
    },
    setGiftCardData: (state, action) => {
      state.giftCardData = action?.payload;
    },
    setVoucherData: (state, action) => {
      state.voucherData = action?.payload;
    },
    setRewardId: (state, action) => {
      state.rewardId = action?.payload;
    },
    setIncludeSignature: (state, action) => {
      state.includeSignature = action?.payload;
    },
    setTemplatePDF: (state, action) => {
      state.templatePDF = action?.payload;
    },
    setOpenModalChooseSignature: (state, action) => {
      state.openModalChooseSignature = action?.payload;
    },
    clearState: () => initialState, // Reset the state to initial state
  },
});

export const {
  setDescribeFormData,
  setConsumersData,
  setRedeemReward,
  setGiftCardData,
  setVoucherData,
  setRewardId,
  clearState,
  setTemplatePDF,
  setOpenModalChooseSignature,
  setIncludeSignature,
} = quotesSlice?.actions;
export const getAddPlanForms = (state: any) => state.quotesSlice?.describeForm;
export default quotesSlice.reducer;
