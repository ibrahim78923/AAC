import React from 'react';
import CommonDialog from '@/components/CommonDialog';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
// import SigningOrder from '../../../components/SigneeCard/form-fields/SigningOrder';
// import OnBehalfOf from '../../../components/SigneeCard/form-fields/OnBehalfOf';
import SigneeFullName from '../../../components/SigneeCard/form-fields/SigneeFullName';
import SigneeEmail from '../../../components/SigneeCard/form-fields/SigneeEmail';
// import SigningDigitally from '../../../components/SigneeCard/form-fields/SigningDigitally';
// import PersonalTitle from '../../../components/SigneeCard/form-fields/PersonalTitle';
import { styles } from './styles';
import useAddSignee from './useAddSignee';
import { useLazyGetCommonAllCompaniesQuery } from '@/services/common-APIs';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  partyValues: any;
  signeeFields: any;
}

export default function AddSignee({
  open,
  onClose,
  // partyValues,
  // signeeFields,
}: ModalProps) {
  const { methods, handleAddSignee } = useAddSignee(onClose);
  const apiQueryCompanies = useLazyGetCommonAllCompaniesQuery();
  // const signingOrderData = Array(signeeFields?.length + 1)
  //   .fill(null)
  //   .map((_, index) => ({
  //     label: `${index + 1}`,
  //     value: index + 1,
  //   }));

  // const onBehalfOfData = partyValues?.map((party: any) => {
  //   return {
  //     _id: party?.moduleData?._id,
  //     name:
  //       party?.moduleData?.name ||
  //       `${party?.moduleData?.firstName || ''} ${party?.moduleData?.lastName || ''
  //         }`.trim(),
  //   };
  // });

  return (
    <CommonDialog
      title={'Create New Signee'}
      open={open}
      onClose={onClose}
      onSubmit={handleAddSignee}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'416px'}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={'4px'}>
          {/* <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningOrder
              data={signingOrderData}
              name={`signingOrder`}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <OnBehalfOf
              name={`onBehalfOf`}
              data={onBehalfOfData}
              required={false}
            />
          </Grid> */}
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeFullName name={`signeeName`} />
          </Grid>
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeEmail name={`signeeEmail`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            {/* <PersonalTitle name={`personalTitle`} /> */}
            <RHFTextField
              name="personalTitle"
              label="Representative Title"
              size="small"
              fullWidth
              placeholder="Search people or invite by email"
            />
          </Grid>

          <Grid item xs={12} sx={styles?.fieldLabel}>
            {/* <SigneeFullName name={`phoneNumber`} /> */}
            <RHFTextField
              name="phoneNumber"
              label="Phone Number"
              size="small"
              fullWidth
              placeholder="Enter Phone Number"
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <RHFAutocompleteAsync
              name="company"
              label="Company"
              fullWidth
              size="small"
              // required={true}
              apiQuery={apiQueryCompanies}
              externalParams={{ meta: false }}
              getOptionLabel={(option: any) => {
                return option?.name;
              }}
              placeholder="Select Company"
              sx={{
                '& > .MuiTypography-root.MuiTypography-body2': {
                  fontSize: '12px',
                  lineHeight: '1.25',
                },
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningDigitally />
          </Grid> */}
        </Grid>
      </FormProvider>
    </CommonDialog>
  );
}
