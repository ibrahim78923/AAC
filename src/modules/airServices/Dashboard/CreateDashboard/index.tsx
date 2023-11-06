import { DashboardPrototypeImage } from '@/assets/images';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { previewDashboard, userData } from './CreateDashboard.data';
import { SearchableMultiSelect } from './SearchableMultiSelect';
import { v4 as uuidv4 } from 'uuid';
import { useCreateDashboard } from './useCreateDashboard';
import { styles } from './CreateDashboard.styles';
import { PreviewDashboardModal } from '../PreviewDashboardItems/PreviewDashboardModal';
import { DragDropContext } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import { LoadingButton } from '@mui/lab';
const RHFMultiCheckboxDraggable = dynamic(
  () => import('@/components/ReactHookForm/RHFMultiCheckboxDraggable'),
  { ssr: false },
);

const EVERYONE = 'Everyone';

export const CreateDashboard = () => {
  const {
    methodsCreateDashboardFilterForm,
    accessValue,
    handleChangeAccessValue,
    specificUsers,
    setPendingValue,
    pendingValue,
    anchorElUserList,
    handleOpenUsersList,
    handleCloseUsersList,
    usersPermissions,
    setSpecificUserPermissions,
    submitCreateDashboardFilterForm,
    resetCreateDashboardFilterForm,
    dashboardItems,
    onDragEnd,
    dashboardCheckboxItems,
  } = useCreateDashboard();
  return (
    <>
      <FormProvider methods={methodsCreateDashboardFilterForm}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
        >
          <Typography variant="h3" color="grey.800">
            Create dashboard
          </Typography>
          <Box sx={styles()?.rhfSwitchBox}>
            <RHFSwitch name="default" label="Set as default" />
          </Box>
        </Box>
        <Grid container spacing={3} sx={styles()?.createDashboardContainer}>
          <Grid item xl={6} xs={12}>
            <Box>
              <RHFTextField
                fullWidth={true}
                name="dashboardName"
                label="Dashboard Name"
                required={true}
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <FormControl>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="slateblue.main"
                  >
                    Who can access this dashboard?
                  </Typography>
                  <RadioGroup
                    value={accessValue}
                    onChange={handleChangeAccessValue}
                    name="access"
                  >
                    <FormControlLabel
                      value="Private to owner (me)"
                      control={<Radio />}
                      label="Private to owner (me)"
                    />
                    <FormControlLabel
                      value="Everyone"
                      control={<Radio />}
                      label="Everyone"
                    />
                    {accessValue === EVERYONE && (
                      <FormControl sx={{ ml: 2 }} component="fieldset">
                        <RadioGroup aria-label="child" name="child">
                          <FormControlLabel
                            value="View and edit"
                            control={<Radio />}
                            label="View and edit"
                          />
                          <FormControlLabel
                            value="View only"
                            control={<Radio />}
                            label="View only"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                    <FormControlLabel
                      onClick={handleOpenUsersList}
                      value="Only specific user and teams"
                      control={<Radio />}
                      label="Only specific user and teams"
                    />
                    <SearchableMultiSelect
                      labels={userData}
                      anchorEl={anchorElUserList}
                      handleClose={handleCloseUsersList}
                      pendingValue={pendingValue}
                      setPendingValue={setPendingValue}
                      value={specificUsers}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box display={{ xl: 'block', xs: 'none' }}>
                <RHFSwitch name="default" label="Set as default" />
              </Box>
            </Box>
            <Box ml="2rem" mb="2rem">
              {usersPermissions?.map((user: any) => (
                <Box key={uuidv4()}>
                  <Box sx={styles()?.userCardOuter}>
                    <Box sx={styles()?.userCardInner}>
                      <Box display="flex" alignItems="center" gap="10px">
                        <Avatar sx={styles()?.userAvatar} alt={user?.name}>
                          <Image
                            src={user?.src}
                            alt={user?.name}
                            layout="fill"
                          />
                        </Avatar>
                        <Typography
                          variant="body2"
                          color="grey.600"
                          fontWeight="500"
                        >
                          {user?.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <FormControlLabel
                      value="View and edit"
                      control={
                        <Radio
                          checked={user?.permission === 'View and edit'}
                          onChange={(event) =>
                            setSpecificUserPermissions(user?.id, event)
                          }
                        />
                      }
                      label="View and edit"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      value="View only"
                      control={
                        <Radio
                          checked={user?.permission === 'View only'}
                          onChange={(event) =>
                            setSpecificUserPermissions(user?.id, event)
                          }
                        />
                      }
                      label="View only"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Typography variant="h6" fontWeight={600} color="slateblue.main">
              Use the checkboxes to remove/add any report you want
            </Typography>
            <Box sx={styles()?.multiCheckboxContainer}>
              <DragDropContext onDragEnd={onDragEnd}>
                <RHFMultiCheckboxDraggable
                  name="dashboardItems"
                  options={dashboardCheckboxItems}
                />
              </DragDropContext>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <PreviewDashboardModal
                dashboardItems={dashboardItems}
                type="Manage"
              />
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={styles(dashboardItems)?.detailsViewBox}>
              <Typography variant="subtitle1" color="slateBlue.main" mb={2}>
                Details view
              </Typography>
              {!!!dashboardItems?.length ? (
                <>
                  <Box sx={styles()?.bgImageBox}>
                    <Image
                      src={DashboardPrototypeImage}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                      alt={'DashboardPrototypeImage'}
                    />
                  </Box>
                  <Box></Box>
                </>
              ) : (
                <Grid container spacing={3} height={680} overflow="scroll">
                  {dashboardItems?.map((item: any) => (
                    <Grid item xs={12} key={uuidv4()}>
                      {previewDashboard?.[item as string]}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
      <Box display="flex" gap="0.6rem" justifyContent="flex-end">
        <LoadingButton
          sx={styles()?.buttonStyles}
          variant="outlined"
          color="secondary"
          onClick={resetCreateDashboardFilterForm}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant="contained"
          sx={styles()?.buttonStyles}
          onSubmit={submitCreateDashboardFilterForm}
          type="submit"
        >
          Create
        </LoadingButton>
      </Box>
    </>
  );
};
