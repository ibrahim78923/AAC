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
} from '@mui/material';
import { PlaneIcon } from '@/assets/icons';
import { styles } from './ManagePlan.style';
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import { useUpdateSubscriptionMutation } from '@/services/orgAdmin/subscription-and-invoices';
import dayjs from 'dayjs';
import { DATE_FORMAT, PLAN_CALCULATIONS } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useAppSelector } from '@/redux/store';
import usePlanCalculations from '../usePlanCalculations';
import CustomLabel from '@/components/CustomLabel';

const ManagePlan = () => {
  const router = useRouter();

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );

  const defaultValues =
    parsedManageData?.billingCycle === 'MONTHLY' ? 'paidMonthly' : '';

  const [value, setValue] = useState<any>(defaultValues);

  const [maxAddUsers, setMaxAddUsers] = useState(
    parsedManageData?.additionalUsers,
  );
  const [maxAddStorage, setMaxAddStorage] = useState(
    parsedManageData?.additionalStorage,
  );

  const [updateSubscription] = useUpdateSubscriptionMutation({});

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
    billingCycle: 'MONTHLY',
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
    } catch (error: any) {
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

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.cardHeader}>
          <Box sx={styles?.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            {parsedManageData?.productName || '--'}
          </Typography>
          <Box sx={styles?.cardHeaderAction}>
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_CHANGE_PLAN,
              ]}
            >
              <Link
                href={{
                  pathname: `${orgAdminSubcriptionInvoices.choose_plan}`,
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
                    >
                      <MenuItem value={'paidMonthly'}>Paid Monthly</MenuItem>
                      <MenuItem value={'paidQuarterly'}>
                        Paid Quarterly
                      </MenuItem>
                      <MenuItem value={'paidHalfYearly'}>
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
                    fullWidth
                    defaultValue={maxAddUsers}
                    onChange={(e: any) => setMaxAddUsers(e?.target?.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomLabel label={'Additional Storage'} />
                  <TextField
                    type="number"
                    fullWidth
                    defaultValue={maxAddStorage}
                    onChange={(e: any) => setMaxAddStorage(e?.target?.value)}
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

        {/* <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Total{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {(planCalculations?.discountApplied || 0)?.toFixed(2)}
          </Box>
        </Box> */}

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
                `${orgAdminSubcriptionInvoices.back_subscription_invoices}`,
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
        </Stack>
      </PermissionsGuard>
    </>
  );
};

export default ManagePlan;
