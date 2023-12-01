import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';
import { columns, submissionsArray } from './Submissions.data';
import Search from '@/components/Search';
import { Box, Button, Divider, Grid } from '@mui/material';
import { SubmissionsTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';
import { ExportSubmissionIcon, FilterSubmissionsIcon } from '@/assets/icons';
import useSubmissions from './useSubmissions';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const Submissions = () => {
  const {
    setIsFIlterDraweropen,
    isFIlterDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    submissionsMethods,
    searchByClientName,
    setSearchByClientName,
  } = useSubmissions();

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

        <Box>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            startIcon={<FilterSubmissionsIcon />}
            onClick={() => setIsFIlterDraweropen(true)}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            startIcon={<ExportSubmissionIcon />}
            sx={{ marginX: '10px' }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Divider sx={{ marginBottom: '15px' }} />
      <TanstackTable columns={columns()} data={SubmissionsTableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />

      <CommonDrawer
        isDrawerOpen={isFIlterDraweropen}
        onClose={handleCloseDrawer}
        title={'Filters'}
        okText={'Done'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={submissionsMethods}>
            <Grid container spacing={4}>
              {submissionsArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};

export default Submissions;
