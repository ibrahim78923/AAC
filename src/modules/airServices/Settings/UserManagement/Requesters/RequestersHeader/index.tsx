import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { CirclePlusIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import UpsertRequesters from '../UpsertRequesters';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AgentConversionDelete } from '../AgentConversionDelete';
import { AgentConversionWarning } from '../AgentConversionWarning';
import { useRequestersHeader } from './useRequestersHeader';
export const RequestersHeader = ({ selectedRequestorsList }: any) => {
  const {
    setSearchValue,
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    isDrawerOpen,
    setIsDrawerOpen,
    requestorsDropdownOptions,
    router,
  } = useRequestersHeader();

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Box sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
            }
          />
        </Box>
        <Box mb={1}>
          <Typography variant="h3">Requesters</Typography>
        </Box>
      </Box>
      <Box
        mt={3}
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
      >
        <Box>
          <Search
            label="Search Here"
            width={'16.25rem'}
            setSearchBy={setSearchValue}
          />
        </Box>
        <Box display={'flex'} gap={1} mt={{ xs: 3 }}>
          <SingleDropdownButton
            dropdownName={'Actions'}
            dropdownOptions={requestorsDropdownOptions}
            disabled={!!!selectedRequestorsList?.length}
          />
          <Button
            startIcon={<CirclePlusIcon />}
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Requestors
          </Button>
          <UpsertRequesters
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            title={'Add Requestor'}
            okText={'Submit'}
          />
          <AgentConversionDelete
            open={deleteModal}
            handleClose={() => {
              setDeleteModal(false);
            }}
          />
          <AgentConversionWarning
            open={warningModal}
            handleClose={() => {
              setWarningModal(false);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
