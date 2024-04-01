import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  TextField,
  InputLabel,
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
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useAppSelector } from '@/redux/store';

const ManagePlan = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );

  const [updateSubscription] = useUpdateSubscriptionMutation({});

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event?.target?.value as string);
  };

  const updateSubscriptionPayload = {
    planId: parsedManageData?.planId,
    additionalUsers: parsedManageData?.additionalUsers,
    additionalStorage: parsedManageData?.additionalStorage,
    billingDate: dayjs(parsedManageData?.billingDate).format(DATE_FORMAT?.API),
    status: parsedManageData?.status,
    //TODO:We will only send billing cycle monthly as discussed
    billingCycle: 'MONTHLY',
    planDiscount: 1,
  };

  const handleUpdateSubscription = async () => {
    try {
      await updateSubscription({
        id: parsedManageData?._id,
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

  const planPrice =
    parsedManageData?.planData?.planPrice ||
    parsedManageData?.planPrice ||
    parsedManageData?.plans?.planPrice ||
    0;
  const additionalUsers =
    (parsedManageData?.additionalUsers || 0) *
      parsedManageData?.planData?.additionalPerUserPrice ||
    parsedManageData?.plans?.additionalPerUserPrice;
  const additionalStorage =
    (parsedManageData?.additionalStorage || 0) *
      parsedManageData?.planData?.additionalStoragePrice ||
    parsedManageData?.plans?.additionalStoragePrice;
  const planDiscount = parsedManageData?.planDiscount || 0;
  const planTax = 0.2; // By default 20% discount

  const convertedPlanDiscount = planDiscount / 100;
  const totalCostBeforeDiscount =
    planPrice + additionalUsers + additionalStorage;
  const discountedPriceBeforeTax =
    totalCostBeforeDiscount - totalCostBeforeDiscount * convertedPlanDiscount;
  const discountApplied = totalCostBeforeDiscount - discountedPriceBeforeTax;
  const taxAmount = discountedPriceBeforeTax * planTax;
  const finalPrice = discountedPriceBeforeTax + taxAmount;

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
            Sales
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
              <Box sx={{ mt: '12px' }}>Growth</Box>
            </Typography>

            <Box sx={styles?.planSelectionForm}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="billingCycle">Billing Cycle</InputLabel>
                    <Select
                      labelId="billingCycle"
                      value={value}
                      label="Age"
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
                  <TextField
                    label="Max Additional User"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Additional Storage"
                    type="number"
                    fullWidth
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
            Sales
          </Typography>
          <Box sx={styles?.cardHeaderAction}>
            <Chip label={'Paid Monthly'} color="primary" />
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          Growth Plan
        </Typography>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>Plan Price</Box>
          <Box sx={styles?.planTableTh}>£ {planPrice}</Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {parsedManageData?.additionalUsers} Additional Users{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 15/user)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>£ {additionalUsers || 0}</Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 1/GB)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>£ {additionalStorage || 0}</Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Discount{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              ({planDiscount} %)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>-£ {discountApplied || 0}</Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (Vat 20%)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>£ {taxAmount || 0}</Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>Total Cost</Box>
          <Box sx={styles?.planTableTh}>£ {finalPrice || 0}</Box>
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
