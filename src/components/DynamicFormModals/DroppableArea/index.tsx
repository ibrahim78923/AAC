import { Box, Button, Divider, IconButton } from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { createElement } from 'react';
import { DYNAMIC_FORM_IDS, componentMap } from '@/utils/dynamic-forms';
import { FormProvider } from '@/components/ReactHookForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useDroppableArea from './useDroppableArea';

export default function DroppableArea({
  form,
  setForm,
  handleEdit,
  isLoading,
  isFetching,
  isError,
  getBackendData,
  overlay,
  predefinedDataArray,
  moduleType,
  productType,
  successPath,
  cancelPath,
  section,
  sectionType,
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
    moduleType,
    productType,
    successPath,
    section,
    sectionType,
  });

  if (isError)
    return (
      <Box width={'100%'}>
        <ApiErrorState />
      </Box>
    );

  return (
    <>
      <Droppable droppableId={DYNAMIC_FORM_IDS?.DROPPABLE_ID}>
        {(provided) => (
          <Box
            position={'relative'}
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
                {predefinedDataArray?.map((item: any) => (
                  <Box mb={2} key={item?.id}>
                    <item.component
                      {...item?.componentProps}
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
                        pathname: cancelPath,
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

                {overlay && (
                  <Box
                    position={'absolute'}
                    top={0}
                    left={0}
                    width={'100%'}
                    height={'100%'}
                    zIndex={10}
                    bgcolor={'transparent'}
                  />
                )}
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
