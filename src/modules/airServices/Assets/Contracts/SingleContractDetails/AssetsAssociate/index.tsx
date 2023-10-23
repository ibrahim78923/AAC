import { Fragment } from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { associationsImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { AssetsAssociateTableData } from './AssetsAssociateDetail/AssetsAssociateTable/AssetsAssociate.data';
import { AssetsAssociateDetail } from './AssetsAssociateDetail';
import { useRouter } from 'next/router';

export const AssetsAssociate = () => {
  const router = useRouter();
  return (
    <Fragment>
      {!!AssetsAssociateTableData?.length ? (
        <AssetsAssociateDetail />
      ) : (
        <NoData
          message="There are no Asset associations"
          image={associationsImage}
        >
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() =>
              router.push({
                pathname:
                  '/air-services/assets/contracts/detail/add-associate-asset',
              })
            }
          >
            Associate Asset
          </Button>
        </NoData>
      )}
    </Fragment>
  );
};
