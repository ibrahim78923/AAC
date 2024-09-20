import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Checkbox,
  Container,
  InputAdornment,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  EditInputIcon,
} from '@/assets/icons';
import { CheckBox } from '@mui/icons-material';
import { tableEditorData } from './TableEditor.data';
import { useTableEditor } from './useTableEditor';
import { TableEditorI, tableFieldsI } from './TableEditor.interface';
export const TableEditor = (props: TableEditorI) => {
  const { setValue, handleCancel, metricType } = props;
  const {
    editValue,
    setEditValue,
    setEdit,
    edit,
    handleSave,
    setColumnObject,
    tableTitle,
    columnsData,
    setColumnField,
    disableTemplate,
  } = useTableEditor(props);
  return (
    <Box minHeight="79vh" display="flex" flexDirection="column">
      <PageTitledHeader
        title={'Table Configuration'}
        canMovedBack
        moveBack={handleCancel}
      />
      <Box flex="1" overflow="scroll">
        <Container>
          <RHFTextField
            name={'tableTitle'}
            size="small"
            label="Title"
            disabled={edit || disableTemplate}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                  {edit ? (
                    <Box
                      onClick={() => {
                        setEdit(false), setValue === editValue;
                      }}
                    >
                      <EditInputIcon />
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
          <Box display={'flex'} alignItems={'center'} gap={1} mt={1}>
            <Typography variant="h4">Edit Properties</Typography>
          </Box>
          <Box height={'50vh'} overflow={'scroll'}>
            {tableEditorData[metricType]?.map((item: tableFieldsI) => (
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                boxShadow={2}
                borderRadius={2}
                m={1}
                p={1}
                key={item?.fieldName}
              >
                <Typography variant="body2">{item?.fieldName}</Typography>
                <Checkbox
                  onClick={() => {
                    setColumnField((prev: any) =>
                      !prev?.includes(item?.fieldName)
                        ? [...prev, item?.fieldName]
                        : prev?.filter((i: any) => i !== item?.fieldName),
                    );
                    setColumnObject((prev: any) =>
                      !prev?.includes(item)
                        ? [...prev, item]
                        : prev?.filter((i: any) => i !== item),
                    );
                  }}
                  disabled={disableTemplate}
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  checked={columnsData?.includes?.(item?.fieldName)}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <Box position="static">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            className="small"
            onClick={handleCancel}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="small"
            onClick={handleSave}
            disabled={!columnsData?.length || !tableTitle}
          >
            Save
          </Button>
        </Toolbar>
      </Box>
    </Box>
  );
};
