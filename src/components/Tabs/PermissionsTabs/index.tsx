import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useAuth from '@/hooks/useAuth';
import { styles } from '../HorizontalTabs/HorizontalTabs.style';
import { Card, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { PermissionTabsPropsI } from './PermissionsTabs.interface';

export const PermissionsTabs = (props: PermissionTabsPropsI) => {
  const {
    tabsDataArray = [],
    variant = 'scrollable',
    spacing = 0,
    defaultValue = 0,
    disableBoxShadow = true,
    border = 'none',
    orientation = 'horizontal',
  } = props;

  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const checkPermissions = (
    currentPermissions: any,
    modulePermissions: any,
  ) => {
    const permissionsDictionary: any = {};
    modulePermissions?.forEach((permission: any) => {
      permissionsDictionary[permission] = true;
    });

    return (
      currentPermissions?.some(
        (permission: any) => permissionsDictionary?.[permission],
      ) || false
    );
  };

  const { currentPermissions } = useAuth();

  const filteredTabs = tabsDataArray?.filter((tab: any) => {
    if (tab?.hasNoPermissions) return tab;
    return checkPermissions(currentPermissions, tab?.tabPermissions);
  });

  return (
    <Card sx={styles?.cardStyle(spacing, disableBoxShadow, border)}>
      <Tabs
        value={value}
        onChange={handleChange}
        selectionFollowsFocus
        orientation={orientation}
        variant={variant}
        sx={styles?.tabRoot(theme)}
        TabIndicatorProps={styles?.tabIndicator(theme)}
        defaultValue={defaultValue}
        allowScrollButtonsMobile
      >
        {filteredTabs?.map((tab: any) => (
          <Tab
            wrapped
            disabled={tab?.disabled}
            sx={styles?.tabsStyle?.(theme)}
            key={tab?._id}
            label={tab?.name}
          />
        ))}
      </Tabs>
      <Box sx={{ py: { md: 2, xs: 0.5 } }}>
        {filteredTabs?.map((child: any, index: number) => {
          return (
            <Box key={child?._id}>
              {value === index && (
                <>
                  <br />
                  <child.component {...child?.componentProps} />
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};
