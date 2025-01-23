import { Box } from '@mui/material';
import { AssociationsDrawer } from './AssociationsDrawer';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { useAssociations } from './useAssociations';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const Associations = () => {
  const {
    data,
    openDrawer,
    setOpenDrawer,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useAssociations();

  return (
    <>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        hasNoData={!!!data?.length}
        noDataMessage="Associate all the service requests which initiated this purchase order"
        noDataChildren={
          <AddNewItemButton
            variant="outlined"
            name="Associate"
            size="medium"
            onClick={() => setOpenDrawer(true)}
            customStyles={{ backgroundColor: 'primary.lighter' }}
          />
        }
        refreshApi={refetch}
      >
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
          <SingleAssociationsTicket key={item?._id} associationsItem={item} />
        ))}
      </ApiRequestFlow>
      {openDrawer && (
        <AssociationsDrawer
          open={openDrawer}
          setDrawerOpen={() => setOpenDrawer(false)}
        />
      )}
    </>
  );
};
