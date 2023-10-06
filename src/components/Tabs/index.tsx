import React, { useState, useEffect } from 'react';

import { Tabs, Tab, Box } from '@mui/material';

import Search from '../Search';

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
    tabsArray,
    children,
    isHeader,
    headerChildren,
    searchBarProps = {},
    getTabVal = () => {},
  } = props;
  const arrayChildren = React.Children.toArray(children);

  const [value, setValue] = useState(0);

  useEffect(() => {
    getTabVal(value);
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getTabVal(newValue);
  };

  return (
    <Box sx={styles.tabWrapper}>
      <Box sx={{ borderBottom: 1, borderColor: '#EAECF0' }}>
        <Tabs value={value} onChange={handleChange} aria-label="common tabs">
          {tabsArray?.map((tab: string, index: number) => (
            <Tab
              classes={{ textColorPrimary: 'text-primary-my' }}
              disableRipple
              key={uuidv4()}
              label={tab}
              {...tabsProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {isHeader && (
        <Box sx={styles.headerWrapper}>
          <Search {...searchBarProps} />
          <Box sx={styles.headerChild}>{headerChildren}</Box>
        </Box>
      )}
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
