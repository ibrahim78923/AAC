import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styles } from './CannedResponses.styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FolderLargeIcon, LockedIcon } from '@/assets/icons';
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
    theme,
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
      <Box sx={styles?.headerBox}>
        <PageTitledHeader
          title="Canned Responses"
          canMovedBack
          moveBack={() => router?.back()}
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
            sx={styles?.mainBox}
            onClick={() =>
              setOpenCreateNewFolderModal({ open: true, editData: null })
            }
          >
            <Box sx={styles?.iconParent}>
              <AddRoundedIcon sx={styles?.plusIcon} />
            </Box>
            <Typography fontWeight={600} color="blue.dull_blue">
              Add New
            </Typography>
          </Box>
        </Grid>
        {responseCategories?.map((response) => (
          <Grid item xs={4} key={response?.id}>
            <Box sx={styles?.mainBox}>
              <Box display="flex" justifyContent="end">
                <IconButton
                  disabled={response?.default}
                  onClick={handleActionClick}
                >
                  {response?.default ? (
                    <LockedIcon />
                  ) : (
                    <MoreHoriz sx={styles?.moreIcon} fontSize="medium" />
                  )}
                </IconButton>
                <Menu
                  open={openAction}
                  anchorEl={actionPop}
                  onClose={handleActionClose}
                  sx={styles?.menuParent}
                  transformOrigin={{ vertical: 10, horizontal: 80 }}
                >
                  <MenuItem
                    sx={styles?.menuItem}
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
                sx={styles?.cannedResponseCard}
                component={Link}
                href={`${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                  response?.name,
                )}`}
              >
                <Box>
                  <FolderLargeIcon
                    color={
                      response?.default
                        ? theme?.palette?.primary?.main
                        : theme?.palette?.warning?.main
                    }
                  />
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
