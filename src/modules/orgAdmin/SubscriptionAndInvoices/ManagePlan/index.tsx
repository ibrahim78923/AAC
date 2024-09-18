import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { PlaneIcon, WarningIcon } from '@/assets/icons';
import { styles } from './ManagePlan.style';
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import {
  usePatchUnAssignPlanMutation,
  useUpdateSubscriptionMutation,
} from '@/services/orgAdmin/subscription-and-invoices';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  PLAN_CALCULATIONS,
  PLAN_PAYMENT_TYPE_TAGS,
} from '@/constants';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useAppSelector } from '@/redux/store';
import usePlanCalculations from '../usePlanCalculations';
import CustomLabel from '@/components/CustomLabel';
import { AlertModals } from '@/components/AlertModals';

const ManagePlan = () => {
  const theme = useTheme();
  const router = useRouter();

  const [isUnassignPlanAlertOpen, setIsUnassignPlanAlertOpen] = useState(false);

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );

  const defaultValues =
    parsedManageData?.billingCycle === 'MONTHLY'
      ? PLAN_PAYMENT_TYPE_TAGS?.PAID_MONTHLY
      : '';

  const [value, setValue] = useState<string>(defaultValues);

  const [maxAddUsers, setMaxAddUsers] = useState(
    parsedManageData?.additionalUsers,
  );
  const [maxAddStorage, setMaxAddStorage] = useState(
    parsedManageData?.additionalStorage,
  );

  const [updateSubscription] = useUpdateSubscriptionMutation({});
  const [patchUnAssignPlan, { isLoading: unAssignPlanLoading }] =
    usePatchUnAssignPlanMutation({});

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event?.target?.value as string);
  };

  const updateSubscriptionPayload = {
    planId: parsedManageData?.planId,
    additionalUsers: maxAddUsers,
    additionalStorage: maxAddStorage,
    billingDate: dayjs(parsedManageData?.billingDate)?.format(DATE_FORMAT?.API),
    status: parsedManageData?.status,
    //TODO:We will only send billing cycle monthly as discussed
    billingCycle: PLAN_PAYMENT_TYPE_TAGS?.MONTHLY,
    planDiscount: 1,
  };

  const planCalculations = usePlanCalculations({
    additionalDefaultUser: parsedManageData?.additionalUsers,
    additionalDefaultStorage: parsedManageData?.additionalStorage,
    additionalUserPrice: parsedManageData?.planData?.additionalPerUserPrice,
    additionalStoragePrice: parsedManageData?.planData?.additionalStoragePrice,
    planDefaultPrice:
      parsedManageData?.planData?.planPrice ||
      parsedManageData?.planPrice ||
      parsedManageData?.plans?.planPrice,
    planDefaultDiscount: parsedManageData?.planDiscount,
    PLAN_CALCULATIONS,
  });

  const handleUpdateSubscription = async () => {
    try {
      await updateSubscription({
        id: parsedManageData?.orgPlanId,
        body: updateSubscriptionPayload,
      }).unwrap();
      enqueueSnackbar('Plan Updated Successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('SomeThing Went Wrong', {
        variant: 'success',
      });
    }
  };

  useEffect(() => {
    if (Object.keys(parsedManageData)?.length === 0) {
      router.push(`${orgAdminSubcriptionInvoices?.back_subscription_invoices}`);
    }
  }, [parsedManageData]);

  const handelOnUnassignPlan = async () => {
    try {
      await patchUnAssignPlan({
        organizationPlanId: parsedManageData?.orgPlanId,
      }).unwrap();
      enqueueSnackbar('Plan Unassigned Successfully', {
        variant: 'success',
      });
      setIsUnassignPlanAlertOpen(false);
      router.push(`${orgAdminSubcriptionInvoices?.back_subscription_invoices}`);
    } catch (error) {
      enqueueSnackbar('SomeThing Went Wrong', {
        variant: 'success',
      });
    }
  };

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.cardHeader}>
          <Box sx={styles?.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            {parsedManageData?.productName ||
              parsedManageData?.planName ||
              '--'}
          </Typography>
          <Box sx={styles?.cardHeaderAction}>
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_CHANGE_PLAN,
              ]}
            >
              <Link
                href={{
                  pathname: `${orgAdminSubcriptionInvoices?.choose_plan}`,
                  query: { data: parsedManageData?.productId },
                }}
                as={`${orgAdminSubcriptionInvoices?.choose_plan}`}
              >
                <Button>Change Plan</Button>
              </Link>
            </PermissionsGuard>
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planSelectionRow}>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_UPDATE_SUBSCRIPTION,
            ]}
          >
            <Typography
              variant="body1"
              sx={{ color: 'secondary.main', mr: '24px' }}
            >
              <Box>Plan</Box>
              <Box sx={{ mt: '12px' }}>{parsedManageData?.planTypeName}</Box>
            </Typography>

            <Box sx={styles?.planSelectionForm}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <CustomLabel label={'Billing Cycle'} />
                    <Select
                      labelId="billingCycle"
                      value={value}
                      defaultValue="monthly"
                      // label="Age"
                      onChange={handleChange}
                      disabled
                      size="small"
                    >
                      <MenuItem value={PLAN_PAYMENT_TYPE_TAGS?.MONTHLY}>
                        Paid Monthly
                      </MenuItem>
                      <MenuItem value={PLAN_PAYMENT_TYPE_TAGS?.QUARTERLY}>
                        Paid Quarterly
                      </MenuItem>
                      <MenuItem value={PLAN_PAYMENT_TYPE_TAGS?.HALF_YEARLY}>
                        Paid Half-Yearly
                      </MenuItem>
                      <MenuItem value={'paidAnnually'}>Paid Annually</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <CustomLabel label={'Max Additional User'} />
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    defaultValue={maxAddUsers}
                    inputProps={{ min: 1 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMaxAddUsers(e?.target?.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomLabel label={'Additional Storage'} />
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    defaultValue={maxAddStorage}
                    inputProps={{ min: 1 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMaxAddStorage(e?.target?.value)
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </PermissionsGuard>
        </Box>
      </Box>

      {/* Subscription  Summary */}
      <Box sx={styles?.card}>
        <Typography variant="h5" sx={{ color: '#111827', mb: '28px' }}>
          Subscription Summary
        </Typography>
        <Box sx={styles?.cardHeader}>
          <Box sx={styles?.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            {parsedManageData?.planTypeName}
          </Typography>
          <Box sx={styles?.cardHeaderAction}>
            <Chip label={'Paid Monthly'} color="primary" />
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>Plan Price</Box>
          <Box sx={styles?.planTableTh}>£ {planCalculations?.planPrice}</Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {parsedManageData?.additionalUsers} Additional Users{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ {planCalculations?.perUserPrice}/user)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.additionalUsers || 0)?.toFixed(2)}
          </Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {parsedManageData?.additionalStorage} Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ {planCalculations?.perStoragePrice}/GB)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.additionalStorage || 0)?.toFixed(2)}
          </Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Discount{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              ({planCalculations?.planDiscount} %)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.discountApplied || 0)?.toFixed(2)}
          </Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              ( 20%)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.taxAmount || 0).toFixed(2)}
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>Total Cost</Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.finalPrice || 0).toFixed(2)}
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_UPDATE_SUBSCRIPTION,
        ]}
      >
        <Stack
          spacing={'12px'}
          useFlexGap
          direction={'row'}
          sx={styles?.updateSubscription}
        >
          <Button
            sx={styles?.cancelButton}
            onClick={() =>
              router.push(
                `${orgAdminSubcriptionInvoices?.back_subscription_invoices}`,
              )
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateSubscription}
          >
            Update Subscription
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme?.palette?.error?.dark,
              '&:hover': {
                backgroundColor: theme?.palette?.error?.dark,
              },
            }}
            onClick={() => setIsUnassignPlanAlertOpen(true)}
          >
            Unassign Plan
          </Button>
        </Stack>
      </PermissionsGuard>

      <AlertModals
        type={'Unassign Plan'}
        typeImage={<WarningIcon />}
        message={`Are you sure you want to unassign plan`}
        open={isUnassignPlanAlertOpen}
        disabled={false}
        handleClose={() => setIsUnassignPlanAlertOpen(false)}
        loading={unAssignPlanLoading}
        handleSubmitBtn={handelOnUnassignPlan}
      />
    </>
  );
};

export default ManagePlan;
