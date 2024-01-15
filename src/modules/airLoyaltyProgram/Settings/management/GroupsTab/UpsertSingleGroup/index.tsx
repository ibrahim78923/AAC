import { Box, Button, Drawer, Grid, Typography } from '@mui/material';
import { useUpsertSingleGroup } from './useUpsertSingleGroup';
import { AlertModals } from '@/components/AlertModals';
import CloseIcon from '@mui/icons-material/Close';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { groupDataArray } from './UpsertSingleGroup.data';

export const UpsertSingleGroup = (props: any) => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isAddDrawerOpen,
    selectedSendData,
    isEditOpen,
    setIsEditOpen,
  } = props;
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDelete,
    handleDrawerDeleteBtn,
    handelDefaultDrawer,
    handleOnsubmit,
    handleEditSubmit,
    groupMethods,
  } = useUpsertSingleGroup(props);
  return (
    <>
      {!isAddDrawerOpen && !isEditOpen ? (
        <Drawer
          anchor={'right'}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={2}
          >
            <Typography variant="h3">Group Details</Typography>
            <CloseIcon
              onClick={() => setIsDrawerOpen(false)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
          <Box
            mt={1}
            width={{ xs: '20rem', sm: '30rem' }}
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'column'}
            height={'100%'}
            p={2}
          >
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={1}
              >
                <Typography variant="h5">Group Name: </Typography>
                <Typography variant="body1" color="secondary">
                  {selectedSendData}
                </Typography>
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={1}
              >
                <Typography variant="h5">Shops/branches: </Typography>
                <Typography variant="body1" color="secondary">
                  Sharemydine,ZeroCode,PPCN
                </Typography>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDrawerDeleteBtn}
              >
                Delete
              </Button>
              <Button variant="contained" onClick={() => setIsEditOpen(true)}>
                Edit
              </Button>
            </Box>
          </Box>
        </Drawer>
      ) : (
        <CommonDrawer
          isOk
          isDrawerOpen={isDrawerOpen}
          onClose={handelDefaultDrawer}
          okText="Submit"
          title={isEditOpen ? 'Edit Group' : 'New Group'}
          submitHandler={isEditOpen ? handleEditSubmit : handleOnsubmit}
          cancelText={'Cancel'}
          footer
        >
          <FormProvider
            methods={groupMethods}
            onSubmit={isEditOpen ? handleEditSubmit : handleOnsubmit}
          >
            <Typography variant="body2" color="secondary">
              Create a group of shops or Branches for easy linking.
            </Typography>
            <Box mt={2}>
              <Grid container>
                {groupDataArray?.map((item) => (
                  <Grid item xs={12} key={item?.id}>
                    <item.component {...item?.componentProps} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </FormProvider>
        </CommonDrawer>
      )}

      <AlertModals
        type="delete"
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmitBtn={handleDelete}
        message="Are you sure want to delete this?"
      />
    </>
  );
};
