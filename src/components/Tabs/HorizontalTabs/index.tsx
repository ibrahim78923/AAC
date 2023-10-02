import { useState, Children, SyntheticEvent } from 'react';
import { Tabs, Tab, Typography, useTheme, Box, Card } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styles } from './HorizontalTabs.style';
import { uuid } from 'uuidv4';

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
  } = props;

  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const arrayChildren = Children.toArray(children);

  const theme: any = useTheme();
  return (
    <Card sx={styles?.cardStyle(spacing, disableBoxShadow)}>
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
            key={uuid()}
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
      <Box sx={{ py: 2 }}>
        {arrayChildren?.map((child, index) => (
          <Box key={uuid()}>{value === index && child}</Box>
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
