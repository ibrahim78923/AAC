import React from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import Search from '@/components/Search';

function createData(name: string, teamMember: number, action: any) {
  return { name, teamMember, action };
}

const TeamsTable = () => {
  const rows = [
    createData(
      'Test',
      4,
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ViewEyeIcon />
        <EditPenIcon />
        <DeleteCrossIcon />
      </Box>,
    ),
    createData(
      'Test 1',
      4,
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ViewEyeIcon />
        <EditPenIcon />
        <DeleteCrossIcon />
      </Box>,
    ),
    createData(
      'Orcalo',
      4,
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ViewEyeIcon />
        <EditPenIcon />
        <DeleteCrossIcon />
      </Box>,
    ),
  ];
  return (
    <Box>
      <Search
        searchBy=""
        width="100%"
        label={'Search here'}
        setSearchBy={() => {}}
      />
      <TableContainer>
        <Table sx={{ marginTop: '1rem' }} aria-label="simple table">
          <TableHead sx={{ background: '#EAECF0' }}>
            <TableRow>
              <TableCell sx={{ color: '#1F305D' }}>Name</TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Team Member
              </TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ color: '#6B7280' }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.teamMember}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.action}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamsTable;
