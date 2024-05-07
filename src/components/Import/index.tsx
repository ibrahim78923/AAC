import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { useImport } from './useImport';
import { Box, ListItem, ListItemIcon, Typography } from '@mui/material';
import { MappedColumns } from './MappedColumns';
import { FiberManualRecord } from '@mui/icons-material';

export const Import = (props: any) => {
  const {
    isDrawerOpen,
    title,
    crmColumnsOptions,
    importFileStatus,
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
    uploadFileTos3UsingSignedUrlStatus,
    lazyGetSignedUrlForImportStatus,
  } = useImport(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Import'}
      title={title}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      footer
      isLoading={
        importFileStatus?.isLoading ||
        uploadFileTos3UsingSignedUrlStatus?.isLoading ||
        lazyGetSignedUrlForImportStatus?.isLoading
      }
      isDisabled={
        importFileStatus?.isLoading ||
        lazyGetSignedUrlForImportStatus?.isLoading ||
        uploadFileTos3UsingSignedUrlStatus?.isLoading
      }
      disabledCancelBtn={
        importFileStatus?.isLoading ||
        lazyGetSignedUrlForImportStatus?.isLoading ||
        uploadFileTos3UsingSignedUrlStatus?.isLoading
      }
    >
      <Box marginY={2} />
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
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
            />
          </>
        )}
      </FormProvider>
    </CommonDrawer>
  );
};
