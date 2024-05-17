import CommonDrawer from '@/components/CommonDrawer';
import { useExportAllCalls } from './useExportAllCalls';
import * as React from 'react';
import { Box, Checkbox, Divider, Grid, Stack, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { exportAsData, selectedFieldsData } from './exportAs.data';
const ExportAllCalls = (props: any) => {
  const {
    methodExport,
    handleSubmit,
    onSubmit,
    cancelExport,
    selectedCheckboxes,
    setSelectedCheckboxes,
    isExportDrawerOpen,
    setIsExportDrawerOpen,
  } = useExportAllCalls(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isExportDrawerOpen}
      onClose={() => setIsExportDrawerOpen(false)}
      title="Export Call Metrics"
      okText="Export"
      cancelText="cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelExport?.()}
    >
      <Divider />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Export As
      </Typography>
      <FormProvider methods={methodExport} onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <Grid container spacing={4}>
          {exportAsData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Box justifyContent={'space-between'} display={'flex'} width={'100%'}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Select Fields
          </Typography>
          <Box display={'flex'} alignItems={'center'} gap={0}>
            <Checkbox
              checked={
                selectedCheckboxes?.length !== 0 &&
                selectedFieldsData?.length === selectedCheckboxes?.length
              }
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedCheckboxes(
                      selectedFieldsData?.map((result: any) => result?._id),
                    )
                  : setSelectedCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            <Typography variant="h6">Select All</Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={1}>
          {selectedFieldsData?.map((result: any) => (
            <Grid item xs={12} md={6} lg={6} key={result?._id} display="flex">
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={selectedCheckboxes?.includes(result?._id)}
                  onChange={(e: any) => {
                    e?.target?.checked
                      ? setSelectedCheckboxes([
                          ...selectedCheckboxes,
                          result?._id,
                        ])
                      : setSelectedCheckboxes(
                          selectedCheckboxes?.filter(
                            (checkbox: any) => checkbox !== result?._id,
                          ),
                        );
                  }}
                  color="primary"
                  name={result?._id}
                />
                <Typography variant="body1">{result?.label}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default ExportAllCalls;
