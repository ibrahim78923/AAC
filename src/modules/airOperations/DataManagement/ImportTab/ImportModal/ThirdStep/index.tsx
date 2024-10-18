import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { importTableFields, importTableHeader } from '../ImportModal.data';
const ThirdStep = (props: any) => {
  const { control, importLog, fields, remove, filterMandatoryFields } = props;

  return (
    <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {importTableHeader?.map((column: any) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item: any, index: any) => {
              return (
                <TableRow key={item?.id}>
                  {importTableFields?.(
                    control,
                    'importedFields',
                    index,
                    importLog,
                    remove,
                    filterMandatoryFields,
                    fields,
                  )?.map((singleField: any) => (
                    <TableCell key={singleField?.id}>
                      {singleField?.data}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ThirdStep;
