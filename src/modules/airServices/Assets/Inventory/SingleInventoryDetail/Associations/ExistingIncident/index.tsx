import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { checkboxes, chipColor } from './ExistingIncident.data';
import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';

export default function ExistingIncident({ openDrawer, onClose }: any) {
  const [searchBy, setSearchBy] = useState<any>();

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();

  // Function to handle checkbox change
  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  const handleSubmit: any = (event: any) => {
    event.preventDefault();
    // Filter out checkboxes with values set to false
    Object.keys(checkboxValues).filter((id) => checkboxValues[id]);
    // const selectedCheckboxes = Object.keys(checkboxValues).filter(
    //   (id) => checkboxValues[id],
    // );

    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);

    // console.log('Selected checkboxes on submit:', selectedCheckboxes);
  };

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={'Associate Existing Incident'}
      okText={'Associate'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit}
    >
      <Box mt={1}>
        <Search
          label={'Search'}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          fullWidth
        />
      </Box>

      {checkboxes?.map((item) => (
        <Box
          border={`1px solid ${theme.palette.grey[400]}`}
          borderRadius={2}
          p={1}
          mt={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          key={uuidv4()}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxValues[item?.id] || false}
                  onChange={handleCheckboxChange}
                  id={item?.id}
                />
              }
              label={item?.label}
            />
          </FormGroup>
          <Chip
            label={item?.status}
            sx={{
              bgcolor: theme['palette'][`${chipColor(item?.status)}`]['main'],
              color: theme.palette.common.white,
            }}
          />
        </Box>
      ))}
    </CommonDrawer>
  );
}
