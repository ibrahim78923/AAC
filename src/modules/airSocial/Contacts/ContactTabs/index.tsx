import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { styles } from './ContactTabs.style';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ContactTabs = (props: any) => {
  const { tabValue, handleTabChange, handleCreateView, tabsArray } = props;
  const theme = useTheme();

  return (
    <TabContext value={tabValue}>
      <Box sx={styles?.container}>
        <TabList variant="scrollable" onChange={handleTabChange}>
          {tabsArray?.map((tab: any) => {
            return (
              <Tab
                sx={{
                  '&.Mui-selected': {
                    color: theme?.palette?.custom?.turquoise_Blue,
                  },
                }}
                classes={{ textColorPrimary: 'text-primary-my' }}
                disableRipple
                key={tab?._id}
                value={tab?._id}
                label={tab?.name}
              />
            );
          })}
        </TabList>

        <Box sx={{ ml: '50px', display: 'inline-flex' }}>
          <AddCircleIcon onClick={handleCreateView} sx={styles?.addIcon} />
        </Box>
      </Box>
    </TabContext>
  );
};

export default ContactTabs;
