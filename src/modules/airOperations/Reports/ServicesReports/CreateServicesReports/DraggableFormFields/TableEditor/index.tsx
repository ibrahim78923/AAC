import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import { Box, InputAdornment } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DeleteBlackIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CheckBox } from '@mui/icons-material';
export const TableEditor = ({ tableTitle, setValue }: any) => {
  const [Edit, setEdit] = useState(true);
  const [editValue, setEditvalue] = useState();
  const router: any = useRouter();
  return (
    <>
      <PageTitledHeader
        title={'Chart Configuration'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
          });
        }}
      />
      <RHFTextField
        name={'tableTitle'}
        size="small"
        label="Title"
        disabled={Edit}
        InputProps={{
          onClick: () => {},
          endAdornment: (
            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
              {Edit ? (
                <Box
                  onClick={() => {
                    setEdit(false), (setValue = editValue);
                  }}
                >
                  <BorderColorIcon />
                </Box>
              ) : (
                <Box display={'flex'} alignItems={'center'}>
                  <Box
                    onClick={() => {
                      setEdit(true), setEditvalue(tableTitle);
                    }}
                  >
                    <CheckBox />
                  </Box>
                  <Box
                    onClick={() => {
                      setEdit(true), setValue('tableTitle', editValue);
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
    </>
  );
};
