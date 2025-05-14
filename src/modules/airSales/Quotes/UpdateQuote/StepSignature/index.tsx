import React, { useEffect } from 'react';
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import { styles } from './StepSignature.style';
import ModalChooseSignature from './ModalChooseSignature';
import { useGetCommonContractsPersonalFoldersListQuery } from '@/services/commonFeatures/contracts/contracts-dashboard';
import { useDispatch } from 'react-redux';
import {
  setIncludeSignature,
  setOpenModalChooseSignature,
} from '@/redux/slices/airSales/Quotes/quotesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const StepSignature = ({ quotesData, loyalityCalculation, pdfRef }: any) => {
  const dispatch = useDispatch();
  const includeSignature = useSelector(
    (state: RootState) => state?.quotesForm?.includeSignature,
  );

  const openModalChooseSignature = useSelector(
    (state: RootState) => state?.quotesForm?.openModalChooseSignature,
  );

  const handleCloseModal = () => {
    dispatch(setOpenModalChooseSignature(false));
  };

  const { data: foldersList } = useGetCommonContractsPersonalFoldersListQuery({
    meta: false,
  });
  useEffect(() => {
    if (quotesData?.contracts) {
      dispatch(setIncludeSignature('includeSignature'));
    } else {
      dispatch(setIncludeSignature('noSignature'));
    }
  }, [quotesData]);

  return (
    <>
      <Grid container spacing={'40px'}>
        <Grid item lg={5} md={12} xs={12}>
          <Typography variant="h5" sx={styles?.heading}>
            Signature
          </Typography>
          <Typography variant="body1" sx={styles?.checkInformation}>
            Check the information about you and your company that will appear on
            the quote
          </Typography>
          <Box>
            <RadioGroup
              value={includeSignature}
              onChange={(e) => dispatch(setIncludeSignature(e.target.value))}
              name="signature"
            >
              <FormControlLabel
                value="noSignature"
                control={<Radio />}
                label="No Signature"
              />
              <FormControlLabel
                value="includeSignature"
                control={<Radio />}
                label="Include Space for a written signature"
              />
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item lg={7} md={12} sm={12}>
          <TemplateFrame>
            <TemplateBasic
              quotesData={quotesData}
              loyalityCalculation={loyalityCalculation}
              pdfRef={pdfRef}
            />
          </TemplateFrame>
        </Grid>
      </Grid>

      <ModalChooseSignature
        open={openModalChooseSignature}
        onClose={handleCloseModal}
        foldersData={foldersList}
        pdfRef={pdfRef}
      />
    </>
  );
};

export default StepSignature;
