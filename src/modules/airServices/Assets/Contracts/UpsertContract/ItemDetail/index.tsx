import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { columns, tableData } from './ItemDetail.data';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
export const ItemDetail: any = (props: any) => {
  const { name } = props;
  const met = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: met?.control,
    name,
  });
  // console.log({ met });
  const theme = useTheme();
  return (
    <Box boxShadow={1} border={`1px solid ${theme?.palette?.grey?.[700]}`}>
      <TableContainer>
        <Table sx={{ minWidth: '1200px' }}>
          <TableHead>
            <TableRow>
              {columns?.map((x: any) => (
                <TableCell key={uuidv4()}>{x}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item: any, index: any) => {
              return (
                <TableRow key={item.id}>
                  {tableData?.(name, index, remove).map((x: any) => (
                    <TableCell key={x?.id}>
                      {x?.data}
                      {/* <RHFTextField name={`${name}.${index}.firstName`} /> */}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <br /> */}
      <Button
        type="button"
        color="secondary"
        onClick={() => {
          append({
            serviceName: '',
            priceModel: '',
            cost: '',
            count: '',
            comments: '',
          });
        }}
        startIcon={<AddCircleIcon />}
        sx={{ padding: 2 }}
      >
        Add Additional Items
      </Button>
    </Box>
  );
};
