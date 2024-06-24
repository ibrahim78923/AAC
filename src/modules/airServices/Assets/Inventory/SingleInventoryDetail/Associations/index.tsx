import { Box, Typography, Chip } from '@mui/material';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoData from '@/components/NoData';
import { chipColor } from './Associations.data';
import { ExistingIncident } from './ExistingIncident';
import { NewIncident } from './NewIncident';
import { NoAssociationFoundImage } from '@/assets/images';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import useAssociations from './useAssociations';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const Associations = () => {
  const {
    dataAssets,
    theme,
    isLoadingAssets,
    isFetchingAssets,
    handleMouseOver,
    hoveredItemId,
    setHoveredItemId,
    handleMouseLeave,
    handleDelete,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleConfirmDelete,
    postRemoveAssociateTicketsStatus,
    setNewIncident,
    setExistingIncident,
    openNewIncident,
    openExistingIncident,
    addAssociationsButton,
  } = useAssociations();

  return (
    <Fragment>
      {dataAssets?.length <= 0 ? (
        <NoData
          image={NoAssociationFoundImage}
          message={'There are no associations'}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={addAssociationsButton}
              dropdownName={'Associate'}
              endIcon={<></>}
              startIcon={<AddCircleIcon />}
              variant="outlined"
              color="primary"
              sx={{ backgroundColor: theme?.palette?.grey?.[400] }}
            />
          </PermissionsGuard>
        </NoData>
      ) : (
        <Fragment>
          <Box textAlign={'end'}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
              ]}
            >
              <SingleDropdownButton
                dropdownOptions={addAssociationsButton}
                dropdownName={'Associate'}
                endIcon={<></>}
                startIcon={<AddCircleIcon />}
                color="primary"
                variant="contained"
              />
            </PermissionsGuard>
          </Box>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ASSOCIATION,
            ]}
          >
            <>
              {isLoadingAssets || isFetchingAssets ? (
                <Box mt={2}>
                  <SkeletonTable />
                </Box>
              ) : (
                <>
                  {dataAssets?.map((item: any) => (
                    <Box
                      key={item?._id}
                      border={`1px solid ${theme?.palette?.grey?.[400]}`}
                      borderLeft={`8px solid ${theme?.palette[
                        chipColor(item?.status)
                      ]?.main}`}
                      boxShadow={4}
                      borderRadius={2}
                      p={1}
                      mt={2}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      sx={{ cursor: 'pointer' }}
                      onMouseOver={() => handleMouseOver(item?._id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Box display={'flex'} flexWrap={'wrap'}>
                        {hoveredItemId === item?._id && (
                          <RemoveCircleOutlineIcon
                            style={{ marginRight: '8px', cursor: 'pointer' }}
                            fontSize="small"
                            onClick={() => {
                              setHoveredItemId(item?._id);
                              handleDelete(item?._id);
                            }}
                          />
                        )}
                        <Typography variant="body2" fontWeight={600}>
                          {item?.ticketIdNumber}
                        </Typography>
                      </Box>
                      <Chip
                        label={item?.status ?? '---'}
                        sx={{
                          bgcolor:
                            theme?.palette[chipColor(item?.status)]?.main,
                          color: theme?.palette?.common?.white,
                        }}
                      />
                    </Box>
                  ))}
                </>
              )}
            </>
          </PermissionsGuard>
        </Fragment>
      )}
      {isDeleteModalOpen && (
        <AlertModals
          message="Are you sure you want to delete this item?"
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleSubmitBtn={handleConfirmDelete}
          loading={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}
      {openNewIncident && (
        <NewIncident
          openDrawer={openNewIncident}
          setIsOpenDrawer={setNewIncident}
        />
      )}
      {openExistingIncident && (
        <ExistingIncident
          openDrawer={openExistingIncident}
          setIsOpenDrawer={setExistingIncident}
        />
      )}
    </Fragment>
  );
};
