import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box, CircularProgress, Stack } from '@mui/material';
import Assets from './Assets';
import Deals from './Deals';
import Contacts from './Contacts';
import Companies from './Companies';
import useAssociation from './useAssociation';

export default function Association({ ticketType }: any) {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    isLoading,
    isFetching,
    hasAirSales,
  } = useAssociation();

  return (
    <Stack direction={'column'} spacing={2}>
      <Box textAlign={'end'}>
        <SingleDropdownButton
          dropdownName={'Associate'}
          btnVariant={'contained'}
          color={'primary'}
          dropdownOptions={dropdownOptions}
        />
      </Box>
      <Assets
        ticketType={ticketType}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {isLoading || isFetching ? (
        <Box textAlign={'center'}>
          <CircularProgress />
        </Box>
      ) : (
        hasAirSales && (
          <Deals
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )
      )}

      <Contacts isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      <Companies
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Stack>
  );
}
