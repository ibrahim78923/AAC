import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { useImport } from './useImport';
import { ListItem, ListItemIcon, Typography } from '@mui/material';
import { MappedColumns } from './MappedColumns';
import { FiberManualRecord } from '@mui/icons-material';
import { CustomCommonDialog } from '../CustomCommonDialog';

export const Import = (props: any) => {
  const {
    isDrawerOpen,
    title,
    crmColumnsOptions,
    mandatoryColumnsList = [],
    labelForImport = 'Add File',
  } = props;

  const {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    showItemsList,
    fields,
    remove,
    cancelBtnHandler,
    apiCallInProgress,
  } = useImport(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isDrawerOpen}
      closePortal={onClose}
      dialogTitle={title}
      submitButtonText="Import"
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(submitImportFile)}
      handleCancelButton={cancelBtnHandler}
      dialogMaxWidth="md"
    >
      <FormProvider methods={importFormMethod}>
        {!showItemsList ? (
          <>
            <Typography variant="h5" fontWeight={700} color="custom.main">
              Uploaded file must have these columns
            </Typography>
            {!!mandatoryColumnsList?.length ? (
              mandatoryColumnsList?.map((columnList: any) => (
                <ListItem sx={{ color: 'grey.900' }} key={columnList?._id}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: '10px' }} />
                  </ListItemIcon>
                  {columnList?.label}
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body2"
                fontWeight={700}
                color="slateBlue.main"
              >
                No Required Columns
              </Typography>
            )}
            <br />
            <RHFFileImport name="file" label={labelForImport} />
          </>
        ) : (
          <>
            <MappedColumns
              name="csvColumns"
              fields={fields}
              remove={remove}
              crmColumnsOptions={crmColumnsOptions}
              mandatoryColumnsList={mandatoryColumnsList}
            />
          </>
        )}
      </FormProvider>
    </CustomCommonDialog>
  );
};
