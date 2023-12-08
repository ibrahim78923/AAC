import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';
import {
  columns,
  responsesData,
  responsesdefaultValues,
  responsesvalidationSchema,
} from './Responses.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import { ResponsesTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';
import { ExportSubmissionIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Responses = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  // const [openAlert, setOpenAlert] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(responsesvalidationSchema),
    defaultValues: responsesdefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const getColums = columns(setIsOpenDrawer);

  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Search
          searchBy={searchByClientName}
          setSearchBy={setSearchByClientName}
          label="Search Here"
          size="small"
          sx={{ margin: '15px' }}
        />

        <Button
          variant="outlined"
          color="inherit"
          className="small"
          startIcon={<ExportSubmissionIcon />}
          sx={{ marginX: '10px' }}
          // onClick={() => setOpenAlert(true)}
        >
          Export
        </Button>
      </Box>

      <Divider sx={{ marginBottom: '15px' }} />
      <TanstackTable columns={getColums} data={ResponsesTableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />

      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        title={'Olivia Rhye'}
        okText={'Done'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4} sx={{ position: 'relative' }}>
              {responsesData()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      {/* <ScheduleModals
          submitButonText="Export"
          type={'export'}
          open={openDrawer === 'Export'}
          handleClose={() => setOpenDrawer('')}
          handleSubmit={() => setOpenDrawer('')}
          isFooter={true}
        >
          <Grid
            container
            spacing={2}
            sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
          >
            <Grid item xs={12}>
              <Typography variant="body2">File Format</Typography>
            </Grid>
            {exportData?.map((item) => (
              <Grid item md={4} xs={12} key={uuidv4()}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name={'name'}
                      onChange={(event) =>
                        handlecheckExportFormats(event, item?.value)
                      }
                      checked={checkExportFormats?.includes(`${item?.value}`)}
                    />
                  }
                  label={item?.label}
                />
              </Grid>
            ))}
          </Grid>
        </ScheduleModals> */}
    </Box>
  );
};

export default Responses;
