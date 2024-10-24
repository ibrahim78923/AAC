import React from 'react';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from '@mui/material';
import CommonTabs from '@/components/Tabs';
import DeleteModal from '../DeleteModal';
import {
  ActionMenuIcon,
  AddPenIcon,
  ArrowBackIcon,
  TrashIcon,
  ViewDetailIcon,
} from '@/assets/icons';
import Overview from './Overview';
import Submissions from './Submissions';
import { AIR_MARKETER } from '@/routesConstants/paths';
import useViewDetails from './useViewDetails';
import { formMode, formStatus } from '@/constants/form-builder';

const ViewDetails = () => {
  const {
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    theme,
    dataGetFormById,
    loadingGetForm,
    handleClickEdit,
    status,
    formId,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleDeleteForm,
  } = useViewDetails();

  return (
    <>
      {loadingGetForm ? (
        <Skeleton height={50} animation="wave" />
      ) : (
        <Box
          sx={{
            cursor: 'pointer',
            display: { md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            onClick={() => router.push(AIR_MARKETER?.ALL_TABLE)}
          >
            <ArrowBackIcon />
            <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
              {dataGetFormById?.data?.form?.name}
            </Typography>
          </Box>
          <Box>
            {dataGetFormById?.data?.form?.status === formStatus?.published && (
              <Button
                className="small"
                variant="outlined"
                startIcon={<ViewDetailIcon />}
                sx={{
                  marginRight: '10px',
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.primary?.main,
                }}
                onClick={() =>
                  router.push({
                    pathname: AIR_MARKETER.CREATE_FORM,
                    query: { formId: formId, mode: formMode?.view },
                  })
                }
              >
                View
              </Button>
            )}
            {dataGetFormById?.data?.form?.status === formStatus?.draft && (
              <>
                <Button
                  onClick={handleClickEdit}
                  className="small"
                  variant="outlined"
                  startIcon={<AddPenIcon />}
                  sx={{
                    marginRight: '10px',
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: theme?.palette?.primary?.main,
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  className="small"
                  onClick={handleActionsClick}
                  startIcon={<ActionMenuIcon />}
                >
                  Actions
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiList-root': {
                      minWidth: '112px',
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleOpenModalDelete}
                    sx={{
                      color: theme?.palette?.error?.main,
                      gap: '5px',
                    }}
                  >
                    <TrashIcon /> Move to Trash
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      )}

      {loadingGetForm ? (
        <Box sx={{ mt: '20px' }}>
          <Skeleton height={50} animation="wave" />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton height={220} animation="wave" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton height={220} animation="wave" />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ padding: { xs: '0px' } }}>
          {status === formStatus?.draft ? (
            <Box sx={{ pt: '20px' }}>
              <Overview data={dataGetFormById?.data} />
            </Box>
          ) : (
            <CommonTabs
              isHeader={false}
              tabsArray={['Overview', 'Submissions']}
            >
              <Overview data={dataGetFormById?.data} />
              <Submissions formId={formId} />
            </CommonTabs>
          )}
        </Box>
      )}

      <DeleteModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        handleSubmit={handleDeleteForm}
        loading={loadingDelete}
      />
    </>
  );
};

export default ViewDetails;
