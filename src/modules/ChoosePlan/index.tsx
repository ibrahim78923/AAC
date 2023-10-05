import React from 'react';
import { useRouter } from 'next/router';
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
import { ArrowBackIcon, TickCircleIcon } from '@/assets/icons';
import Counter from './Counter';
import { styles } from './ChoosePlan.style';

const ChoosePlan = () => {
  const router = useRouter();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router.push('/subscription-invoices/manage-plan')}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h4">Choose a plan</Typography>
      </Box>

      <TableContainer sx={styles.tableContainer}>
        <Table sx={styles.table}>
          <TableBody>
            {/* Table Head Row */}
            <TableRow sx={styles.tableHead}>
              <TableCell
                rowSpan={3}
                sx={{ width: '228px', pl: '32px', pr: '32px' }}
              >
                <Typography variant="h3" sx={styles.productBoxTitle}>
                  Sales
                </Typography>
                <Typography variant="body1" sx={styles.productBoxText}>
                  Everything your sales team need to work better and together.
                </Typography>
              </TableCell>
              <TableCell component="th">Free Plan</TableCell>
              <TableCell component="th">Growth Plan</TableCell>
              <TableCell component="th">Enterprise Plan</TableCell>
              <TableCell component="th">Premium Plan</TableCell>
            </TableRow>

            {/* Plan Price Row */}
            <TableRow>
              <TableCell sx={styles.freeTrialBox}>
                <Typography variant="h4">Free Trial</Typography>
                <Typography variant="body1">1 Month</Typography>
              </TableCell>
              <TableCell sx={styles.planBox}>
                <Typography variant="h3">
                  £20<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
              <TableCell sx={styles.planBox}>
                <Typography variant="h3">
                  £300<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
              <TableCell sx={styles.planBox}>
                <Typography variant="h3">
                  £450<Box component={'span'}>/Month</Box>
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Plan
                </Button>
              </TableCell>
            </TableRow>

            <TableRow sx={styles.planDetailText}>
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

            {/* Users Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>Users</TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">Includes 1 users</Typography>
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">Includes 2 paid users</Typography>
                <Typography variant="body2">
                  £ 10/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 3 GB storage</Typography>
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">Include 5 paid users</Typography>
                <Typography variant="body2">
                  £100/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 5 GB storage</Typography>
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">Include 10 paid users</Typography>
                <Typography variant="body2">
                  £120/ Month per additional user
                </Typography>
                <Typography variant="body2">Allow 7 GB storage</Typography>
              </TableCell>
            </TableRow>

            {/* Max Additional Users Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>Max Additional Users</TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">-</Typography>
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} />
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} />
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} />
              </TableCell>
            </TableRow>

            {/* Max Additional Storage Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>
                Max Additional Srorage
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Typography variant="h6">-</Typography>
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} fixedText="GB" inputWidth="74px" />
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} fixedText="GB" inputWidth="74px" />
              </TableCell>
              <TableCell sx={styles.userIncludes}>
                <Counter inputValue={0} fixedText="GB" inputWidth="74px" />
              </TableCell>
            </TableRow>

            {/* Sales Activities Row */}
            <TableRow>
              <TableCell sx={styles.salesActivities}>
                <Typography variant="h6">Sales Activities</Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Tasks, Appointments and Notes Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>
                Tasks, Appointments and Notes
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
            </TableRow>

            {/* Custom Sales Activites Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>
                Custom Sales Activites
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
              <TableCell align="center">
                <TickCircleIcon />
              </TableCell>
            </TableRow>

            {/* CRM Customization Row */}
            <TableRow>
              <TableCell sx={styles.salesActivities}>
                <Typography variant="h6">CRM Customization</Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Workflows Row */}
            <TableRow>
              <TableCell sx={styles.sideHeader}>Workflows</TableCell>
              <TableCell sx={styles.workflowCell}>20</TableCell>
              <TableCell sx={styles.workflowCell}>20</TableCell>
              <TableCell sx={styles.workflowCell}>50</TableCell>
              <TableCell sx={styles.workflowCell}>100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChoosePlan;
