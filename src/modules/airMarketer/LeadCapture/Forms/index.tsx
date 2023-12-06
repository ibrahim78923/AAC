import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import {
  ActionMenuIcon,
  ActivateIcon,
  AddPenIcon,
  ArrowBackIcon,
  PlusIcon,
  TrashIcon,
  ViewDetailIcon,
} from '@/assets/icons';

import AllForms from './AllForms';
import Published from './Published';
import Draft from './Draft';
import Trash from './Trash';
import Overview from './Overview';
import { airMarketerLeadCapture } from '@/routesConstants/paths';
import Submissions from './Submissions';
import Responses from './Responses';
import useForms from './useForms';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { formsArray } from './Forms.data';
import { v4 as uuidv4 } from 'uuid';

const Forms = () => {
  const {
    showSignUpForm,
    setShowSignUpForm,
    tabValue,
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    setTabVal,
    findStatus,
    setFindStatus,
    setIsDraweropen,
    isDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    formsMethods,
    theme,
  } = useForms();

  return (
    <Box>
      {!showSignUpForm ? (
        <>
          <Box
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: { xs: '0px 10px' }, display: { md: 'flex' } }}
          >
            <Typography variant="h4">Forms</Typography>

            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
              onClick={() => setIsDraweropen(true)}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ padding: { xs: '0px' } }}>
            <CommonTabs
              // getTabVal={(val: number) => setTabVal(val)}
              isHeader={false}
              tabsArray={['All', 'Published', 'Draft', 'Trash']}
            >
              <AllForms
                setShowSignUpForm={setShowSignUpForm}
                setFindStatus={setFindStatus}
              />
              <Published
                setShowSignUpForm={setShowSignUpForm}
                setFindStatus={setFindStatus}
              />
              <Draft
                setShowSignUpForm={setShowSignUpForm}
                setFindStatus={setFindStatus}
              />
              <Trash
                setShowSignUpForm={setShowSignUpForm}
                setFindStatus={setFindStatus}
              />
            </CommonTabs>
          </Box>
        </>
      ) : (
        <>
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
              onClick={() => setShowSignUpForm(false)}
            >
              <ArrowBackIcon />
              <Typography variant="h4">
                Forms{tabValue != 2 && ': Sign up'}
              </Typography>
            </Box>
            <Box>
              {findStatus?.row?.original?.status === 'Published' && (
                <Button
                  className="small"
                  variant="outlined"
                  startIcon={<ViewDetailIcon />}
                  sx={{
                    marginRight: '10px',
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: '#38CAB5',
                  }}
                  onClick={() =>
                    router.push(airMarketerLeadCapture.VERIFY_EMAIL)
                  }
                >
                  View
                </Button>
              )}
              {findStatus?.row?.original?.status === 'Draft' && (
                <Button
                  className="small"
                  variant="outlined"
                  startIcon={<AddPenIcon />}
                  sx={{
                    marginRight: '10px',
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: '#38CAB5',
                  }}
                >
                  Edit
                </Button>
              )}

              {(findStatus?.row?.original?.status === 'Draft' ||
                findStatus?.row?.original?.status === 'Published') && (
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
                <MenuItem sx={{ color: '#374151', gap: '5px' }}>
                  {' '}
                  <ActivateIcon /> Activate
                </MenuItem>
                <MenuItem sx={{ color: '#FF4A4A', gap: '5px' }}>
                  {' '}
                  <TrashIcon /> Move to Trash
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {tabValue === 2 && (
            <Typography variant="body3" sx={{ marginLeft: '30px' }}>
              Number of Responses - 10
            </Typography>
          )}
          <Box sx={{ padding: { xs: '0px' } }}>
            <CommonTabs
              getTabVal={(val: number) => setTabVal(val)}
              isHeader={false}
              tabsArray={['Overview', 'Submissions', 'Form Responses']}
            >
              <Overview />
              <Submissions />
              <Responses />
            </CommonTabs>
          </Box>
        </>
      )}

      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={'Add Form'}
        okText={'Create'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={formsMethods}>
            <Grid container spacing={4}>
              {formsArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};

export default Forms;
