import { Button, useTheme, Box, Typography, Chip } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
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
import {
  useDeleteInventoryAssociationListMutation,
  useLazyGetAssociationListQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { useRouter } from 'next/router';
export const Associations = () => {
  const theme: any = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [InventoryIncidentId, setInventoryIncidentId] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const router = useRouter();
  const associationsInventoryId = router.query.inventoryId;

  const [deleteInventoryAssociationListTrigger, { isLoading }] =
    useDeleteInventoryAssociationListMutation();
  const handleMouseOver = (itemId: any) => {
    setHoveredItemId(itemId);
  };

  const [lazyGetIncidentTrigger, lazyGetIncidentStatus] =
    useLazyGetAssociationListQuery();
  const getIncidentListData = async () => {
    const getIncidentParams = new URLSearchParams();
    getIncidentParams?.append('inventoryId', associationsInventoryId + '');

    const getInventoryParameters = {
      params: getIncidentParams,
    };
    await lazyGetIncidentTrigger(getInventoryParameters)?.unwrap();
  };
  const getInventoryListData =
    lazyGetIncidentStatus?.data?.data?.associationList;

  useEffect(() => {
    getIncidentListData();
  }, [lazyGetIncidentTrigger?.toString(), openExistingIncident]);
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = (id: any) => {
    setIsDeleteModalOpen(true);
    setInventoryIncidentId(id);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteInventoryAssociationListTrigger({
        id: associationsInventoryId,
        ticketId: InventoryIncidentId,
      }).unwrap();
    } catch (error) {}
    setIsDeleteModalOpen(false);
    setHoveredItemId(null);
  };
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
