import React from 'react';
import CommonDialog from '@/components/CommonDialog';
import { Grid } from '@mui/material';
import { styles } from './styles';
import SigningOrder from '../SigneeCard/form-fields/SigningOrder';
import OnBehalfOf from '../SigneeCard/form-fields/OnBehalfOf';
import PersonalTitle from '../SigneeCard/form-fields/PersonalTitle';
import SigneeFullName from '../SigneeCard/form-fields/SigneeFullName';
import SigneeEmail from '../SigneeCard/form-fields/SigneeEmail';
import SigningDigitally from '../SigneeCard/form-fields/SigningDigitally';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  signeeFields: any;
  partyValues: any;
}

export default function ModalAddSignee({
  open,
  onClose,
  onSubmit,
  signeeFields,
  partyValues,
}: ModalProps) {
  const signingOrderData = Array(signeeFields?.length)
    .fill(null)
    .map((_, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    }));

  const onBehalfOfData = partyValues?.map((party: any) => {
    return {
      _id: party?.moduleData?._id,
      name:
        party?.moduleData?.name ||
        `${party?.moduleData?.firstName || ''} ${
          party?.moduleData?.lastName || ''
        }`.trim(),
    };
  });

  return (
    <CommonDialog
      title={'Create New Signee'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'416px'}
    >
      <>
        <Grid container spacing={'4px'}>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningOrder
              data={signingOrderData}
              name={`signees.${signeeFields?.length}.signingOrder`}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <OnBehalfOf
              name={`signees.${signeeFields?.length}.onBehalfOf`}
              data={onBehalfOfData || []}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <PersonalTitle
              name={`signees.${signeeFields?.length}.personalTitle`}
            />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigneeFullName name={`signees.${signeeFields?.length}.name`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigneeEmail name={`signees.${signeeFields?.length}.email`} />
          </Grid>
          <Grid item xs={12} sx={styles?.fieldLabel}>
            <SigningDigitally />
          </Grid>
        </Grid>
      </>
    </CommonDialog>
  );
}
