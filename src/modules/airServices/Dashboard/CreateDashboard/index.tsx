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
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { dashboardCheckboxData, userData } from './CreateDashboard.data';
import { SearchableMultiSelect } from './SearchableMultiSelect';
import { EyeIcon } from '@/assets/icons';
import { useState } from 'react';
import { LabelType } from './CreateDashboard.interface';
import { v4 as uuidv4 } from 'uuid';

export const CreateDashboard = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [anchorElUserList, setAnchorElUserList] = useState<null | HTMLElement>(
    null,
  );
  const [pendingValue, setPendingValue] = useState<LabelType[]>([]);
  const [specificUsers, setSpecificUser] = useState<LabelType[]>([]);
  const [usersPermissions, setUsersPermissions] = useState<any[]>([]);
  const handleOpenUserslist = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(specificUsers);
    setAnchorElUserList(event?.currentTarget);
  };

  const handleCloseUserslist = () => {
    setSpecificUser(pendingValue);
    if (anchorElUserList) {
      anchorElUserList.focus();
    }
    setUsersPermissions(
      pendingValue.map((user) => ({ ...user, permission: '', id: uuidv4() })),
    );
    setAnchorElUserList(null);
  };
  const handleChange = (event: any) => {
    setValue(event.target.value);
    setUsersPermissions([]);
  };
  const setSpecificUserPermissions = (id: string, event: any) => {
    const tempUsersList = usersPermissions.map((user) =>
      user.id === id ? { ...user, permission: event?.target?.value } : user,
    );
    setUsersPermissions([...tempUsersList]);
  };
  const methodsCreateDashboardFilterForm = useForm({
    defaultValues: {
      dashboardName: '',
      default: false,
      dashboardItems: [],
    },
  });
  const submitCreateDashboardFilterForm = async () => {};
  const resetCreateDashboardFilterForm = async () => {
    methodsCreateDashboardFilterForm?.reset();
  };
  return (
    <>
      <FormProvider methods={methodsCreateDashboardFilterForm}>
        <Typography variant="h3" color="grey.800">
          Create dashboard
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'grey.700',
            mt: '16px',
            mb: '24px',
            pb: '24px',
          }}
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
                    value={value}
                    onChange={handleChange}
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
                    {value === 'Everyone' && (
                      <FormControl sx={{ ml: '15px' }} component="fieldset">
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
                      onClick={handleOpenUserslist}
                      value="Only specific user and teams"
                      control={<Radio />}
                      label="Only specific user and teams"
                    />
                    <SearchableMultiSelect
                      labels={userData}
                      anchorEl={anchorElUserList}
                      handleClose={handleCloseUserslist}
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
              {usersPermissions.map((user) => (
                <Box key={uuidv4()}>
                  <Box
                    sx={{
                      bgcolor: 'common.white',
                      p: '1rem',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: 'grey.700',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Avatar
                          sx={{ width: '24px', height: '24px' }}
                          alt={user?.name}
                        >
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
            <Box sx={{ overflowY: 'scroll', height: '384px', pl: '20px' }}>
              <RHFMultiCheckbox
                name="dashboardItems"
                options={dashboardCheckboxData}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={{
                  padding: '0px 22px',
                  height: '44px',
                  fontWeight: '500',
                  color: 'primary.main',
                  '& path': {
                    fill: theme?.palette?.primary?.main,
                  },
                }}
                startIcon={<EyeIcon />}
              >
                Preview Dashboard
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'grey.700',
                p: '20px',
              }}
            >
              <Typography variant="subtitle1" color="slateBlue.main">
                Details view
              </Typography>
              <Box sx={{ pointerEvents: 'none', userSelect: 'none' }}>
                <Image
                  src={ExampleDashboardImage}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                  alt={'ExampleDashboardImage'}
                />
              </Box>
              <div></div>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              color: theme.palette?.grey[500],
              border: '1px solid',
              borderColor: 'grey.700',
              padding: '0px 22px',
              height: '44px',
              fontWeight: '500',
              '&:hover': { bgcolor: theme.palette.grey[400] },
            }}
            onClick={resetCreateDashboardFilterForm}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              padding: '0px 22px',
              height: '44px',
              fontWeight: '500',
            }}
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
