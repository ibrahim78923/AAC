import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
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
  Button,
  Box,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { ImportContactsData } from './ImportContacts.data';

import { ImportIcon } from '@/assets/icons';
import { AvailableImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { AIR_SOCIAL } from '@/routesConstants/paths';

const ImportColumns = () => {
  const route = useRouter();
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit } = methods;
  const onSubmit = () => {};

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb="20px">
        <Typography variant="h3">Import Contacts</Typography>
        <Button
          startIcon={<ImportIcon />}
          variant="outlined"
          onClick={() => {
            route?.push(AIR_SOCIAL?.IMPORTHISTORY);
          }}
        >
          Import History
        </Button>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ color: theme?.palette?.blue['main'] }}>
                <TableCell sx={{ width: '33.33%' }}>File Columns</TableCell>
                <TableCell sx={{ width: '33.33%' }}>CRM Fields</TableCell>
                <TableCell sx={{ width: '33.33%' }}>Mapped</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ImportContactsData?.map((data, i) => (
                <TableRow key={uuidv4()}>
                  <TableCell sx={{ width: '33.33%' }}>
                    {data?.fileColumn}
                    <Typography sx={{ fontSize: '10px' }}>
                      {data?.subTitle}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: '33.33%' }}>
                    <data.component size="small" {...data?.componentProps}>
                      {data?.componentProps?.select
                        ? data?.options?.map((option) => (
                            <MenuItem key={uuidv4()} value={option?.value}>
                              {option?.label}
                            </MenuItem>
                          ))
                        : null}
                    </data.component>
                  </TableCell>

                  <TableCell sx={{ width: '33.33%', display: 'flex' }}>
                    <Image src={AvailableImage} alt={'icon' + i} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box textAlign="end">
            <Button
              variant="outlined"
              onClick={() => route?.push(AIR_SOCIAL?.CONTACTS_IMPORT)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ ml: '10px' }}
              onClick={() => route?.push(AIR_SOCIAL?.IMPORTHISTORY)}
            >
              Import
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default ImportColumns;
