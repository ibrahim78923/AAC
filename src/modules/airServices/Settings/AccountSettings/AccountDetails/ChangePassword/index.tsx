import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useChangePassword } from './useChangePassword';
import { FormProvider } from '@/components/ReactHookForm';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { FormGrid } from '@/components/Grids/FormGrid';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

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
          <ActionsLoadingButton
            showSubmitLoader={postChangePasswordProgress?.isLoading}
            handleCancelButton={reset}
          />
        </FormProvider>
      </UncontrolledAccordion>
    </Box>
  );
};
