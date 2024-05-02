import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

const DateOverrides = (props: any) => {
  const { theme, disabled } = props;
  return (
    <>
      <Typography variant="h3">Date Overrides</Typography>
      {disabled === false ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
          height={460}
          textAlign={'center'}
        >
          <Typography p={3}>
            Add dates when your availability changes from your weekly hours....
          </Typography>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Box display={'flex'} justifyContent={'center'} mt={3}>
            <Button startIcon={<AddCircleIcon />}>Add a date over ride</Button>
          </Box>
        </Box>
      ) : (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
          height={460}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography width={'310px'}>
            Add dates when your availability changes from your weekly hours....
          </Typography>
        </Box>
      )}
    </>
  );
};

export default DateOverrides;
