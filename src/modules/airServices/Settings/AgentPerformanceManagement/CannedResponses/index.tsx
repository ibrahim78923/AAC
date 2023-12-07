import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  FolderLargePrimaryIcon,
  FolderLargeYellowIcon,
  LockedIcon,
} from '@/assets/icons';
import { responseCategories } from './CannedResponses.data';
import { MoreHoriz } from '@mui/icons-material';
import { CreateNewFolder } from './CreateNewFolder';
import Search from '@/components/Search';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { useCannedResponses } from './useCannedResponses';
import { DeleteFolderModal } from './DeleteFolderModal';

export const CannedResponses = () => {
  const {
    router,
    convertToHyphenCase,
    handleActionClose,
    actionPop,
    openAction,
    handleActionClick,
    setOpenCreateNewFolderModal,
    openCreateNewFolderModal,
  } = useCannedResponses();
  return (
    <>
      <Box mb={2}>
        <PageTitledHeader
          title="Canned Responses"
          canMovedBack
          moveBack={() =>
            router?.push(AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS)
          }
        />
      </Box>
      <Box mb={2}>
        <Search size="small" label="Search" />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap=".7rem"
            height="12rem"
            border="0.06rem solid"
            borderColor="grey.700"
            borderRadius=".5rem"
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setOpenCreateNewFolderModal({ open: true, editData: null })
            }
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.1rem"
              height="2.1rem"
              bgcolor="custom.light_lavender_gray"
              borderRadius="50%"
            >
              <AddRoundedIcon
                sx={{
                  color: 'blue.dull_blue',
                }}
              />
            </Box>
            <Typography fontWeight={600} color="blue.dull_blue">
              Add New
            </Typography>
          </Box>
        </Grid>
        {responseCategories?.map((response) => (
          <Grid item xs={4} key={response?.id}>
            <Box
              height="12rem"
              border="0.06rem solid"
              borderColor="grey.700"
              borderRadius=".5rem"
              sx={{ cursor: 'pointer' }}
            >
              <Box display="flex" justifyContent="end">
                <IconButton
                  disabled={response?.default}
                  onClick={handleActionClick}
                >
                  {response?.default ? (
                    <LockedIcon />
                  ) : (
                    <MoreHoriz
                      sx={{ color: 'secondary.lighter' }}
                      fontSize="medium"
                    />
                  )}
                </IconButton>
                <Menu
                  open={openAction}
                  anchorEl={actionPop}
                  onClose={handleActionClose}
                  sx={{ '& .MuiPaper-root': { boxShadow: 2 } }}
                  transformOrigin={{ vertical: 10, horizontal: 80 }}
                >
                  <MenuItem
                    sx={{ pr: 5 }}
                    onClick={() => {
                      setOpenCreateNewFolderModal({
                        open: true,
                        editData: response,
                      });
                      handleActionClose();
                    }}
                  >
                    Edit
                  </MenuItem>
                  <DeleteFolderModal
                    id={response?.id}
                    handleActionClose={handleActionClose}
                  />
                </Menu>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                p={2}
                flexDirection="column"
                height="60%"
                component={Link}
                href={`${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                  response?.name,
                )}`}
              >
                <Box>
                  {response?.default ? (
                    <FolderLargePrimaryIcon />
                  ) : (
                    <FolderLargeYellowIcon />
                  )}
                </Box>
                <Typography fontWeight={700} color="blue.dark" mt={1}>
                  {response?.name}
                </Typography>
                <Typography
                  fontWeight={500}
                  variant="body2"
                  color="custom.main"
                >
                  {response?.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <CreateNewFolder
        openCreateNewFolderModal={openCreateNewFolderModal}
        closeCreateNewFolderModal={() =>
          setOpenCreateNewFolderModal({ open: false, editData: null })
        }
      />
    </>
  );
};
