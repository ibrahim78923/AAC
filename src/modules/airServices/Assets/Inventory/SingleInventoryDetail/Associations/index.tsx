import { Button, useTheme, Box, Typography, Chip } from '@mui/material';
import { Fragment, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import NoData from '@/components/NoData';
import NewIncident from './NewIncident';
import ExistingIncident from './ExistingIncident';
import DialogBox from './DialogBox';
import { associationsDataArray, chipColor } from './Associations.data';
import { v4 as uuidv4 } from 'uuid';

export const Associations = () => {
  const theme: any = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);

  return (
    <Fragment>
      {associationsDataArray?.length <= 0 ? (
        <NoData
          image={NoAssociationFound}
          message={'There are no associations'}
        >
          <Button
            variant="outlined"
            sx={{ backgroundColor: theme.palette.grey[400] }}
            onClick={() => setOpenDialog(true)}
          >
            <AddCircleIcon sx={{ mr: 1 }} />
            Associate
          </Button>
        </NoData>
      ) : (
        <Fragment>
          <Box textAlign={'end'}>
            <Button variant="contained" onClick={() => setOpenDialog(true)}>
              <AddCircleIcon sx={{ mr: 1 }} />
              Associate
            </Button>
          </Box>
          {associationsDataArray?.map((item: any) => (
            <Box
              border={`1px solid ${theme.palette.grey[400]}`}
              borderLeft={`8px solid ${
                theme['palette'][`${chipColor(item?.status)}`]['main']
              }`}
              boxShadow={4}
              borderRadius={2}
              p={1}
              mt={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              key={uuidv4()}
            >
              <Typography variant="body2" fontWeight={600}>
                {item?.ticketNo}
              </Typography>
              <Chip
                label={item?.status}
                sx={{
                  bgcolor:
                    theme['palette'][`${chipColor(item?.status)}`]['main'],
                  color: theme.palette.common.white,
                }}
              />
            </Box>
          ))}
        </Fragment>
      )}

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
