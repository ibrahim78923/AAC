import React, { useState } from 'react';
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

const ManagePlan = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <>
      <Box sx={styles.card}>
        <Box sx={styles.cardHeader}>
          <Box sx={styles.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Sales
          </Typography>
          <Box sx={styles.cardHeaderAction}>
            <Button
              onClick={() => router.push('/subscription-invoices/choose-plan')}
            >
              Change Plan
            </Button>
          </Box>
        </Box>

        <Box sx={styles.divider}></Box>

        <Box sx={styles.planSelectionRow}>
          <Typography
            variant="body1"
            sx={{ color: 'secondary.main', mr: '24px' }}
          >
            <Box>Plan</Box>
            <Box sx={{ mt: '12px' }}>Growth</Box>
          </Typography>
          <Box sx={styles.planSelectionForm}>
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
                    <MenuItem value={'paidQuarterly'}>Paid Quarterly</MenuItem>
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
                <TextField label="Additional Storage" type="number" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Subscription  Summary */}
      <Box sx={styles.card}>
        <Typography variant="h5" sx={{ color: '#111827', mb: '28px' }}>
          Subscription Summary
        </Typography>
        <Box sx={styles.cardHeader}>
          <Box sx={styles.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Sales
          </Typography>
          <Box sx={styles.cardHeaderAction}>
            <Chip label={'Paid Monthly'} color="primary" />
          </Box>
        </Box>

        <Box sx={styles.divider}></Box>

        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          Growth Plan
        </Typography>

        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>Plan Price</Box>
          <Box sx={styles.planTableTh}>£ 20</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>
            3 Additional Users{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 15/user)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 45</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>
            Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 1/GB)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 1</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>
            Discount{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (10%)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>-£ 10</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (Vat 20%)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 27</Box>
        </Box>

        <Box sx={styles.divider}></Box>

        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>Total Cost</Box>
          <Box sx={styles.planTableTh}>£ 158</Box>
        </Box>
      </Box>

      <Stack
        spacing={'12px'}
        useFlexGap
        direction={'row'}
        sx={styles.updateSubscription}
      >
        <Button
          sx={styles.cancelButton}
          onClick={() => router.push('/subscription-invoices')}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Update Subscription
        </Button>
      </Stack>
    </>
  );
};

export default ManagePlan;
