import { Button, useTheme } from '@mui/material';
import { Fragment } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import NoData from '@/components/NoData';

export const Associations = () => {
  const theme: any = useTheme();

  return (
    <Fragment>
      <NoData image={NoAssociationFound} message={'There are no associations'}>
        <Button
          variant="outlined"
          sx={{ backgroundColor: theme.palette.grey[400] }}
        >
          <AddCircleIcon sx={{ mr: 1 }} />
          Asssociate
        </Button>
      </NoData>
    </Fragment>
  );
};
