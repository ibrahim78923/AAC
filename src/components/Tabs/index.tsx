import * as React from 'react';
import { Tabs, Tab, Box, TextField } from '@mui/material';
import { CommonTabsProps, TabPanelProps } from '@/types/shared/Tabs';
import { uuid } from 'uuidv4';

const style = {
  tabWrapper: {
    '& .text-primary-my': { minWidth: 'auto', paddingBottom: '0px' },
  },
  headerWrapper: {
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '15px',
  },
  headerChild: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
};
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
  } = props;
  const arrayChildren = React.Children.toArray(children);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={style.tabWrapper}>
      <Box sx={{ borderBottom: 1, borderColor: '#EAECF0' }}>
        <Tabs value={value} onChange={handleChange} aria-label="common tabs">
          {tabsArray?.map((tab: string, index: number) => (
            <Tab
              classes={{ textColorPrimary: 'text-primary-my' }}
              disableRipple
              key={uuid()}
              label={tab}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {isHeader && (
        <Box sx={style.headerWrapper}>
          <TextField
            placeholder={searchBarProps.placeholder || 'search here'}
            size="small"
            {...searchBarProps}
          />
          <Box sx={style.headerChild}>{headerChildren}</Box>
        </Box>
      )}
      {arrayChildren?.map((tab: React.ReactNode | string, index: number) => (
        <div key={uuid()}>
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
