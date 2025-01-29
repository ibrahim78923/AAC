import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useChangePassword } from './useChangePassword';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { FormGrid } from '@/components/Grids/FormGrid';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';

export const ChangePassword = () => {
  const {
    changePasswordFields,
    methods,
    reset,
    handleSubmitChangePassword,
    theme,
    postChangePasswordProgress,
  } = useChangePassword();

  return (
    <Box
      borderBottom={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2.5}
    >
      <UncontrolledAccordion
        expandIcon={<ExpandMoreIcon />}
        summaryTitle="Change Password"
        variantType={ACCORDION_VARIANTS?.INHERIT}
        summaryKey="panel1a"
      >
        <FormProvider methods={methods} onSubmit={handleSubmitChangePassword}>
          <FormGrid spacing={1} formFieldsList={changePasswordFields} />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'end',
              my: 2,
            }}
          >
            <LoadingButton
              loading={postChangePasswordProgress?.isLoading}
              variant="contained"
              className="small"
              type="submit"
            >
              Save
            </LoadingButton>
            <LoadingButton
              disabled={postChangePasswordProgress?.isLoading}
              variant="outlined"
              className="small"
              onClick={() => reset()}
            >
              cancel
            </LoadingButton>
          </Box>
        </FormProvider>
      </UncontrolledAccordion>
    </Box>
  );
};
