import NoData from '@/components/NoData';
import { Box, Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { AssociationsDrawer } from './AssociationsDrawer';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { NoAssociationFoundImage } from '@/assets/images';
import { useAssociations } from './useAssociations';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Associations = () => {
  const theme: any = useTheme();
  const { associationsList, openDrawer, setOpenDrawer, isLoading, isError } =
    useAssociations();
  return (
    <>
      <Box>
        {isLoading ? (
          <SkeletonTable />
        ) : associationsList?.length === 0 || !!!associationsList ? (
          <>
            <NoData
              image={NoAssociationFoundImage}
              message={
                isError
                  ? 'Something went wrong'
                  : 'Make approved purchases by sending the order to your stakeholders for approval'
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
            {associationsList?.map((item: any) => (
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
