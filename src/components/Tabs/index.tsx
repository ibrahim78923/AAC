import * as React from 'react';

import { Tabs, Tab, Box } from '@mui/material';

import Search from '../Search';

import { CommonTabsProps, TabPanelProps } from './Tabs.interface';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Tabs.style';

const CustomTabPanel = (props: TabPanelProps) => {
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

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CommonTabs = (props: CommonTabsProps) => {
  const {
    tabsArray,
    children,
    isHeader,
    headerChildren,
    searchBarProps = {},
    getTabVal = () => {},
  } = props;
  const arrayChildren = React.Children.toArray(children);

  const [value, setValue] = React.useState(0);

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
              {...a11yProps(index)}
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
