import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import NotesEditorDrawer from './NotesEditorDrawer';
import NotesActionDropdown from './NotesActionDropDown';
import useNotes from './useNotes';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { isNullOrEmpty } from '@/utils';
import { MessageIcon, PlusIcon } from '@/assets/icons';
import { styles } from '../ViewDetails.style';
import { v4 as uuidv4 } from 'uuid';
import { IMG_URL } from '@/config';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import CustomPagination from '@/components/CustomPagination';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetter } from '@/utils/api';
import { getInitialsSingleName } from '@/utils/avatarUtils';

const Notes = ({ selected }: any) => {
  const {
    setSelectedCheckboxes,
    handleCheckboxChange,
    selectedCheckboxes,
    setOpenDrawer,
    setPageLimit,
    openDrawer,
    setPage,
    data,
    user,
  } = useNotes(selected);

  const { theme } = useNameWithStyledWords();

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Notes</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={styles?.headingSpacingBetween}>
            {!isNullOrEmpty(data?.data?.notes) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <NotesActionDropdown
                  setOpenDrawer={setOpenDrawer}
                  selectedCheckboxes={selectedCheckboxes}
                  setSelectedCheckboxes={setSelectedCheckboxes}
                />
                <PermissionsGuard
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_NOTE]}
                >
                  <Button
                    variant="contained"
                    className="small"
                    onClick={() => setOpenDrawer('Add')}
                    startIcon={<PlusIcon />}
                  >
                    Add Notes
                  </Button>
                </PermissionsGuard>
              </Box>
            )}
          </Box>
          {isNullOrEmpty(data?.data?.notes) && (
            <Box
              sx={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                display: 'flex',
                height: '35vh',
                gap: 1.5,
              }}
            >
              <MessageIcon />
              <Typography variant="body3">
                There are no notes available
              </Typography>
              <Button
                onClick={() => setOpenDrawer('Add')}
                startIcon={<PlusIcon />}
                variant="contained"
                className="small"
              >
                Add Notes
              </Button>
            </Box>
          )}
        </Grid>
        {!isNullOrEmpty(data?.data?.notes) && (
          <Grid item xs={12} sx={styles?.horizontalTabsInnnerBox}>
            {data?.data?.notes?.map((item: any) => (
              <Grid
                container
                key={uuidv4()}
                sx={{
                  py: 3,
                  px: 1.5,
                  mb: 1,
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                  borderRadius: '8px',
                  border: '1px solid #f2f2f2',
                }}
              >
                <Grid
                  item
                  xs={2}
                  lg={0.5}
                  sm={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    color="primary"
                    name={'name'}
                    onChange={(event) => handleCheckboxChange(event, item)}
                    checked={selectedCheckboxes?.some(
                      (selectedItem) => selectedItem?._id === item?._id,
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={2}
                  lg={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    src={`${IMG_URL}${item?.file?.url}`}
                    alt="_img"
                    sx={{
                      width: 66,
                      height: 66,
                      border: `2px solid ${theme?.palette?.blue?.main}`,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      sx={{
                        color: theme?.palette?.custom?.dim_grey,
                        textTransform: 'upperCase',
                      }}
                    >
                      {getInitialsSingleName(item?.title) ?? 'N/A'}
                    </Typography>
                  </Avatar>
                </Grid>
                <Grid item xs={12} lg={10} sm={9} sx={{ gap: 1 }}>
                  <Stack direction="row" gap={0.5}>
                    <Typography
                      variant="h5"
                      color={theme?.palette?.primary?.main}
                    >
                      {capitalizeFirstLetter(item?.title)}
                    </Typography>
                    <Typography variant="h5"> Created by </Typography>
                    <Typography
                      variant="h5"
                      color={theme?.palette?.primary?.main}
                    >
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    {dayjs(item?.createdAt)?.format(DATE_TIME_FORMAT?.DMYhmma)}
                  </Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: item?.description ?? 'N/A',
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <CustomPagination
            onPageChange={(page: any) => setPage(page)}
            totalRecords={data?.data?.meta?.total}
            currentPage={data?.data?.meta?.page}
            pageLimit={data?.data?.meta?.limit}
            count={data?.data?.meta?.pages}
            setPageLimit={setPageLimit}
            setPage={setPage}
            isPagination
          />
        </Grid>
      </Grid>

      {openDrawer && (
        <NotesEditorDrawer
          setSelectedCheckboxes={setSelectedCheckboxes}
          selectedCheckboxes={selectedCheckboxes}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
          recordId={selected}
        />
      )}
    </Box>
  );
};

export default Notes;
