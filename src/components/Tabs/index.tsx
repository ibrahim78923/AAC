import React, { useState, useEffect } from 'react';

import { Tabs, Tab, Box, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { CommonTabsPropsI, TabPanelPropsI } from './Tabs.interface';

import { styles } from './Tabs.style';

import { v4 as uuidv4 } from 'uuid';

const CustomTabPanel = (props: TabPanelPropsI) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

const tabsProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CommonTabs = (props: CommonTabsPropsI) => {
  const {
    tabStyle = 'horizontal',
    tabsArray,
    children,
    getTabVal = () => {},
    addIcon = false,
    onAddClick = () => {},
    activeTab = 0,
  } = props;

  const theme = useTheme();
  const arrayChildren = React.Children.toArray(children);

  const [value, setValue] = useState(0);

  useEffect(() => {
    getTabVal(value);
  }, []);

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getTabVal(newValue);
  };

  return (
    <Box sx={styles.tabWrapper}>
      <Box
        className="tabs-container"
        sx={{
          mt: '20px',
          borderBottom: 1,
          borderColor: theme?.palette?.custom?.off_white_three,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Tabs
          variant="scrollable"
          defaultValue={activeTab}
          value={value}
          onChange={handleChange}
          aria-label="common tabs"
          orientation={tabStyle}
        >
          {tabsArray?.map((tab: string, index: number) => (
            <Tab
              sx={{
                '&.Mui-selected': {
                  color: theme?.palette?.custom?.turquoise_Blue,
                },
              }}
              classes={{ textColorPrimary: 'text-primary-my' }}
              disableRipple
              key={uuidv4()}
              label={tab}
              {...tabsProps(index)}
            />
          ))}
        </Tabs>
        {addIcon && (
          <Box sx={{ ml: '50px' }}>
            <AddCircleIcon sx={styles?.addIcon(theme)} onClick={onAddClick} />
          </Box>
        )}
      </Box>
      {/* {isHeader && (
        <Box sx={styles.headerWrapper}>
          <Search size="small" {...searchBarProps} />
          <Box sx={styles.headerChild}>{headerChildren}</Box>
        </Box>
      )} */}
      {arrayChildren?.map((tab: React.ReactNode | string, index: number) => (
        <div key={uuidv4()}>
          {value === index && (
            <CustomTabPanel value={value} index={index}>
              {tab}
            </CustomTabPanel>
          )}
        </div>
      ))}
    </Box>
  );
};
export default CommonTabs;
