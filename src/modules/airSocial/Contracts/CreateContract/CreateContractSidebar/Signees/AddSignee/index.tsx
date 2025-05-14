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

interface ModalProps {
  open: boolean;
  onClose: () => void;
  isEditMode: boolean;
  signeeFields: any;
  selectedSignee: any;
  contractId: any;
}

export default function AddSignee({
  open,
  onClose,
  isEditMode,
  selectedSignee,
  contractId,
}: ModalProps) {
  const { methods, handleAddSignee, setValue, loadingUpdateContract } =
    useAddSignee(onClose, isEditMode, contractId);
  const apiQueryCompanies = useLazyGetCommonAllCompaniesQuery();

  useEffect(() => {
    const fields = {
      signeeName: selectedSignee?.name,
      signeeEmail: selectedSignee?.email,
      personalTitle: selectedSignee?.personalTitle,
      phoneNumber: selectedSignee?.phoneNumber,
      company: selectedSignee?.moduleData,
    };

    Object.entries(fields)?.forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [selectedSignee]);

  return (
    <CommonDialog
      title={isEditMode ? 'Edit Signee' : 'Create New Signee'}
      open={open}
      onClose={onClose}
      onSubmit={handleAddSignee}
      okText={isEditMode ? 'Update' : 'Create'}
      cancelText={'Cancel'}
      width={'700px'}
      isLoading={loadingUpdateContract}
    >
      <FormProvider methods={methods}>
        <Grid container rowSpacing={'22px'} columnSpacing={'16px'}>
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeFullName name={`signeeName`} />
          </Grid>
          <Grid item xs={6} sx={styles?.fieldLabel}>
            <SigneeEmail name={`signeeEmail`} disable={isEditMode} />
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
