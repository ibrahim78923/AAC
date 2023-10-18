import Image from 'next/image';

import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  MenuItem,
} from '@mui/material';

import { ImportDealsData } from '../ImportDealsDrawer.data';

import { FormProvider } from '@/components/ReactHookForm';

import { AvailableImage } from '@/assets/images';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const ImportColumns = () => {
  const methods = useForm({
    defaultValues: {},
  });
  const { handleSubmit } = methods;
  const onSubmit = () => {};
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File Columns</TableCell>
            <TableCell sx={{ width: '200px' }}>CRM Fields</TableCell>
            <TableCell>Mapped</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ImportDealsData.map((data, i) => (
            <TableRow key={uuidv4()}>
              <TableCell align="left">{data.fileColumn}</TableCell>
              <TableCell align="left" sx={{ width: '200px' }}>
                <data.component size="small" fullWidth {...data.componentProps}>
                  {data.componentProps.select
                    ? data.options.map((option) => (
                        <MenuItem key={uuidv4()} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : null}
                </data.component>
              </TableCell>
              <TableCell align="center">
                <Image
                  src={AvailableImage}
                  alt={'icon' + i}
                  style={{
                    margin: '0px auto',
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormProvider>
  );
};

export default ImportColumns;
