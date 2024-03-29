import React, { useEffect, useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
import { ArrowBackIcon, TickCircleIcon } from '@/assets/icons';
import Counter from './Counter';
import { styles } from './ChoosePlan.style';
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import {
  useGetCRMPlanListQuery,
  useGetProductFeaturesQuery,
  useGetProductPlanListProductIdQuery,
} from '@/services/orgAdmin/subscription-and-invoices';
import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { useAppSelector } from '@/redux/store';
const ChoosePlan = () => {
  const router = useRouter();

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );
  const isCRM = parsedManageData?.isCRM;

  const { data, isLoading } = useGetProductPlanListProductIdQuery({
    id: parsedManageData?.productId,
  });
  const { data: crmPlanData, isLoading: isCRMplanLoading } =
    useGetCRMPlanListQuery({
      name: parsedManageData?.planName || parsedManageData?.name,
    });
  const { data: featuresData } = useGetProductFeaturesQuery({
    id: parsedManageData?.productId,
  });

  const [getData, setGetData] = useState<any>([]);

  useEffect(() => {
    if (isCRM) {
      if (crmPlanData?.data) {
        setGetData(crmPlanData?.data);
      }
    } else {
      if (data?.data) {
        setGetData(Object?.values(data?.data));
      }
    }
  }, [data, crmPlanData]);

  useEffect(() => {
    if (Object.keys(parsedManageData)?.length === 0) {
      router.push(`${orgAdminSubcriptionInvoices?.back_subscription_invoices}`);
    }
  }, [parsedManageData]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => history.back()}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h4">Choose a plan</Typography>
      </Box>

      {isLoading || isCRMplanLoading ? (
        <>
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </>
      ) : (
        <TableContainer sx={styles?.tableContainer}>
          <Table sx={styles?.table}>
            <TableBody>
              <TableRow sx={styles?.tableHead}>
                <TableCell
                  rowSpan={3}
                  sx={{ width: '228px', pl: '32px', pr: '32px' }}
                >
                  <Typography variant="h3" sx={styles?.productBoxTitle}>
                    {parsedManageData?.planName ||
                      parsedManageData?.name ||
                      parsedManageData?.productName}
                  </Typography>
                  <Typography variant="body1" sx={styles?.productBoxText}>
                    Everything your sales team need to work better and together.
                  </Typography>
                </TableCell>
                {/* default free  */}
                <TableCell component="th">Free Plan</TableCell>
                {getData?.length
                  ? getData?.map((choosePlan: any) => {
                      return (
                        <TableCell key={uuidv4()} component="th">
                          {choosePlan?.planType?.name}
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow>
                {/* default  free */}
                <TableCell width={300} sx={styles?.planBox} key={uuidv4()}>
                  <Box>
                    <Typography variant="h3">
                      <Box>Free Trial</Box>
                      <Box component={'span'}>1 Month</Box>
                    </Typography>
                  </Box>
                </TableCell>

                {getData?.length
                  ? getData?.map((choosePlan: any) => {
                      return (
                        <TableCell sx={styles?.planBox} key={uuidv4()}>
                          <Typography variant="h3">
                            £{choosePlan?.planPrice}
                            <Box component={'span'}>/Month</Box>
                          </Typography>
                          <PermissionsGuard
                            permissions={[
                              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_BUY_PLAN,
                            ]}
                          >
                            <Button variant="contained" color="primary">
                              Buy Plan
                            </Button>
                          </PermissionsGuard>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow sx={styles?.planDetailText}>
                <TableCell key={uuidv4()}>
                  <Typography variant="body2">
                    Essential tools to put your customers first and deliver
                    authethic services
                  </Typography>
                </TableCell>

                {getData?.length
                  ? getData?.map((choosePlan: any) => {
                      return (
                        <TableCell key={uuidv4()}>
                          <Typography variant="body2">
                            {choosePlan?.description}
                          </Typography>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow>
                <TableCell sx={styles?.sideHeader}>Users</TableCell>
                {/* default  free */}
                <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                  <Typography variant="h6">Includes 1 users</Typography>
                </TableCell>

                {getData?.length
                  ? getData?.map((choosePlan: any) => {
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
                    })
                  : null}
              </TableRow>

              <TableRow>
                <TableCell sx={styles?.sideHeader}>
                  Max Additional Users
                </TableCell>
                {/* default  free */}
                <TableCell sx={styles?.sideHeader}>-</TableCell>
                {getData?.length
                  ? getData?.map((item: any) => {
                      return (
                        <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                          <PermissionsGuard
                            permissions={[
                              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_USER,
                            ]}
                          >
                            {item?.defaultUsers === 0 ? (
                              <Counter inputValue={0} disabled />
                            ) : (
                              <Counter
                                inputValue={0}
                                defaultUsers={item?.defaultUsers}
                              />
                            )}
                          </PermissionsGuard>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>

              <TableRow>
                <TableCell sx={styles?.sideHeader}>
                  Max Additional Storage
                </TableCell>
                {/* default  free */}
                <TableCell sx={styles?.sideHeader}>-</TableCell>
                {getData?.length
                  ? getData?.map((item: any) => {
                      return (
                        <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                          <PermissionsGuard
                            permissions={[
                              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_STORAGE,
                            ]}
                          >
                            {item?.defaultStorage === 0 ? (
                              <Counter inputValue={0} disabled />
                            ) : (
                              <Counter
                                inputValue={0}
                                fixedText="GB"
                                inputWidth="74px"
                              />
                            )}
                          </PermissionsGuard>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              {featuresData?.data?.productfeatures?.map((feature: any) => {
                return (
                  <TableRow key={uuidv4()}>
                    <TableCell sx={styles?.salesActivities}>
                      <Typography variant="h6">{feature?.name}</Typography>
                    </TableCell>
                    {getData?.map((planFeature: any) => {
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

              {/* <TableRow >
        <TableCell sx={styles?.salesActivities}>
          <Typography variant="h6">rfrr</Typography>
        </TableCell>
        <TableCell align="center">
          <TickCircleIcon />
        </TableCell>

      </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ChoosePlan;
