import React from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { AssignCommonIcon } from '@/assets/icons';

const ReassignModal = ({ isReassign, setIsReassign }: any) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <AlertModals
      typeImage={<AssignCommonIcon />}
      message={
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Deals Owner</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Deals Owner"
              onChange={handleChange}
            >
              <MenuItem value={10}>Savannah Shane</MenuItem>
              <MenuItem value={20}>Phoenix Baker</MenuItem>
              <MenuItem value={30}>Cameron Waliamson</MenuItem>
              <MenuItem value={40}>Brooklyn Simmons</MenuItem>
            </Select>
          </FormControl>
        </Box>
      }
      type="Assign"
      open={isReassign}
      cancelBtnText="Cancel"
      submitBtnText="Update"
      handleClose={() => setIsReassign(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default ReassignModal;
