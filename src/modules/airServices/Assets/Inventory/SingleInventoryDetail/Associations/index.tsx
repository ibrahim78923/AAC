import { Button, Box, Typography, Chip } from '@mui/material';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoData from '@/components/NoData';
import { chipColor } from './Associations.data';
import { ExistingIncident } from './ExistingIncident';
import { DialogBox } from './DialogBox';
import { NewIncident } from './NewIncident';
import { NoAssociationFoundImage } from '@/assets/images';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import useAssociations from './useAssociations';

export const Associations = () => {
  const {
    getInventoryListData,
    theme,
    setOpenDialog,
    lazyGetIncidentStatus,
    handleMouseOver,
    hoveredItemId,
    setHoveredItemId,
    handleMouseLeave,
    handleDelete,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleConfirmDelete,
    isLoading,
    openDialog,
    setNewIncident,
    setExistingIncident,
    openNewIncident,
    openExistingIncident,
  } = useAssociations();

  return (
    <Fragment>
      {getInventoryListData?.length <= 0 ? (
        <NoData
          image={NoAssociationFoundImage}
          message={'There are no associations'}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
            ]}
          >
            <Button
              variant="outlined"
              sx={{ backgroundColor: theme?.palette?.grey?.[400] }}
              onClick={() => setOpenDialog(true)}
              startIcon={<AddCircleIcon />}
            >
              Associate
            </Button>
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
              <Button
                variant="contained"
                onClick={() => setOpenDialog(true)}
                startIcon={<AddCircleIcon />}
              >
                Associate
              </Button>
            </PermissionsGuard>
          </Box>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ASSOCIATION,
            ]}
          >
            <>
              {lazyGetIncidentStatus?.isLoading ||
              lazyGetIncidentStatus?.isFetching ? (
                <Box mt={2}>
                  <SkeletonTable />
                </Box>
              ) : (
                <>
                  {' '}
                  {getInventoryListData?.map((item: any) => (
                    <Box
                      key={item?._id}
                      border={`1px solid $ {theme?.palette?.grey?.[400]}`}
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
                    >
                      <Box
                        display={'flex'}
                        flexWrap={'wrap'}
                        onMouseOver={() => handleMouseOver(item?._id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {hoveredItemId === item?._id && (
                          <RemoveCircleOutlineIcon
                            style={{ marginRight: '8px' }}
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
                        label={item?.status}
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
      <AlertModals
        message="Are you sure you want to delete this item?"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmitBtn={handleConfirmDelete}
        loading={isLoading}
      />

      <DialogBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setNewIncident={setNewIncident}
        setExistingIncident={setExistingIncident}
      />
      <NewIncident openDrawer={openNewIncident} onClose={setNewIncident} />
      <ExistingIncident
        openDrawer={openExistingIncident}
        onClose={setExistingIncident}
      />
    </Fragment>
  );
};
