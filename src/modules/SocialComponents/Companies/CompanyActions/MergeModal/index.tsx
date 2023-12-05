import React from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { MergeCompaniesIcon } from '@/assets/icons';
import { CompanyLogoImage } from '@/assets/images';
import Image from 'next/image';

const MergeModal = ({ isMerge, setIsMerge }: any) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <AlertModals
      typeImage={<MergeCompaniesIcon />}
      message={
        <Box>
          <Grid container>
            <Grid item lg={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Image
                  src={CompanyLogoImage}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, color: '#111827' }}
                  >
                    Share my dine
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 400, color: '#667085' }}
                  >
                    smd.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Company
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Deals Owner"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>OneCare Media (ocm.com)</MenuItem>
                  <MenuItem value={20}>Udemy (udemy.com)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      }
      type="Merge Companies"
      open={isMerge}
      cancelBtnText="Cancel"
      submitBtnText="Update"
      handleClose={() => setIsMerge(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default MergeModal;
