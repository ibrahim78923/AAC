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
  usePatchSubscriptionPlanMutation,
  usePostSubscriptionPlanMutation,
} from '@/services/orgAdmin/subscription-and-invoices';
import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { useAppSelector } from '@/redux/store';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';
const ChoosePlan = () => {
  const router = useRouter();

  const [isBuyPlan, setIsBuyPlan] = useState(false);
  const [activePlanToBuy, setActivePlanToBuy] = useState<any>();

  const [maxAdditionalUsers, setMaxAdditionalUsers] = useState();
  const [maxAdditionalStorage, setMaxAdditionalStorage] = useState();

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

  const freePlanIndex = getData?.findIndex(
    (plan: any) => plan?.planType?.name === 'Free',
  );
  if (freePlanIndex !== -1 && freePlanIndex !== 0) {
    const freePlan = getData?.splice(freePlanIndex, 1)[0];
    getData?.unshift(freePlan);
  }

  const [postSubscriptionPlan, { isLoading: PostSubscriptionLoading }] =
    usePostSubscriptionPlanMutation();
  const [patchSubscriptionPlan, { isLoading: PatchSubscriptionLoading }] =
    usePatchSubscriptionPlanMutation();

  const onSubmit = async () => {
    const payload = {
      planId: activePlanToBuy?._id,
      additionalUsers: maxAdditionalUsers,
      additionalStorage: maxAdditionalStorage,
      planDiscount: 0,
      billingDate: '2023-10-20',
      status: 'ACTIVE',
      billingCycle: 'MONTHLY',
    };

    if (parsedManageData?.orgPlanId) {
      try {
        await patchSubscriptionPlan({
          body: payload,
          organizationPlanId: parsedManageData?.orgPlanId,
        }).unwrap();
        enqueueSnackbar('Plan Update Successful', {
          variant: 'success',
        });
        setIsBuyPlan(false);
        router.push(
          `${orgAdminSubcriptionInvoices?.back_subscription_invoices}`,
        );
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        await postSubscriptionPlan({ body: payload }).unwrap();
        enqueueSnackbar('Request Successful', {
          variant: 'success',
        });
        setIsBuyPlan(false);
        router.push(
          `${orgAdminSubcriptionInvoices?.back_subscription_invoices}`,
        );
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };

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
      <AlertModals
        message={'Are you sure you want to buy this plan ?'}
        type={'Confirmation'}
        open={isBuyPlan}
        submitBtnText={parsedManageData?.orgPlanId ? 'Update Plan' : 'Buy Plan'}
        cancelBtnText="Cancel"
        handleClose={() => setIsBuyPlan(false)}
        handleSubmitBtn={onSubmit}
        loading={
          parsedManageData?.orgPlanId
            ? PatchSubscriptionLoading
            : PostSubscriptionLoading
        }
      />

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
                {/* <TableCell component="th">Free Plan</TableCell> */}
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
                {getData?.length
                  ? getData?.map((choosePlan: any) => {
                      return (
                        <TableCell sx={styles?.planBox} key={uuidv4()}>
                          <Typography variant="h3">
                            £{choosePlan?.planPrice}
                            <Box component={'span'}>/Month</Box>
                          </Typography>
                          {choosePlan?.planType?.name === 'Free' ? null : (
                            <>
                              {parsedManageData.planData?.planTypeId ===
                              choosePlan?.planType?._id ? (
                                <PermissionsGuard
                                  permissions={[
                                    ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_BUY_PLAN,
                                  ]}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      setActivePlanToBuy(choosePlan),
                                        setIsBuyPlan(true);
                                    }}
                                  >
                                    Subscribed
                                  </Button>
                                </PermissionsGuard>
                              ) : (
                                <PermissionsGuard
                                  permissions={[
                                    ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_BUY_PLAN,
                                  ]}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      setActivePlanToBuy(choosePlan),
                                        setIsBuyPlan(true);
                                    }}
                                  >
                                    Buy Plan
                                  </Button>
                                </PermissionsGuard>
                              )}
                            </>
                          )}
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow sx={styles?.planDetailText}>
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
                {/* <TableCell sx={styles?.sideHeader}>-</TableCell> */}
                {getData?.length
                  ? getData?.map((item: any, index: any) => {
                      return (
                        // eslint-disable-next-line
                        <TableCell key={index} sx={styles?.userIncludes}>
                          <PermissionsGuard
                            permissions={[
                              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_USER,
                            ]}
                          >
                            {item?.defaultUsers === 0 ? (
                              <Counter inputValue={0} disabled />
                            ) : (
                              <CounterMaxUser
                                defaultUsers={item?.defaultUsers}
                                setMaxAdditionalUsers={setMaxAdditionalUsers}
                                mainId={activePlanToBuy?._id}
                                mapId={item?._id}
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
                {/* <TableCell sx={styles?.sideHeader}>-</TableCell> */}
                {getData?.length
                  ? getData?.map((item: any, index: any) => {
                      return (
                        // eslint-disable-next-line
                        <TableCell key={index} sx={styles?.userIncludes}>
                          <PermissionsGuard
                            permissions={[
                              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_STORAGE,
                            ]}
                          >
                            {item?.defaultStorage === 0 ? (
                              <Counter inputValue={0} disabled />
                            ) : (
                              <CounterAdditionalStorage
                                defaultUsers={item?.defaultStorage}
                                setMaxAdditionalStorage={
                                  setMaxAdditionalStorage
                                }
                                mainId={activePlanToBuy?._id}
                                mapId={item?._id}
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
                      const isFeatureIncluded =
                        planFeature?.planProductFeatures?.some(
                          (row: any) => row?.featureId === feature?._id,
                        );
                      if (isFeatureIncluded) {
                        return (
                          <TableCell key={uuidv4()} align="center">
                            <TickCircleIcon />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={uuidv4()} align="center">
                            {' '}
                            -{' '}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const CounterMaxUser = ({
  defaultUsers,
  mapId,
  mainId,
  setMaxAdditionalUsers,
}: any) => {
  const [value, setValue] = useState<any>(defaultUsers);
  useEffect(() => {
    if (mapId === mainId) {
      setMaxAdditionalUsers(value);
    }
  }, [mainId, value]);
  return (
    <>
      <Counter value={value} setValue={setValue} inputValue={0} />
    </>
  );
};
const CounterAdditionalStorage = ({
  defaultUsers,
  mapId,
  mainId,
  setMaxAdditionalStorage,
}: any) => {
  const [value, setValue] = useState<any>(defaultUsers);
  useEffect(() => {
    if (mapId === mainId) {
      setMaxAdditionalStorage(value);
    }
  }, [mainId, value]);
  return (
    <>
      <Counter
        value={value}
        setValue={setValue}
        inputValue={0}
        fixedText="GB"
      />
    </>
  );
};

export default ChoosePlan;
