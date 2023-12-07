import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MergeCompaniesIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';

const ExportModal = ({ setIsExport, isExport }: any) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <>
      <AlertModals
        typeImage={<MergeCompaniesIcon />}
        message={
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                File Formate
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Deals Owner"
                onChange={handleChange}
              >
                <MenuItem value={10}>CSV</MenuItem>
                <MenuItem value={20}>XLS</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        type="Assign"
        open={isExport}
        cancelBtnText="Cancel"
        submitBtnText="Update"
        handleClose={() => setIsExport(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default ExportModal;
