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
  LinearProgress,
  useTheme,
} from '@mui/material';
import { ArrowBackIcon, TickCircleIcon } from '@/assets/icons';
import Counter from './Counter';
import { styles } from './ChoosePlan.style';
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import {
  useGetCRMPlanListQuery,
  useGetPaymentCardQuery,
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
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  PLAN_PAYMENT,
  PLAN_PAYMENT_TYPE_TAGS,
  PLAN_STATUS,
  SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES,
} from '@/constants';
import {
  ChoosePlanI,
  FeatureI,
  GroupedDataI,
  PlanDataI,
  ProductFeatureI,
} from './choosePlan.interface';
import { PAGINATION } from '@/config';
import { LoadingButton } from '@mui/lab';
import PayPlanInvoice from './PayPlanInvoice';

const ChoosePlan = () => {
  const router = useRouter();
  const theme = useTheme();

  const [isBuyPlan, setIsBuyPlan] = useState(false);
  const [activePlanToBuy, setActivePlanToBuy] = useState<ChoosePlanI>();

  const [maxAdditionalUsers, setMaxAdditionalUsers] = useState();
  const [maxAdditionalStorage, setMaxAdditionalStorage] = useState();

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );
  const isCRM = parsedManageData?.isCRM;
  const { data, isLoading } = useGetProductPlanListProductIdQuery(
    {
      id: parsedManageData?.productId,
    },
    { skip: parsedManageData?.productId ? false : true },
  );

  const { data: crmPlanData, isLoading: isCRMplanLoading } =
    useGetCRMPlanListQuery(
      {
        name: parsedManageData?.planName || parsedManageData?.name,
      },
      {
        skip:
          parsedManageData?.planName || parsedManageData?.name ? false : true,
      },
    );

  const { data: featuresData } = useGetProductFeaturesQuery(
    {
      id: isCRM
        ? parsedManageData?.plans?.planProducts ??
          parsedManageData?.planProducts
        : parsedManageData?.productId,
    },
    {
      skip:
        parsedManageData?.productId ||
        (parsedManageData?.plans?.planProducts ??
          parsedManageData?.planProducts)
          ? false
          : true,
    },
  );

  const [getData, setGetData] = useState<any>([]);
  const [invoiceId, setInvoiceId] = useState<any>();

  const freePlanIndex = getData?.findIndex(
    (plan: ChoosePlanI) => plan?.planType?.name === PLAN_PAYMENT?.FREE,
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
      billingDate: dayjs(Date.now())?.format(DATE_FORMAT?.API),
      status: PLAN_STATUS?.ACTIVE,
      billingCycle: PLAN_PAYMENT_TYPE_TAGS?.MONTHLY,
      planDiscount: 0,
      ...(isCRM && { isCRM: true }),
      ...(parsedManageData?.orgPlanId && {
        downgradePlan:
          parsedManageData?.planTypeSequenceOrder >
          activePlanToBuy?.planType?.sequenceOrder
            ? true
            : false,
      }),
    };

    if (parsedManageData?.orgPlanId) {
      try {
        const res = await patchSubscriptionPlan({
          body: payload,
          organizationPlanId: parsedManageData?.orgPlanId,
        })?.unwrap();
        setInvoiceId(res?.data?.invoiceId);
        setOpenPayInvoice(true);

        if (res?.data?.status === 'REQUEST_FOR_DOWNGRADE') {
          enqueueSnackbar(res?.message, {
            variant: 'success',
          });
          router.push(
            `${orgAdminSubcriptionInvoices?.back_subscription_invoices}`,
          );
        } else {
          enqueueSnackbar('Pay invoice', {
            variant: 'success',
          });
        }
        setIsBuyPlan(false);
      } catch (error) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        const res = await postSubscriptionPlan({ body: payload })?.unwrap();
        setInvoiceId(res?.data?.invoiceId);
        setOpenPayInvoice(true);

        enqueueSnackbar('Pay invoice', {
          variant: 'success',
        });
        setIsBuyPlan(false);
        // router.push(
        //   `${orgAdminSubcriptionInvoices?.back_subscription_invoices}`,
        // );
      } catch (error: any) {
        if (
          error?.data?.message ===
          SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES?.PLAN_ALREADY_ASSIGNED
        ) {
          enqueueSnackbar(
            SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES?.PLAN_ALREADY_ASSIGNED,
            { variant: 'error' },
          );
        } else {
          enqueueSnackbar('Something went wrong !', { variant: 'error' });
        }
        setIsBuyPlan(false);
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
        setGetData(
          Object?.values(data?.data)?.filter((val) => typeof val == 'object'),
        );
      }
    }
  }, [data, crmPlanData]);

  useEffect(() => {
    if (Object.keys(parsedManageData)?.length === 0) {
      router.push(`${orgAdminSubcriptionInvoices?.back_subscription_invoices}`);
    }
  }, [parsedManageData]);

  const groupedData = featuresData?.data?.productfeatures?.reduce(
    (acc: GroupedDataI, obj: FeatureI) => {
      const productName = obj?.productName;
      if (!acc[productName]) {
        acc[productName] = [];
      }
      acc[productName]?.push(obj);
      return acc;
    },
    {},
  );

  const groupedArray =
    groupedData &&
    Object?.keys(groupedData)?.map((key) => ({
      productName: key,
      data: groupedData[key],
    }));

  const { data: dataPaymentCard, isLoading: loadingPaymentCard } =
    useGetPaymentCardQuery({
      params: {
        page: PAGINATION?.CURRENT_PAGE,
        limit: PAGINATION?.PAGE_LIMIT,
      },
    });

  const isCardAdded = dataPaymentCard?.data?.payments?.length > 0;
  const [openPayInvoice, setOpenPayInvoice] = useState(false);

  const handleClosePayInvoice = () => {
    setOpenPayInvoice(false);
    router.push(`${orgAdminSubcriptionInvoices?.back_subscription_invoices}`);
  };

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
                {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                      return (
                        <TableCell key={uuidv4()} component="th">
                          {choosePlan?.planType?.name ||
                            choosePlan?.planTypeName}
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow>
                {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                      return (
                        <TableCell sx={styles?.planBox} key={uuidv4()}>
                          <Typography variant="h3">
                            £{choosePlan?.planPrice}
                            <Box component={'span'}>/Month</Box>
                          </Typography>
                          {
                            <>
                              {parsedManageData?.planId === choosePlan?._id ? (
                                <PermissionsGuard
                                  permissions={[
                                    ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_BUY_PLAN,
                                  ]}
                                >
                                  <Box sx={styles?.planActiveChip}>
                                    Subscribed
                                  </Box>
                                </PermissionsGuard>
                              ) : (
                                <PermissionsGuard
                                  permissions={[
                                    ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_BUY_PLAN,
                                  ]}
                                >
                                  {choosePlan?.planType?.name ===
                                  'Free' ? null : (
                                    <LoadingButton
                                      loading={loadingPaymentCard}
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        if (!isCardAdded) {
                                          enqueueSnackbar(
                                            'Add a card first to buy plan',
                                            {
                                              variant: 'error',
                                            },
                                          );
                                          return;
                                        } else {
                                          setActivePlanToBuy(choosePlan),
                                            setIsBuyPlan(true);
                                        }
                                      }}
                                    >
                                      Buy Plan
                                    </LoadingButton>
                                  )}
                                </PermissionsGuard>
                              )}
                            </>
                          }
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow sx={styles?.planDetailText}>
                {/* {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                    return (
                      <TableCell key={uuidv4()}>
                        <Typography variant="body2">
                          {choosePlan?.description}
                        </Typography>
                      </TableCell>
                    );
                  })
                  : null} */}
                {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                      const truncateText = (
                        text: string,
                        wordLimit: number,
                      ) => {
                        const words = text?.split(' ');
                        return words?.length > wordLimit
                          ? words?.slice(0, wordLimit).join(' ') + '...........'
                          : text;
                      };

                      return (
                        <TableCell key={uuidv4()}>
                          <Typography variant="body2">
                            {truncateText(choosePlan?.description || '', 10)}
                          </Typography>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow>
                <TableCell sx={styles?.sideHeader}>Users</TableCell>
                {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                      return (
                        <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                          <Typography variant="h6">
                            Includes {choosePlan?.defaultUsers} paid users
                          </Typography>
                          <Typography variant="body2">
                            £ {choosePlan?.additionalPerUserPrice}/ Month per
                            additional user
                          </Typography>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              <TableRow>
                <TableCell sx={styles?.sideHeader}>Storage</TableCell>
                {getData?.length
                  ? getData?.map((choosePlan: PlanDataI) => {
                      return (
                        <TableCell key={uuidv4()} sx={styles?.userIncludes}>
                          <Typography variant="h6">
                            Allow {choosePlan?.defaultStorage} GB storage
                          </Typography>
                          <Typography variant="body2">
                            £ {choosePlan?.additionalStoragePrice}/ Month per
                            additional storage
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
                {getData?.length
                  ? getData?.map((item: PlanDataI, index: number) => {
                      return (
                        // eslint-disable-next-line
                        <TableCell key={index} sx={styles?.userIncludes}>
                          {item?.planType?.name === PLAN_PAYMENT?.FREE ? (
                            <Box
                              sx={{
                                background: theme?.palette?.common?.black,
                                width: '9px',
                                height: '2.5px',
                                margin: '0 auto',
                              }}
                            ></Box>
                          ) : (
                            <PermissionsGuard
                              permissions={[
                                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_USER,
                              ]}
                            >
                              {item?.additionalPerUserPrice === 0 ? (
                                <Counter disabled={true} />
                              ) : (
                                <CounterMaxUser
                                  defaultUsers={
                                    parsedManageData?.planId === item?._id
                                      ? parsedManageData?.additionalUsers || 0
                                      : 0
                                  }
                                  setMaxAdditionalUsers={setMaxAdditionalUsers}
                                  mainId={activePlanToBuy?._id}
                                  mapId={item?._id}
                                />
                              )}
                            </PermissionsGuard>
                          )}
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>

              <TableRow>
                <TableCell sx={styles?.sideHeader}>
                  Max Additional Storage
                </TableCell>
                {getData?.length
                  ? getData?.map((item: PlanDataI, index: number) => {
                      return (
                        // eslint-disable-next-line
                        <TableCell key={index} sx={styles?.userIncludes}>
                          {item?.planType?.name === 'Free' ? (
                            <Box
                              sx={{
                                background: theme?.palette?.common?.black,
                                width: '9px',
                                height: '2.5px',
                                margin: '0 auto',
                              }}
                            ></Box>
                          ) : (
                            <PermissionsGuard
                              permissions={[
                                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_ADD_ADDITIONAL_STORAGE,
                              ]}
                            >
                              {item?.additionalStoragePrice === 0 ? (
                                <Counter disabled={true} />
                              ) : (
                                <CounterAdditionalStorage
                                  defaultUsers={
                                    parsedManageData?.planId === item?._id
                                      ? parsedManageData?.additionalStorage || 0
                                      : 0
                                  }
                                  setMaxAdditionalStorage={
                                    setMaxAdditionalStorage
                                  }
                                  mainId={activePlanToBuy?._id}
                                  mapId={item?._id}
                                />
                              )}
                            </PermissionsGuard>
                          )}
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
              {isCRM ? (
                <>
                  {groupedArray?.map((groupItem: any) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: '18px', fontWeight: '600' }}
                            >
                              {groupItem?.productName}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <>
                          {groupItem?.data?.map((feature: any) => {
                            return (
                              <>
                                <TableRow key={uuidv4()}>
                                  <TableCell sx={styles?.salesActivities}>
                                    <Typography
                                      sx={{
                                        color:
                                          theme?.palette?.custom?.grayish_blue,
                                      }}
                                    >
                                      {feature?.name}
                                    </Typography>
                                  </TableCell>
                                  {getData?.map((planFeature: ChoosePlanI) => {
                                    const isFeatureIncluded =
                                      planFeature?.planProductFeatures?.some(
                                        (row) =>
                                          row?.featureId?.toString() ===
                                          feature?._id?.toString(),
                                      );
                                    if (isFeatureIncluded) {
                                      return (
                                        <TableCell
                                          key={uuidv4()}
                                          align="center"
                                        >
                                          <TickCircleIcon />
                                          <p>
                                            {
                                              planFeature?.planProductFeatures?.find(
                                                (row: any) =>
                                                  row?.featureId?.toString() ===
                                                  feature?._id?.toString(),
                                              )?.dealsAssociationsDetail
                                            }
                                          </p>
                                        </TableCell>
                                      );
                                    } else {
                                      return (
                                        <TableCell
                                          key={uuidv4()}
                                          align="center"
                                        >
                                          <Box
                                            sx={{
                                              background:
                                                theme?.palette?.common?.black,
                                              width: '9px',
                                              height: '2.5px',
                                              margin: '0 auto',
                                            }}
                                          ></Box>
                                        </TableCell>
                                      );
                                    }
                                  })}
                                </TableRow>
                              </>
                            );
                          })}
                        </>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {featuresData?.data?.productfeatures?.map(
                    (feature: ProductFeatureI) => {
                      return (
                        <TableRow key={uuidv4()}>
                          <TableCell sx={styles?.salesActivities}>
                            <Typography variant="h6">
                              {feature?.name}
                            </Typography>
                          </TableCell>
                          {getData?.map((planFeature: PlanDataI) => {
                            const isFeatureIncluded =
                              planFeature?.planProductFeatures?.some(
                                (row: any) =>
                                  row?.featureId?.includes(feature?._id),
                              );
                            if (isFeatureIncluded) {
                              return (
                                <TableCell key={uuidv4()} align="center">
                                  <TickCircleIcon />
                                  <p>
                                    {
                                      planFeature?.planProductFeatures?.find(
                                        (row: any) =>
                                          row?.featureId?.includes(
                                            feature?._id,
                                          ),
                                      )?.dealsAssociationsDetail
                                    }
                                  </p>
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={uuidv4()} align="center">
                                  <Box
                                    sx={{
                                      background: theme?.palette?.common?.black,
                                      width: '9px',
                                      height: '2.5px',
                                      margin: '0 auto',
                                    }}
                                  ></Box>
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    },
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {invoiceId && (
        <PayPlanInvoice
          open={openPayInvoice}
          onClose={handleClosePayInvoice}
          invoiceId={invoiceId}
        />
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
  const [value, setValue] = useState<number>(defaultUsers);
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
  const [value, setValue] = useState<number>(defaultUsers);
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
