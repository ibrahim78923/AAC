import React, { FC } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { PlanCardI } from './PlanCard.interface';
import { styles } from './PlanCard.style';
import { orgAdminSubcriptionInvoices } from '@/routesConstants/paths';
import Link from 'next/link';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { useAppDispatch } from '@/redux/store';
import { setSelectedPlanData } from '@/redux/slices/orgAdmin/SubscriptionAndInvoices';

const PlanCard: FC<PlanCardI> = ({
  status,
  icon,
  title,
  planDuration,
  planUsers,
  planData,
  price,
  billOn,
  type,
  handleBillingDetail,
  plan,
}) => {
  const dispatch = useAppDispatch();

  function formatText(text: any) {
    return text
      ?.toLowerCase()
      ?.split('_')
      ?.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(' ');
  }
  return (
    <Box sx={styles?.planCard}>
      <Box sx={styles?.planStatus}>
        {plan?.orgPlanId && (
          <Box
            sx={{
              ...styles?.planActiveChip,
              backgroundColor:
                status === 'ACTIVE' ? 'success.lighter' : 'warning.lighter',
            }}
          >
            {status && formatText(status)}
          </Box>
        )}
      </Box>

      <Box sx={styles?.planIcon}>{icon}</Box>

      <Typography variant={`h6`} sx={styles?.planTitle}>
        {title}
      </Typography>

      <Box sx={styles?.planPlan}>
        <Box component={'span'} sx={styles?.planPlanLight}>
          {planDuration}{' '}
        </Box>
        {type ? (
          <>
            ({planUsers} users / {plan?.planData?.defaultStorage} GB ){' '}
            {planData}
          </>
        ) : (
          <Box sx={{ height: '20px' }}></Box>
        )}
      </Box>
      <Box sx={styles?.planStrip}>
        <Box sx={styles?.planPrice}>£{price}</Box>
        <Typography variant="body3" sx={styles?.planBillOn}>
          {status === 'ACTIVE' ? `To be billed on ${billOn}` : ''}
        </Typography>
      </Box>

      {type ? (
        <Box sx={styles?.planType}>{type}</Box>
      ) : (
        <Box sx={{ height: '20px' }}></Box>
      )}

      <Stack
        spacing={'12px'}
        useFlexGap
        direction={'row'}
        sx={styles?.planActions}
      >
        {plan?.orgPlanId ? (
          <>
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_VIEW_BILLING_DETAILS,
              ]}
            >
              <Button
                variant="contained"
                onClick={() => {
                  handleBillingDetail(plan?.orgPlanId),
                    dispatch(setSelectedPlanData(plan));
                }}
                sx={{ fontWeight: 500 }}
              >
                Billing Details
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_MANAGE_PLAN,
              ]}
            >
              <Link
                href={{
                  pathname:
                    status === 'ACTIVE'
                      ? `${orgAdminSubcriptionInvoices?.manage_plan}`
                      : `${orgAdminSubcriptionInvoices?.choose_plan}`,
                }}
              >
                <Button
                  variant="outlined"
                  sx={styles?.buttonOutlineGrey}
                  onClick={() => {
                    dispatch(setSelectedPlanData(plan));
                  }}
                >
                  Manage Plan
                </Button>
              </Link>
            </PermissionsGuard>
          </>
        ) : (
          <Link
            href={{
              pathname: `${orgAdminSubcriptionInvoices?.choose_plan}`,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                dispatch(setSelectedPlanData(plan));
              }}
              fullWidth
              sx={{ fontWeight: 500 }}
            >
              Subscribe
            </Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
};

export default PlanCard;
