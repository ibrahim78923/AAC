import { Button, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import NoData from '@/components/NoData';
import { AssociationsModal } from './AssociationsModal';

export const Associations = () => {
  const [openModal, setOpenModal] = useState(false);
  const theme: any = useTheme();

  return (
    <Fragment>
      <NoData image={NoAssociationFound} message={'There are no associations'}>
        <Button
          variant="outlined"
          onClick={() => setOpenModal(true)}
          sx={{ backgroundColor: theme.palette.grey[400] }}
        >
          <AddCircleIcon sx={{ mr: 1 }} />
          Asssociate
        </Button>
      </NoData>
      <AssociationsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        theme={theme}
      />
    </Fragment>
  );
};
