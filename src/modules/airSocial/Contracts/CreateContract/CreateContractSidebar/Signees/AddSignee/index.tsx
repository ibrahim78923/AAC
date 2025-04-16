import React, { useEffect } from 'react';
import CommonDialog from '@/components/CommonDialog';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import SigneeFullName from '../../../components/SigneeCard/form-fields/SigneeFullName';
import SigneeEmail from '../../../components/SigneeCard/form-fields/SigneeEmail';
import { styles } from './styles';
import useAddSignee from './useAddSignee';
import { useLazyGetCommonAllCompaniesQuery } from '@/services/common-APIs';
import { isNullOrEmpty } from '@/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  partyValues: any;
  signeeFields: any;
  signeeValue: any;
}

export default function AddSignee({
  open,
  onClose,
  signeeValue,
  // partyValues,
  // signeeFields,
}: ModalProps) {
  const isEditMode = !isNullOrEmpty(signeeValue);
  const { methods, handleAddSignee, setValue } = useAddSignee(
    onClose,
    isEditMode,
  );
  const apiQueryCompanies = useLazyGetCommonAllCompaniesQuery();

  useEffect(() => {
    const fields = {
      signeeName: signeeValue?.name,
      signeeEmail: signeeValue?.email,
      personalTitle: signeeValue?.personalTitle,
      phoneNumber: signeeValue?.phoneNumber,
      company: signeeValue?.moduleData,
    };

    Object.entries(fields)?.forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [signeeValue]);

  return (
    <CommonDialog
      title={isNullOrEmpty(signeeValue) ? 'Create New Signee' : 'Edit Signee'}
      open={open}
      onClose={onClose}
      onSubmit={handleAddSignee}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'700px'}
    >
      <FormProvider methods={methods}>
        <Grid container rowSpacing={'22px'} columnSpacing={'16px'}>
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeFullName name={`signeeName`} />
          </Grid>
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeEmail
              name={`signeeEmail`}
              disable={!isNullOrEmpty(signeeValue)}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <RHFTextField
              name="personalTitle"
              label="Representative Title"
              size="small"
              fullWidth
              placeholder="Search people or invite by email"
            />
          </Grid>

          <Grid item xs={12} sx={styles?.fieldLabel}>
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
              required={true}
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
        </Grid>
      </FormProvider>
    </CommonDialog>
  );
}
