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
import {
  ActionMenuIcon,
  ActivateIcon,
  AddPenIcon,
  ArrowBackIcon,
  TrashIcon,
  ViewDetailIcon,
} from '@/assets/icons';

import Overview from './Overview';
import Submissions from './Submissions';
import Responses from './Responses';
import { AIR_MARKETER } from '@/routesConstants/paths';
import useViewDetails from './useViewDetails';
import { formStatus } from '../Forms.data';

const ViewDetails = () => {
  const {
    tabValue,
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    setTabVal,
    theme,
    dataGetFormById,
    loadingGetForm,
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
              {dataGetFormById?.data?.name}
            </Typography>
          </Box>
          <Box>
            {dataGetFormById?.data?.status === formStatus?.PUBLISHED && (
              <Button
                className="small"
                variant="outlined"
                startIcon={<ViewDetailIcon />}
                sx={{
                  marginRight: '10px',
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.primary?.main,
                }}
                onClick={() => router.push(AIR_MARKETER.VERIFY_EMAIL)}
              >
                View
              </Button>
            )}
            {dataGetFormById?.data?.status === formStatus?.DRAFT && (
              <Button
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
            )}

            {(dataGetFormById?.data?.status === formStatus?.DRAFT ||
              dataGetFormById?.data?.status === formStatus?.PUBLISHED) && (
              <Button
                variant="contained"
                className="small"
                onClick={handleActionsClick}
                startIcon={<ActionMenuIcon />}
              >
                Actions
              </Button>
            )}

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
                sx={{ color: theme?.palette?.slateBlue?.main, gap: '5px' }}
              >
                {' '}
                <ActivateIcon /> Activate
              </MenuItem>
              <MenuItem sx={{ color: theme?.palette?.error?.main, gap: '5px' }}>
                {' '}
                <TrashIcon /> Move to Trash
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}

      {tabValue === 2 && (
        <Typography variant="body3" sx={{ marginLeft: '30px' }}>
          Number of Responses - 10
        </Typography>
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
          <CommonTabs
            getTabVal={(val: number) => setTabVal(val)}
            isHeader={false}
            tabsArray={['Overview', 'Submissions', 'Form Responses']}
          >
            <Overview data={dataGetFormById?.data} />
            <Submissions />
            <Responses />
          </CommonTabs>
        </Box>
      )}
    </>
  );
};

export default ViewDetails;
