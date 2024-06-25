import { Box, Button, InputAdornment, Typography } from '@mui/material';
import BuyMoreCredits from './BuyMoreCredits';
import { usePhoneCredits } from './usePhoneCredits';
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

const PhoneCredits = () => {
  const { isDrawerOpen, setIsDrawerOpen, handleSubmit, onSubmit, methods } =
    usePhoneCredits();
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box m={2} mb={3}>
          <Typography variant="h3" color="slateBlue.main">
            Phone credits
          </Typography>
        </Box>
        <Box m={2}>
          <Box border="0.1rem solid" borderColor="grey.700" borderRadius={2}>
            <Box
              display="flex"
              gap={2}
              p={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" gap={2}>
                <Box
                  width={60}
                  height={60}
                  bgcolor="primary.light"
                  borderRadius={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h1" color="primary.main">
                    £
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="blue.dull_blue">
                    Current Balance
                  </Typography>
                  <Typography variant="h3" color="primary.main">
                    £120,800
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                gap={2}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Box>
                  <RHFTextField
                    name="phoneCredits"
                    label="Buy more credits"
                    type="number"
                    fullWidth
                    InputProps={{
                      min: 0,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ mt: 0.1, color: 'primary.main' }}
                        >
                          £
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    placeholder="5"
                    required
                  />
                </Box>
                <Button
                  sx={{ mb: 1 }}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Buy
                </Button>
              </Box>
            </Box>
            <Box p={2} borderTop="0.1rem solid" borderColor="grey.700">
              <RHFCheckbox
                name="autoRecharge"
                label="Auto recharge"
                color="primary"
                size="small"
                icon={<CheckboxIcon />}
                checkedIcon={<CheckboxCheckedIcon />}
              />
              <Typography
                component="p"
                variant="body3"
                color="custom.main"
                ml={3}
              >
                When your balance is down to $5, phone credits will be
                auto-recharged.
              </Typography>
            </Box>
          </Box>
        </Box>
      </FormProvider>
      <BuyMoreCredits
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default PhoneCredits;
