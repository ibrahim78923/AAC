import Image from 'next/image';

import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  MenuItem,
  useTheme,
  Typography,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { ImportTaskData } from '../ImportTaskDrawer.data';

import { AvailableImage } from '@/assets/images';

import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const ImportColumns = () => {
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit } = methods;
  const onSubmit = () => {};
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <TableHead>
          <TableRow sx={{ color: theme?.palette?.blue['main'] }}>
            <TableCell>File Columns</TableCell>
            <TableCell sx={{ width: '200px' }}>CRM Fields</TableCell>
            <TableCell>Mapped</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ImportTaskData?.map((data: any, i: any) => (
            <TableRow key={uuidv4()}>
              <TableCell align="left" sx={{ color: '#111827' }}>
                {data?.fileColumn}
                <Typography sx={{ fontSize: '10px' }}>
                  {data?.subTitle}
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ width: '250px' }}>
                <data.component
                  size="small"
                  fullWidth
                  sx={{ width: '100px' }}
                  {...data?.componentProps}
                >
                  {data?.componentProps?.select
                    ? data?.options?.map((option) => (
                        <MenuItem key={uuidv4()} value={option?.value}>
                          {option?.label}
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
