import {
  Box,
  Button,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FolderIcon } from '@/assets/icons';
import { styles } from './Folders.style';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import Search from '@/components/Search';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import {
  useDeleteEmailFolderMutation,
  useDuplicateEmailFolderMutation,
} from '@/services/airMarketer/emailFolder';
import { successSnackbar } from '@/utils/api';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';
const Folders = ({
  allFolder,
  allSelectedFoldersIds,
  setAllSelectedFoldersIds,
  searchValue,
  setSearchValue,
  isLoading,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [actionType, setActionType] = useState('');

  const [deleteFolders, { isLoading: deleteIsLoading }] =
    useDeleteEmailFolderMutation();

  const [duplicateFolders, { isLoading: duplicateIsLoading }] =
    useDuplicateEmailFolderMutation();

  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (id: string) => {
    if (allSelectedFoldersIds?.includes(id)) {
      setAllSelectedFoldersIds(
        allSelectedFoldersIds?.filter((item: string) => item != id),
      );
    } else {
      setAllSelectedFoldersIds([...allSelectedFoldersIds, id]);
    }
  };

  const handleAction = async () => {
    if (actionType === 'delete') {
      try {
        await deleteFolders({
          ids: allSelectedFoldersIds?.map((id: any) => `ids=${id}`)?.join('&'),
        }).unwrap();
        successSnackbar('Folder Deleted Successfully');
        setIsOpenDelete(false);
        setAllSelectedFoldersIds([]);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    } else if (actionType === 'duplicate') {
      try {
        await duplicateFolders({
          id: allSelectedFoldersIds?.map((id: any) => `id=${id}`)?.join('&'),
        }).unwrap();
        successSnackbar('Folder Duplicate Successfully');
        setIsOpenDelete(false);
        setAllSelectedFoldersIds([]);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Grid container px={1.5} mt={4}>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          sx={styles?.documentTitle(theme)}
        >
          <Search
            label="Search here"
            width="260px"
            searchBy={searchValue}
            setSearchBy={(e: string) => {
              setSearchValue(e);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box sx={styles?.actionFilterBox}>
            <Button
              sx={styles?.actionButton(theme)}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="small"
              disabled={allSelectedFoldersIds?.length > 0 ? false : true}
            >
              Action
              <ArrowDropDownIcon
                sx={{ color: `${theme?.palette?.custom?.main}` }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setActionType('duplicate');
                  setIsOpenDelete(true);
                }}
                disabled={allSelectedFoldersIds?.length > 1 ? true : false}
              >
                {' '}
                Duplicate
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setActionType('delete');
                  setIsOpenDelete(true);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        {isLoading ? (
          <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
        ) : (
          allFolder?.data?.emailfolders &&
          (allFolder?.data?.emailfolders?.length > 0 ? (
            allFolder?.data?.emailfolders?.map((item: any) => {
              return (
                <Grid key={uuidv4()} item lg={3} md={3} sm={6} xs={12} p={1}>
                  <Box
                    sx={{
                      border: `1.16px solid ${theme?.palette?.custom?.pale_gray}`,
                      borderRadius: '11.56px',
                      padding: '0.6rem',
                    }}
                    key={uuidv4()}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox
                        checked={allSelectedFoldersIds?.includes(item?._id)}
                        onChange={() => {
                          handleCheckboxChange(item?._id);
                        }}
                      />
                    </Box>

                    <Link
                      href={`${AIR_MARKETER?.EMAIL_FOLDER_EMAILS}?folder=${item?.name}&id=${item?._id}`}
                    >
                      <Grid item lg={12} md={12} mt={-3}>
                        <Box sx={styles?.folderBackground(theme)}>
                          <FolderIcon />
                        </Box>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography
                          pt={1.7}
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            color: `${theme?.palette?.grey[600]}`,
                          }}
                        >
                          {item?.name}
                        </Typography>
                        <Typography
                          variant="body3"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: `${theme?.palette?.grey[900]}`,
                            fontWeight: 400,
                            marginTop: '4px',
                          }}
                        >
                          Created By:
                          <Typography
                            sx={{
                              color: `${theme?.palette?.custom?.main}`,
                              fontWeight: 500,
                            }}
                          >
                            {item?.createdByName}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body3"
                          pb={2}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: `${theme?.palette?.grey[900]}`,
                            fontWeight: 400,
                            marginTop: '4px',
                          }}
                        >
                          Created Date:
                          <Typography
                            sx={{
                              color: `${theme?.palette?.custom?.main}`,
                              fontWeight: 500,
                            }}
                          >
                            {dayjs(item?.createdAt).format(DATE_FORMAT.UI)}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Link>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography variant="body1" mt={2} pl={1}>
              {' '}
              No record found{' '}
            </Typography>
          ))
        )}
      </Grid>

      <AlertModals
        message={
          actionType === 'delete'
            ? 'Are you sure you want to delete this folder?'
            : 'Are you sure you want to duplicate this folder?'
        }
        type={actionType}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={handleAction}
        loading={deleteIsLoading || duplicateIsLoading}
      />
    </>
  );
};

const SkeletonBox = () => {
  return (
    <Box
      sx={{
        my: 4,
        padding: '0px 35px',
        gap: '10px',
      }}
    >
      <Box>
        <Skeleton variant="rectangular" width={25} height={25} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="rectangular" width={250} height={30} />
        <Skeleton
          variant="rectangular"
          width={230}
          height={15}
          sx={{ mt: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={230}
          height={15}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default Folders;
