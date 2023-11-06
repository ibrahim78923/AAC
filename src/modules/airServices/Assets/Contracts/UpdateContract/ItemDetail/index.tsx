import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  itemDetailColumns,
  itemDetailFormFieldsFunction,
} from './ItemDetail.data';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const ItemDetail: any = (props: any) => {
  //TODO: as far as know no need to make hook file as it is small logics at the moment

  const { name } = props;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  //TODO: use item.id as a key because RHF fieldArray is using and it recommends that.

  return (
    <>
      <Box boxShadow={1}>
        <TableContainer>
          <Table sx={{ minWidth: '1200px' }}>
            <TableHead>
              <TableRow>
                {itemDetailColumns?.map((column: any) => (
                  <TableCell key={uuidv4()}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((item: any, index: any) => {
                return (
                  <TableRow key={item?.id}>
                    {itemDetailFormFieldsFunction?.(name, index, remove)?.map(
                      (singleField: any) => (
                        <TableCell key={uuidv4()}>
                          {singleField?.data}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="button"
          color="secondary"
          onClick={() => {
            append({
              serviceName: '',
              priceModel: '',
              cost: 0,
              count: 0,
              comments: '',
            });
          }}
          startIcon={<AddCircleIcon />}
          sx={{ marginY: 2, marginLeft: 2 }}
        >
          Add Additional Items
        </Button>
      </Box>
      <Typography variant="body1" color="error">
        {control?.getFieldState?.(name)?.error?.root?.message}
      </Typography>
    </>
  );
};
