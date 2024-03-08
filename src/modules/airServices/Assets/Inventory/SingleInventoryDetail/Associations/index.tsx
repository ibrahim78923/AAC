import { Button, useTheme, Box, Typography, Chip } from '@mui/material';
import { Fragment, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoData from '@/components/NoData';
import { chipColor } from './Associations.data';
import { ExistingIncident } from './ExistingIncident';
import { DialogBox } from './DialogBox';
import { NewIncident } from './NewIncident';
import { NoAssociationFoundImage } from '@/assets/images';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { AlertModals } from '@/components/AlertModals';
import { useGetAssociationsTicketsQuery } from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
export const Associations = () => {
  const theme: any = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseOver = (itemId: any) => {
    setHoveredItemId(itemId);
  };

  const { data } = useGetAssociationsTicketsQuery();

  const associationTicketsData = data?.data;

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
      {associationTicketsData?.length <= 0 ? (
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
            {associationTicketsData?.map((item: any) => (
              <Box
                key={item.id}
                border={`1px solid ${theme?.palette?.grey?.[400]}`}
                borderLeft={`8px solid ${theme?.palette[chipColor(item?.status)]
                  ?.main}`}
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
                  onMouseOver={() => handleMouseOver(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {hoveredItemId === item.id && (
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
                    bgcolor: theme?.palette[chipColor(item?.status)]?.main,
                    color: theme?.palette?.common?.white,
                  }}
                />
              </Box>
            ))}
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
