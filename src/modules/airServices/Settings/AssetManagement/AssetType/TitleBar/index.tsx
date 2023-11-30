import { Create, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './TitleBar.style';
const TitleBar = (props?: any) => {
  const { title, handleCollapse, handleUpdate, icNotCollapseAble } = props;
  const { palette } = useTheme();

  return (
    <Box
      borderLeft={`4px solid ${palette?.primary.main}`}
      boxShadow={1}
      borderRadius={2}
      display={'flex'}
      alignItems={'center'}
      justifyContent="space-between"
      gap={1.8}
      key={uuidv4()}
      px={1.5}
      sx={{
        backgroundColor: palette?.common?.white,
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent="space-between"
        gap={1.8}
      >
        {icNotCollapseAble ? (
          'L'
        ) : (
          <KeyboardArrowDown sx={styles?.arrowStyle} onClick={handleCollapse} />
        )}
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography fontWeight={500} py={1.5} textTransform="capitalize">
          {title}
        </Typography>
      </Box>
      <Create sx={styles?.createIconStyle} onClick={handleUpdate} />
    </Box>
  );
};

export default TitleBar;
