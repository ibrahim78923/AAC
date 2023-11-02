import { ExampleDashboardImage } from '@/assets/images';
import {
  FormProvider,
  RHFMultiCheckbox,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {
  dashboardCheckboxData,
  previewDashboard,
  userData,
} from './CreateDashboard.data';
import { SearchableMultiSelect } from './SearchableMultiSelect';
import { EyeIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useCreateDashboard } from './useCreateDashboard';
import { styles } from './CreateDashboard.styles';

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
    theme,
    submitCreateDashboardFilterForm,
    resetCreateDashboardFilterForm,
    dashboardItems,
  } = useCreateDashboard();
  return (
    <>
      <FormProvider methods={methodsCreateDashboardFilterForm}>
        <Typography variant="h3" color="grey.800">
          Create dashboard
        </Typography>
        <Grid
          container
          spacing={3}
          sx={styles(theme)?.createDashboardContainer}
        >
          <Grid item xs={6}>
            <div>
              <RHFTextField
                fullWidth={true}
                name="dashboardName"
                label="Dashboard Name"
                required={true}
              />
            </div>
            <Box display="flex" justifyContent="space-between">
              <div>
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
              </div>
              <div>
                <RHFSwitch
                  fullWidth={true}
                  name="default"
                  label="Set as default"
                />
              </div>
            </Box>
            <Box ml="2rem" mb="2rem">
              {usersPermissions?.map((user: any) => (
                <Box key={uuidv4()}>
                  <Box sx={styles(theme)?.userCardOuter}>
                    <Box sx={styles(theme)?.userCardInner}>
                      <Box display="flex" alignItems="center" gap="10px">
                        <Avatar sx={styles(theme)?.userAvatar} alt={user?.name}>
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
            <Box sx={styles(theme)?.multiCheckboxContainer}>
              <RHFMultiCheckbox
                name="dashboardItems"
                options={dashboardCheckboxData}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={styles(theme)?.previewDashboardButton}
                startIcon={<EyeIcon />}
              >
                Preview Dashboard
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles(theme, dashboardItems)?.detailsViewBox}>
              <Typography variant="subtitle1" color="slateBlue.main" mb={2}>
                Details view
              </Typography>
              {!!!dashboardItems?.length ? (
                <>
                  <Box sx={styles(theme)?.bgImageBox}>
                    <Image
                      src={ExampleDashboardImage}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                      alt={'ExampleDashboardImage'}
                    />
                  </Box>
                  <div></div>
                </>
              ) : (
                <Grid container spacing={3} height={680} overflow="scroll">
                  {dashboardItems?.map((item) => (
                    <Grid item xs={12} key={uuidv4()}>
                      {previewDashboard?.[item as string]}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" gap="0.6rem" justifyContent="flex-end">
          <Button
            sx={styles(theme)?.buttonStyles}
            variant="outlined"
            color="secondary"
            onClick={resetCreateDashboardFilterForm}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={styles(theme)?.buttonStyles}
            onClick={submitCreateDashboardFilterForm}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
