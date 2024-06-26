import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Toolbar,
  Typography,
} from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CheckBox } from '@mui/icons-material';
import { tableEditorData } from './TableEditor.data';
import { useTableEditor } from './useTableEditor';
export const TableEditor = (props: any) => {
  const {
    tableTitle,
    setValue,
    setColumnsData,
    setAddProperties,
    columnsData,
    handleCancel,
  } = props;
  const { editValue, setEditValue, setEdit, edit, handleSave } =
    useTableEditor(props);
  return (
    <>
      <PageTitledHeader
        title={'Table Configuration'}
        canMovedBack
        moveBack={handleCancel}
      />
      <RHFTextField
        name={'tableTitle'}
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
                <Box
                  onClick={() => {
                    setEdit(true), setEditValue(tableTitle);
                  }}
                >
                  <CheckBox />
                </Box>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={1}
        mt={1}
        sx={{ cursor: 'pointer' }}
        onClick={() => setAddProperties(true)}
      >
        <Typography variant="h4">Edit Properties</Typography>
      </Box>
      <Box height={'50vh'} overflow={'scroll'}>
        {tableEditorData?.map((item: any) => (
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
                setColumnsData((prev: any) =>
                  !prev?.includes(item?.title)
                    ? [...prev, item?.title]
                    : prev?.filter((i: any) => i !== item?.title),
                );
              }}
              icon={<CheckboxIcon />}
              checkedIcon={<CheckboxCheckedIcon />}
              checked={columnsData?.includes?.(item?.title)}
            />
          </Box>
        ))}
      </Box>
      <Toolbar
        sx={{ mt: 5.5, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!columnsData?.length}
        >
          Save
        </Button>
      </Toolbar>
    </>
  );
};
