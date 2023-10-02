import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { IconArrowBack } from '@/assets/icons';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material';
import {
  tableContainer,
  tableStyle,
  tableHeadStyle,
  productBoxTitleStyle,
  productBoxTextStyle,
  planBoxStyle,
  freeTrialBoxStyle,
  planDetailTextStyle,
  sideHeaderStyle,
  userIncludesStyle,
} from './styles';

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
        <Table sx={tableStyle}>
          <TableBody>
            <TableRow sx={tableHeadStyle}>
              <TableCell
                rowSpan={3}
                sx={{ width: '228px', pl: '32px', pr: '32px' }}
              >
                <Typography variant="h3" sx={productBoxTitleStyle}>
                  Sales
                </Typography>
                <Typography variant="body1" sx={productBoxTextStyle}>
                  Everything your sales team need to work better and together.
                </Typography>
              </TableCell>
              <TableCell component="th">Free Plan</TableCell>
              <TableCell component="th">Growth Plan</TableCell>
              <TableCell component="th">Enterprise Plan</TableCell>
              <TableCell component="th">Premium Plan</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={freeTrialBoxStyle}>
                <Typography variant="h4">Free Trial</Typography>
                <Typography variant="body1">1 Month</Typography>
              </TableCell>
              <TableCell sx={planBoxStyle}>
                <Typography variant="h3">
                  £20<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
              <TableCell sx={planBoxStyle}>
                <Typography variant="h3">
                  £300<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
              <TableCell sx={planBoxStyle}>
                <Typography variant="h3">
                  £450<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
            </TableRow>

            <TableRow sx={planDetailTextStyle}>
              <TableCell>
                <Typography variant="body2">
                  Essential tools to put your customers first and deliver
                  authethic services
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  Essential tools to put your customers first and deliver
                  authethic services
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  Essential tools to put your customers first and deliver
                  authethic services
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  Essential tools to put your customers first and deliver
                  authethic services
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={sideHeaderStyle}>Users</TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Includes 1 users</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Includes 2 paid users</Typography>
                <Typography variant="body2">
                  £ 10/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 3 GB storage</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Include 5 paid users</Typography>
                <Typography variant="body2">
                  £100/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 5 GB storage</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Include 10 paid users</Typography>
                <Typography variant="body2">
                  £120/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 7 GB storage</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={sideHeaderStyle}>Max Additional Users</TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">-</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Includes 2 paid users</Typography>
                <Typography variant="body2">
                  £ 10/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 3 GB storage</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Include 5 paid users</Typography>
                <Typography variant="body2">
                  £100/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 5 GB storage</Typography>
              </TableCell>
              <TableCell sx={userIncludesStyle}>
                <Typography variant="h6">Include 10 paid users</Typography>
                <Typography variant="body2">
                  £120/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 7 GB storage</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChoosePlan;
