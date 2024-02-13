import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { CreateRulesDataArray } from './CreateRules.data';
import { useCreateRules } from './useCreateRules';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CreateRuleAction } from './CreateRuleAction';
import CreateRuleConditions from './CreateRuleConditions';
import { LoadingButton } from '@mui/lab';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';

const CreateRules = () => {
  const {
    methods,
    onSubmit,
    handleSubmit,
    handleMoveBack,
    watch,
    register,
    setValue,
    action,
  } = useCreateRules();
  const EDIT_WORKFLOW = 'edit';
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} justifyContent={'space-between'} gap={0.5} mb={1}>
          <Box display={'flex'} alignItems={'center'} gap={0.5} mb={1}>
            <IconButton>
              <ArrowBackIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  handleMoveBack?.();
                }}
              />
            </IconButton>
            <Typography variant="h4">
              {action === EDIT_WORKFLOW
                ? 'Edit Supervisor Rules'
                : 'Create Supervisor Rules'}
            </Typography>
          </Box>
          <Box display={'flex'} gap={0.5}>
            <LoadingButton
              startIcon={<CopyIcon />}
              variant="outlined"
              color="secondary"
            >
              Test Workflow
            </LoadingButton>
            <LoadingButton
              startIcon={<GrayBookIcon />}
              variant="outlined"
              color="secondary"
            >
              Save as Draft
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              startIcon={<WhiteBookIcon />}
            >
              {action === EDIT_WORKFLOW ? 'Update' : 'Create'}
            </LoadingButton>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {CreateRulesDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Box py={1}>
          <CreateRuleConditions
            control={methods?.control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        </Box>
        <CreateRuleAction />
      </FormProvider>
    </>
  );
};

export default CreateRules;
