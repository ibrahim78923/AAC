import { Box, Button, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import { PlusIcon } from '@/assets/icons';
import AllForms from './AllForms';
import Published from './Published';
import Draft from './Draft';
import Trash from './Trash';
import useForms from './useForms';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS } from '@/constants/permission-keys';
import AddDrawer from './AddDrawer';

const Forms = () => {
  const {
    setShowSignUpForm,
    setFindStatus,
    isAddDraweropen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    handleAddFormSubmit,
    methodsAddForm,
  } = useForms();

  return (
    <Box>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: { xs: '0px 10px' }, display: { md: 'flex' } }}
      >
        <Typography variant="h4">Forms</Typography>
        <PermissionsGuard
          permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.ADD_FORM]}
        >
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={handleOpenAddDrawer}
          >
            Add Form
          </Button>
        </PermissionsGuard>
      </Box>

      <Box sx={{ padding: { xs: '0px' } }}>
        <CommonTabs
          isHeader={false}
          tabsArray={['All', 'Published', 'Draft', 'Trash']}
        >
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.ALL]}
          >
            <AllForms
              setShowSignUpForm={setShowSignUpForm}
              setFindStatus={setFindStatus}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.PUBLISHED,
            ]}
          >
            <Published
              setShowSignUpForm={setShowSignUpForm}
              setFindStatus={setFindStatus}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.DRAFT]}
          >
            <Draft
              setShowSignUpForm={setShowSignUpForm}
              setFindStatus={setFindStatus}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.TRASH]}
          >
            <Trash
              setShowSignUpForm={setShowSignUpForm}
              setFindStatus={setFindStatus}
            />
          </PermissionsGuard>
        </CommonTabs>
      </Box>

      <AddDrawer
        isOpen={isAddDraweropen}
        onClose={handleCloseAddDrawer}
        methods={methodsAddForm}
        onSubmit={handleAddFormSubmit}
      />
    </Box>
  );
};

export default Forms;
