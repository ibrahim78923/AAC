import { Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import ProfileCard from '@/components/ProfileCard';
import Profile from './Profile';
import Security from './Security';
import { useState } from 'react';
import useEditProfile from './useEditProfile';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { generateImage } from '@/utils/avatarUtils';
import useUsersDetails from '@/modules/orgAdmin/Users/UsersDetails/useUsersDetails';
import { ROLES } from '@/constants/strings';

const EditProfile = () => {
  const { getUserData, profileDataLoading } = useEditProfile();
  const { handleChangeImg } = useUsersDetails();
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ProfileCard
        userName={`${getUserData?.data?.firstName} ${getUserData?.data?.lastName}`}
        email={getUserData?.data?.email}
        phone={getUserData?.data?.phoneNumber}
        role={getUserData?.data?.role}
        editBtn={false}
        isLoading={profileDataLoading}
        src={`${
          getUserData?.data?.avatar
            ? generateImage(getUserData?.data?.avatar?.url)
            : ''
        }`}
        handleChangeImg={(e: any) => handleChangeImg(e, getUserData?.data?._id)}
        isBadge={getUserData?.data?.role !== ROLES?.ORG_REQUESTER}
      />
      {profileDataLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Security" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Profile />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Security />
          </CustomTabPanel>
        </Box>
      )}
    </Box>
  );
};

export default EditProfile;
