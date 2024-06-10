import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { styles } from './FormTabs.style';

const FormTabs = (props: any) => {
  const { tabValue, handleTabChange, tabsArray } = props;
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
                disableRipple
                key={tab?.value}
                value={tab?.value}
                label={tab?.label}
              />
            );
          })}
        </TabList>
      </Box>
    </TabContext>
  );
};

export default FormTabs;
