import { PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button, Grid, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import { rolesListData } from './RolesAndRightTable.data';
import { useRolesAndRightTable } from './useRolesAndRightTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, ROLES_ACTION_CONSTANTS } from '@/constants/strings';
import ErrorIcon from '@mui/icons-material/Error';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRolesData } from '../UpsertRoleAndRightForm/UpsertRoleAndRightForm.data';
import RolesAndRightFormAccordion from '../RolesAndRightFormAccordion';

const RolesAndRightTable = () => {
  const {
    selectedRolesList,
    RolesListsColumns,
    dropdownOptions,
    setSearchValue,
    searchValue,
    openDeleteModel,
    handleDeleteClose,
    handleDelete,
    handleCloseRole,
    isRolesModalOpen,
    handleAddRolesModal,
    handleSubmit,
    onSubmit,
    rolesMethods,
    currentActionType,
  } = useRolesAndRightTable();

  const filteredUpsertRolesData = upsertRolesData.filter((item) =>
    item.visible(currentActionType),
  );

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={2}
      >
        <Typography variant="h3">Roles and Rights</Typography>
        <Button
          variant="contained"
          startIcon={<PlusSharedColorIcon />}
          onClick={() =>
            handleAddRolesModal(ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE, true)
          }
        >
          Add new role
        </Button>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
        marginTop={2}
      >
        <Box>
          <Search
            value={searchValue}
            label="Search Here"
            width="100%"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedRolesList?.length}
          />
        </Box>
      </Box>
      <Box m={'0.5rem 0 0.5rem 0'} marginTop={2}>
        <TanstackTable
          data={rolesListData}
          columns={RolesListsColumns}
          isPagination
        />
      </Box>
      <Box>
        <CommonDrawer
          isDrawerOpen={isRolesModalOpen}
          onClose={handleCloseRole}
          title={
            currentActionType === ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE
              ? 'Add New Role'
              : 'User Role'
          }
          okText={
            currentActionType === ROLES_ACTION_CONSTANTS?.EDIT
              ? 'Save'
              : currentActionType === ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE
              ? 'Add'
              : 'Add'
          }
          isOk={!(currentActionType === ROLES_ACTION_CONSTANTS?.VIEW)}
          isCancel={!(currentActionType === ROLES_ACTION_CONSTANTS?.VIEW)}
          cancelText={'cancel'}
          footer
          submitHandler={handleSubmit(onSubmit)}
        >
          <Box>
            <FormProvider methods={rolesMethods}>
              <Grid container spacing={1}>
                {filteredUpsertRolesData.map((item: any) => (
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
                <RolesAndRightFormAccordion />
              </Grid>
            </FormProvider>
          </Box>
        </CommonDrawer>
        <AlertModals
          message="Do you want to delete this role"
          type={ALERT_MODALS_TYPE?.WARNING}
          open={openDeleteModel}
          typeImage={<ErrorIcon sx={{ color: 'warning.main' }} />}
          handleClose={handleDeleteClose}
          handleSubmit={handleDelete}
        />
      </Box>
    </>
  );
};

export default RolesAndRightTable;
