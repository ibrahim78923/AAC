import { useState, Children, SyntheticEvent, cloneElement } from 'react';
import { Tabs, Tab, Typography, useTheme, Box, Card } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styles } from './HorizontalTabs.style';
import { v4 as uuidv4 } from 'uuid';

const HorizontalTabs = (props: any) => {
  const {
    tabsDataArray = [],
    children,
    setActiveTab = () => {},
    variant = 'scrollable',
    spacing,
    defaultValue = 0,
    disableBoxShadow = true,
    disabled = false,
    addIcon = false,
    handleAddTab,
    border,
  } = props;

  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const arrayChildren = Children.toArray(children);

  const theme: any = useTheme();
  return (
    <Card sx={styles?.cardStyle(spacing, disableBoxShadow, border)}>
      <Tabs
        selectionFollowsFocus
        orientation="horizontal"
        variant={variant}
        sx={styles.tabRoot(theme)}
        TabIndicatorProps={styles?.tabIndicator(theme)}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        // scrollButtons={false}
        allowScrollButtonsMobile
      >
        {tabsDataArray?.map((title: string) => (
          <Tab
            wrapped
            disabled={
              !Array.isArray(disabled) ? disabled : disabled?.includes(title)
            }
            sx={styles?.tabsStyle?.(theme)}
            key={uuidv4()}
            onClick={() => {
              setActiveTab ? setActiveTab(title) : null;
            }}
            label={
              <Typography variant="subtitle2" component="span">
                {title}
              </Typography>
            }
          />
        ))}
        {addIcon && (
          <AddCircleIcon sx={styles?.circleIconStyle} onClick={handleAddTab} />
        )}
      </Tabs>
      <br />
      <Box sx={{ py: { md: 2, xs: 0.5 } }}>
        {arrayChildren?.map((child: any, index) => (
          <Box key={uuidv4()}>
            {value === index && cloneElement(child, { setValue })}
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default HorizontalTabs;

// ----------------------------------------------------------------------
// Styles
// const styles = {
//   tabRoot: (theme: any) => ({
//     borderBottom: 1,
//     borderColor: theme.palette.primary.lighter,
//   }),

//   tabIndicator: (theme: any) => ({
//     sx: { background: theme.palette.primary.main },
//   }),
// };
