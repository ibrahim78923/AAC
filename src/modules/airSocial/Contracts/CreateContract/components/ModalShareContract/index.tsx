import React from 'react';
import CommonModal from '@/components/CommonModal';
import useModalShareContract from './useModalShareContract';
import FieldName from './FieldName';
import FieldPermissions from './FieldPermissions';
import FieldMessage from './FieldMessage';
import { IconAddCollaborator } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { styles } from './styles';
import { Box, Grid } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalShareContract({ open, onClose }: ModalProps) {
  const {
    collaborators,
    methods,
    handleAddCollaborator,
    handleSubmit,
    onSubmit,
  } = useModalShareContract();

  return (
    <CommonModal
      title={'Share the contract with others'}
      open={open}
      handleClose={onClose}
      handleCancel={onClose}
      handleSubmit={onClose}
      okText={'Send'}
      cancelText={'Cancel'}
      footer={true}
      width={700}
    >
      <Box sx={styles?.invitePeople}>
        Invite people to collaborate on the contract.
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {collaborators?.map((item) => (
            <React.Fragment key={item?.name}>
              <Grid item xs={12} sm={6}>
                <FieldName name={item?.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldPermissions name={item?.permission} />
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Box sx={styles?.addCollaborator} onClick={handleAddCollaborator}>
              <IconAddCollaborator />
              <Box>Add Collaborator</Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FieldMessage />
          </Grid>
        </Grid>
      </FormProvider>
    </CommonModal>
  );
}
