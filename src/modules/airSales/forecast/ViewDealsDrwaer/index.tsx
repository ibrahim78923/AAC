import CommonDrawer from '@/components/CommonDrawer';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

const ViewDealsDrawer = (props: any) => {
  const { isOpenDrawer, onClose } = props;
  const [personName, setPersonName] = useState<string[]>([]);
  const theme = useTheme();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value?.split(',') : value);
  };
  const names = ['New', 'Follow Up', 'Under Review'];
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title=""
      okText="Apply"
      onClose={onClose}
      isOk={true}
      isCancel={false}
      footer={false}
    >
      <Box>
        <Typography mt={2} variant="h3">
          Adil khan
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography>April 2023</Typography>
          <Button variant="contained">View in Deals</Button>
        </Box>
        <Box
          mt={2}
          mb={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <LinearProgress
            sx={{
              color: theme?.Palette?.primary?.main,
              height: '5px',
              width: '90%',
            }}
            variant="determinate"
            value={50}
          />
          <Typography>50%</Typography>
        </Box>
        <Divider />
        <Box
          mt={2}
          sx={{
            padding: '10px',
            borderRadius: '6px',
            boxShadow: `0px 0px 16px 0px ${theme?.palette?.custom?.light_gray_shadow}`,
          }}
        >
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2">Closed</Typography>
            <Typography variant="body2">£0.00</Typography>
          </Box>
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2">Goal</Typography>
            <Typography variant="body2">-</Typography>
          </Box>
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2">Forecasted</Typography>
            <Typography variant="body2">£0.00</Typography>
          </Box>
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2">Gap to Goal</Typography>
            <Typography variant="body2">-</Typography>
          </Box>
          <Divider />
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2" fontWeight={'600'}>
              Total Deal Amount
            </Typography>
            <Typography variant="body2" fontWeight={'600'}>
              £0.00
            </Typography>
          </Box>
        </Box>
        <Typography mt={2} variant="h6" fontWeight={'600'}>
          Deal Stage
        </Typography>

        <FormControl sx={{ mt: 1, width: '100%' }}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected: any) => selected?.join(', ')}
            placeholder="all"
          >
            {names?.map((name: any) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName?.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </CommonDrawer>
  );
};

export default ViewDealsDrawer;
