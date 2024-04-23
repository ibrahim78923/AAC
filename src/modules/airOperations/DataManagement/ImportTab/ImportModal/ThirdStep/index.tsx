import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { importTableFields, importTableHeader } from '../ImportModal.data';
const ThirdStep = (props: any) => {
  const { methodsImportModalForm, importLog, fields, remove } = props;

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Map Columns from your file to the right CRM fields.
      </Typography>
      <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <TableContainer>
          <Table sx={{ minWidth: '31rem' }}>
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
                      methodsImportModalForm?.control,
                      'importedFields',
                      index,
                      importLog,
                      remove,
                    )?.map((singleField: any) => (
                      <TableCell key={item?.id}>{singleField?.data}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default ThirdStep;
