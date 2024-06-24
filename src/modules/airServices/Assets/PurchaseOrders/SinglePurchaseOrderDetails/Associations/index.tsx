import NoData from '@/components/NoData';
import { Box, Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { AssociationsDrawer } from './AssociationsDrawer';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { useAssociations } from './useAssociations';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const Associations = () => {
  const theme: any = useTheme();
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
                'Make approved purchases by sending the order to your stakeholders for approval'
              }
            >
              {!isError && (
                <Button
                  sx={{
                    marginRight: '12px',
                    backgroundColor: theme?.palette?.primary?.light,
                    color: theme?.palette?.primary?.main,
                  }}
                  variant="outlined"
                  startIcon={<AddCircleIcon />}
                  onClick={() => setOpenDrawer(true)}
                >
                  Associate
                </Button>
              )}
            </NoData>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'end'} marginBottom={'1rem'}>
              <Button
                sx={{
                  marginRight: '12px',
                  backgroundColor: theme?.palette?.primary?.light,
                  color: theme?.palette?.primary?.main,
                }}
                onClick={() => setOpenDrawer(true)}
                variant="outlined"
                startIcon={<AddCircleIcon />}
              >
                Associate
              </Button>
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
      <AssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
      />
    </>
  );
};
