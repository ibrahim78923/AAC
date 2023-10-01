import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconArrowBack } from '@/assets/icons';
import { tableContainer, tableHeadStyle } from './styles';

const ChoosePlan = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const router = useRouter();

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router.push('/subscription-invoices/manage-plan')}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <IconArrowBack />
        </Box>
        <Typography variant="h4">Choose a plan</Typography>
      </Box>

      <TableContainer sx={tableContainer}>
        <Table>
          <TableHead sx={tableHeadStyle}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Free Plan</TableCell>
              <TableCell>Growth Plan</TableCell>
              <TableCell>Enterprise Plan</TableCell>
              <TableCell>Premium Plan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                row.name
              </TableCell>
              <TableCell align="right">row.calories</TableCell>
              <TableCell align="right">row.fat</TableCell>
              <TableCell align="right">row.carbs</TableCell>
              <TableCell align="right">row.protein</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChoosePlan;
