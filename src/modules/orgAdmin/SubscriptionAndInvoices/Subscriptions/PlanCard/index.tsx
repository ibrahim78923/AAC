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
  id,
  plan,
}) => {
  const dispatch: any = useAppDispatch();

  return (
    <Box sx={styles?.planCard}>
      <Box sx={styles?.planStatus}>
        {status === 'active' && <Box sx={styles?.planActiveChip}>Active</Box>}
      </Box>

      <Box sx={styles?.planIcon}>{icon}</Box>

      <Typography variant={`h6`} sx={styles?.planTitle}>
        {title}
      </Typography>

      <Box sx={styles?.planPlan}>
        <Box component={'span'} sx={styles?.planPlanLight}>
          {planDuration}{' '}
        </Box>
        ({planUsers} users / {planData})
      </Box>

      <Box sx={styles?.planStrip}>
        <Box sx={styles?.planPrice}>£{price}</Box>
        <Typography variant="body2" sx={styles?.planBillOn}>
          {status === 'active' ? `To be billed on ${billOn}` : '-'}
        </Typography>
      </Box>

      <Box sx={styles?.planType}>{type}</Box>

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
                onClick={() => handleBillingDetail(id)}
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
                  pathname: `${orgAdminSubcriptionInvoices?.manage_plan}`,
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
