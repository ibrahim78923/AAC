import { styles } from '../HorizontalTabs/HorizontalTabs.style';
import { Box, Card, Tab, Tabs, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PermissionTabsPropsI } from './PermissionsTabs.interface';
import { getActivePermissionsSession } from '@/utils';
import { checkPermissions } from '@/utils/data-transformation';

export const PermissionsTabs = (props: PermissionTabsPropsI) => {
  const {
    tabsDataArray = [],
    variant = 'scrollable',
    spacing = 0,
    defaultValue = 0,
    disableBoxShadow = true,
    border = 'none',
    orientation = 'horizontal',
    handleTabChange,
    hasNoPermissions = false,
  } = props;

  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (value !== defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      handleTabChange?.(newValue);
      setValue(newValue);
    },
    [handleTabChange],
  );

  const filteredTabs = useMemo(() => {
    if (hasNoPermissions) return tabsDataArray;
    const currentPermissions = getActivePermissionsSession() || [];
    const permitTabs = tabsDataArray?.filter((tab: any) => {
      if (tab?.hasNoPermissions) return tab;
      return checkPermissions(currentPermissions, tab?.tabPermissions);
    });
    return permitTabs;
  }, [tabsDataArray]);

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
