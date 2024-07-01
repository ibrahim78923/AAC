import { Box, Button, Divider, IconButton } from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { createElement } from 'react';
import { componentMap } from '@/utils/dynamic-forms';
import { FormProvider } from '@/components/ReactHookForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { predefinedVendorDataArray } from './DroppableArea.data';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useDroppableArea from './useDroppableArea';
import { AIR_SERVICES } from '@/constants';

export default function DroppableArea({
  form,
  setForm,
  handleEdit,
  isLoading,
  isFetching,
  isError,
  getBackendData,
}: any) {
  const {
    router,
    methods,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleFormCreation,
    putDynamicFieldsStatus,
    handleDelete,
    deleteDynamicFieldsStatus,
  } = useDroppableArea({
    form,
    setForm,
    getBackendData,
  });

  if (isError)
    return (
      <Box width={'100%'}>
        <ApiErrorState />
      </Box>
    );

  return (
    <>
      <Droppable droppableId={'droppable'}>
        {(provided) => (
          <Box
            bgcolor={'secondary.50'}
            borderRadius={2}
            p={2}
            width={'100%'}
            ref={provided?.innerRef}
            {...provided?.droppableProps}
          >
            {isLoading || isFetching ? (
              <SkeletonForm />
            ) : (
              <FormProvider methods={methods}>
                {predefinedVendorDataArray?.map((item: any) => (
                  <Box mb={2} key={item?.id}>
                    <item.component
                      {...item.componentProps}
                      size={'small'}
                      disabled={true}
                    />
                  </Box>
                ))}

                {form?.map((item: any) => (
                  <Box
                    my={1}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    key={item?.id}
                  >
                    <Box width={'100%'} mb={2}>
                      {componentMap[item?.component] &&
                        createElement(componentMap[item?.component], {
                          ...item?.componentProps,
                          size: 'small',
                          disabled: true,
                        })}
                    </Box>
                    <Box display={'flex'} alignItems={'center'} mt={1}>
                      <IconButton
                        sx={{ color: 'primary.main' }}
                        onClick={() => handleEdit(item?.id)}
                        disabled={putDynamicFieldsStatus?.isLoading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: 'error.lighter' }}
                        onClick={() =>
                          setIsDeleteModalOpen({
                            open: true,
                            id: item?.id,
                          })
                        }
                        disabled={putDynamicFieldsStatus?.isLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ mb: 2 }} />

                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  gap={2}
                >
                  <Button
                    variant={'outlined'}
                    color={'inherit'}
                    disabled={putDynamicFieldsStatus?.isLoading}
                    onClick={() => {
                      router?.push({
                        pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    variant={'contained'}
                    onClick={handleFormCreation}
                    disabled={!form?.length}
                    loading={putDynamicFieldsStatus?.isLoading}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </FormProvider>
            )}
          </Box>
        )}
      </Droppable>
      {isDeleteModalOpen?.open && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleDelete}
          message="Are you sure want to delete this field?"
          loading={deleteDynamicFieldsStatus?.isLoading}
          disableCancelBtn={deleteDynamicFieldsStatus?.isLoading}
        />
      )}
    </>
  );
}
