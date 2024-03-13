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
import { useLazyGetAssociationsTicketsQuery } from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { PAGINATION } from '@/config';
import CustomPagination from '@/components/CustomPagination';
export const Associations = () => {
  const theme: any = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const handleMouseOver = (itemId: any) => {
    setHoveredItemId(itemId);
  };

  const [lazyGetIncidentTrigger, lazyGetIncidentStatus] =
    useLazyGetAssociationsTicketsQuery();
  const getIncidentListData = async () => {
    const getIncidentParams = new URLSearchParams();
    // getIncidentParams?.append('ticketType', 'SR');
    getIncidentParams?.append('page', page + '');
    getIncidentParams?.append('limit', limit + '');
    getIncidentParams?.append('metaData', 'true');
    const getInventoryParameters = {
      queryParams: getIncidentParams,
    };
    try {
      await lazyGetIncidentTrigger(getInventoryParameters)?.unwrap();
    } catch (error: any) {}
  };
  const getInventoryListData = lazyGetIncidentStatus?.data?.data?.tickets;
  const metaData = lazyGetIncidentStatus?.data?.data?.meta;

  useEffect(() => {
    getIncidentListData();
  }, [page, limit]);
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
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
                <SkeletonTable />
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
                            onClick={handleDelete}
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
                  {metaData && (
                    <Box>
                      <CustomPagination
                        currentPage={page}
                        count={metaData?.pages}
                        pageLimit={limit}
                        totalRecords={metaData?.total}
                        onPageChange={(page: any) => setPage(page)}
                        setPage={setPage}
                        setPageLimit={setLimit}
                      />
                    </Box>
                  )}
                </>
              )}
            </>
          </PermissionsGuard>
        </Fragment>
      )}
      <AlertModals
        message="Are you sure you want to delete dashboard"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
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
