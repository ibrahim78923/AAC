import { DeleteBlackIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { CheckBox } from '@mui/icons-material';
import { Box, Button, InputAdornment } from '@mui/material';
import { useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const InteractiveFilterEditor = (props: any) => {
  const { handleCancel, filterTitle, setValue } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();
  return (
    <>
      <PageTitledHeader title={'Chart'} canMovedBack moveBack={handleCancel} />
      <RHFTextField
        name={'filterTitle'}
        size="small"
        label="Title"
        disabled={edit}
        InputProps={{
          onClick: () => {},
          endAdornment: (
            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
              {edit ? (
                <Box
                  onClick={() => {
                    setEdit(false), setValue === editValue;
                  }}
                >
                  <BorderColorIcon />
                </Box>
              ) : (
                <Box display={'flex'} alignItems={'center'}>
                  <Box
                    onClick={() => {
                      setEdit(true), setEditValue(filterTitle);
                    }}
                  >
                    <CheckBox />
                  </Box>
                  <Box
                    onClick={() => {
                      setEdit(true), setValue('filterTitle', editValue);
                    }}
                  >
                    <DeleteBlackIcon />
                  </Box>
                </Box>
              )}
            </InputAdornment>
          ),
        }}
      />
      <RHFAutocomplete
        name="filterType"
        label="Choose Type"
        size="small"
        options={['year', 'month', 'custom']}
        required
      />
      <Box
        sx={{
          mt: 52,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={() => ''}>
          Save
        </Button>
      </Box>
    </>
  );
};
