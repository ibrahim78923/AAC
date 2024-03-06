import { Box, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import { styles } from './Templates.style';
import useTemplates from './useTemplates';
import { AIR_MARKETER } from '@/routesConstants/paths';

const Templates = () => {
  const {
    handleCloseAlert,
    deleteTemplete,
    setFilterValues,
    smsTemplateData,
    filterValues,
    getRowValues,
    setPageLimit,
    isOpenAlert,
    isLoading,
    isSuccess,
    navigate,
    setPage,
    theme,
  } = useTemplates();

  const templatesDate = smsTemplateData?.data?.smstemplates;

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}`,
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={styles?.searchAction}>
            <Search
              onChange={(e: any) => {
                setFilterValues({ ...filterValues, search: e?.target?.value });
              }}
              placeholder="Search Here"
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            sx={styles?.createBtn}
            className="small"
            onClick={() => {
              navigate.push({
                pathname: AIR_MARKETER?.CREATE_TEMPLATE,
                query: { type: 'Create' },
              });
            }}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common?.white}`,
                fontSize: '16px',
              }}
            />{' '}
            Create Template
          </Button>
        </Box>

        <Grid>
          <TanstackTable
            columns={getRowValues}
            data={templatesDate}
            totalRecords={smsTemplateData?.data?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            count={smsTemplateData?.data?.meta?.pages}
            isPagination
            pageLimit={smsTemplateData?.data?.meta?.limit}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Grid>

        {isOpenAlert && (
          <AlertModals
            message={'Are you sure you want to delete this Template?'}
            type={'delete'}
            open={isOpenAlert}
            handleClose={handleCloseAlert}
            handleSubmitBtn={() => deleteTemplete()}
          />
        )}
      </Box>
    </>
  );
};

export default Templates;
