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
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import {
  useGetProductFeaturesQuery,
  useGetProductPlanListProductIdQuery,
} from '@/services/orgAdmin/subscription-and-invoices';
import { v4 as uuidv4 } from 'uuid';
const ChoosePlan = () => {
  const router = useRouter();
  const { data } = useGetProductPlanListProductIdQuery({
    id: router?.query?.data,
  });
  const { data: featuresData } = useGetProductFeaturesQuery({
    id: router?.query?.data,
  });

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() =>
            router.push(`${orgAdminSubcriptionInvoices?.manage_plan}`)
          }
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h4">Choose a plan</Typography>
      </Box>

      <TableContainer sx={styles?.tableContainer}>
        <Table sx={styles?.table}>
          <TableBody>
            <TableRow sx={styles?.tableHead}>
              <TableCell
                rowSpan={3}
                sx={{ width: '228px', pl: '32px', pr: '32px' }}
              >
                <Typography variant="h3" sx={styles?.productBoxTitle}>
                  Sales
                </Typography>
                <Typography variant="body1" sx={styles?.productBoxText}>
                  Everything your sales team need to work better and together.
                </Typography>
              </TableCell>
              {data?.data?.map((choosePlan: any) => {
                return (
                  <TableCell key={uuidv4()} component="th">
                    {choosePlan?.planType?.name}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              {data?.data?.map((choosePlan: any) => {
                return (
                  <TableCell sx={styles?.planBox} key={uuidv4()}>
                    <Typography variant="h3">
                      £{choosePlan?.planPrice}
                      <Box component={'span'}>/Month</Box>
                    </Typography>
                    <Button variant="contained" color="primary">
                      Buy Plan
                    </Button>
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow sx={styles?.planDetailText}>
              {data?.data?.map((choosePlan: any) => {
                return (
                  <TableCell key={uuidv4()}>
                    <Typography variant="body2">
                      {choosePlan?.description}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell sx={styles?.sideHeader}>Users</TableCell>
              {data?.data?.map((choosePlan: any) => {
                return (
                  <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                    <Typography variant="h6">
                      Includes {choosePlan?.defaultUsers} paid users
                    </Typography>
                    <Typography variant="body2">
                      £ {choosePlan?.additionalPerUserPrice}/ Month per
                      additional user
                    </Typography>
                    <Typography variant="body2">
                      Allow {choosePlan?.defaultStorage} GB storage
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell sx={styles?.sideHeader}>
                Max Additional Users
              </TableCell>
              {data?.data?.map(() => {
                return (
                  <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                    <Counter inputValue={0} />
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell sx={styles?.sideHeader}>
                Max Additional Srorage
              </TableCell>
              {data?.data?.map(() => {
                return (
                  <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                    <Counter inputValue={0} fixedText="GB" inputWidth="74px" />
                  </TableCell>
                );
              })}
            </TableRow>
            {featuresData?.data?.productfeatures?.map((feature: any) => {
              return (
                <TableRow key={uuidv4()}>
                  <TableCell sx={styles?.salesActivities}>
                    <Typography variant="h6">{feature?.name}</Typography>
                  </TableCell>
                  {data?.data?.map((planFeature: any) => {
                    return planFeature?.planProductFeatures?.map(
                      (planFeatureId: any) => {
                        return planFeatureId?.featureId === feature?._id ? (
                          <TableCell align="center">
                            <TickCircleIcon />
                          </TableCell>
                        ) : (
                          <TableCell align="center"> </TableCell>
                        );
                      },
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChoosePlan;
