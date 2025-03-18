import React from 'react';
import CommonModal from '@/components/CommonModal';
import useModalShareContract from './useModalShareContract';
import FieldName from './FieldName';
import FieldPermissions from './FieldPermissions';
import FieldMessage from './FieldMessage';
import { IconAddCollaborator, IconTrashContracts } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { styles } from './styles';
import { Box, Grid, IconButton } from '@mui/material';

interface ModalProps {
  open: boolean;
  setOpenModalShareContract: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

export default function ModalShareContract({
  open,
  setOpenModalShareContract,
  data,
}: ModalProps) {
  const {
    fields,
    handleAddCollaborator,
    handleRemoveCollaborator,
    methodsShareContract,
    handleSubmitShareContract,
    handleCloseModal,
    loadingUpdateContract,
  } = useModalShareContract(setOpenModalShareContract, data);

  return (
    <CommonModal
      title={'Share the contract with others'}
      open={open}
      handleClose={handleCloseModal}
      handleCancel={handleCloseModal}
      handleSubmit={handleSubmitShareContract}
      okText={'Send'}
      cancelText={'Cancel'}
      footer={true}
      width={700}
      isLoading={loadingUpdateContract}
      isSubmitDisabled={fields?.length === 0}
    >
      <Box sx={styles?.invitePeople}>
        Invite people to collaborate on the contract.
      </Box>
      <FormProvider methods={methodsShareContract}>
        <Grid container spacing={2}>
          {fields?.map((item, index) => (
            <Grid item xs={12} key={item?.id || `field-${index}`}>
              <Box sx={styles?.collaborator}>
                <Box sx={styles?.collaboratorContent}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FieldName
                        name={`collaborators.${index}.sharedUserData`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FieldPermissions
                        name={`collaborators.${index}.permissions`}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={styles?.collaboratorAction}>
                  <IconButton onClick={() => handleRemoveCollaborator(index)}>
                    <IconTrashContracts />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
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
