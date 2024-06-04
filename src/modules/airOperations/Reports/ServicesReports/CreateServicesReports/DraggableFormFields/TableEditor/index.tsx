import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Checkbox, InputAdornment, Typography } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  DeleteBlackIcon,
} from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CheckBox } from '@mui/icons-material';
import { tabelEditorData } from './TabelEditor.data';
export const TableEditor = ({
  tableTitle,
  setValue,
  AddProperties,
  setCloumnsData,
}: any) => {
  const [Edit, setEdit] = useState(true);
  const [editValue, setEditvalue] = useState(tableTitle);
  const router: any = useRouter();
  return (
    <>
      {AddProperties ? (
        <Box>
          <PageTitledHeader
            title={'Add Properties'}
            canMovedBack
            moveBack={() => {
              router?.push({
                pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
              });
            }}
          />
          {tabelEditorData?.map((item: any) => (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              boxShadow={2}
              borderRadius={2}
              m={1}
              p={1}
              key={item?.title}
            >
              <Typography variant="body2">{item?.title}</Typography>

              <Checkbox
                onClick={() => {
                  setCloumnsData((prev: any) =>
                    !prev?.includes(item?.title)
                      ? [...prev, item?.title]
                      : prev?.filter((i: any) => i !== item?.title),
                  );
                }}
                icon={<CheckboxIcon />}
                checkedIcon={<CheckboxCheckedIcon />}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
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
                      <CheckBox
                        onClick={() => {
                          setEdit(true), setEditvalue(tableTitle);
                        }}
                      />
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
        </Box>
      )}
    </>
  );
};
