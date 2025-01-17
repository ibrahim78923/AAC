import NoData from '@/components/NoData';
import { Box } from '@mui/material';
import { AssociationsDrawer } from './AssociationsDrawer';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { useAssociations } from './useAssociations';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const Associations = () => {
  const { data, openDrawer, setOpenDrawer, isLoading, isError, isFetching } =
    useAssociations();

  return (
    <>
      <Box>
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState />
        ) : !!!data?.length ? (
          <>
            <NoData
              message={
                'Associate all the service requests which initiated this purchase order'
              }
            >
              {!isError && (
                <AddNewItemButton
                  variant="outlined"
                  name="Associate"
                  size="medium"
                  onClick={() => setOpenDrawer(true)}
                  customStyles={{ backgroundColor: 'primary.lighter' }}
                />
              )}
            </NoData>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'end'} marginBottom={'1rem'}>
              <AddNewItemButton
                variant="outlined"
                name="Associate"
                size="medium"
                onClick={() => setOpenDrawer(true)}
                customStyles={{ backgroundColor: 'primary.lighter' }}
              />
            </Box>
            {data?.map((item: any) => (
              <SingleAssociationsTicket
                key={item?._id}
                associationsItem={item}
              />
            ))}
          </>
        )}
      </Box>
      {openDrawer && (
        <AssociationsDrawer
          open={openDrawer}
          setDrawerOpen={() => setOpenDrawer(false)}
        />
      )}
    </>
  );
};
