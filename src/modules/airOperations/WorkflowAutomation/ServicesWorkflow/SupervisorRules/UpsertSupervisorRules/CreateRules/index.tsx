import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { CreateRulesDataArray } from './CreateRules.data';
import { useCreateRules } from './useCreateRules';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CreateRuleAction } from './CreateRuleAction';
import CreateRuleConditions from './CreateRuleConditions';
import { LoadingButton } from '@mui/lab';

const CreateRules = () => {
  const {
    methods,
    onSubmit,
    handleSubmit,
    moveBack,
    watch,
    register,
    setValue,
  } = useCreateRules();
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} justifyContent={'space-between'} gap={0.5} mb={1}>
          <Box display={'flex'} alignItems={'center'} gap={0.5} mb={1}>
            <IconButton>
              <ArrowBackIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  moveBack?.();
                }}
              />
            </IconButton>
            <Typography variant="h3">Create Supervisor Rules</Typography>
          </Box>
          <Box display={'flex'} gap={0.5}>
            <Button variant="outlined" color="secondary">
              Test Workflow
            </Button>
            <Button variant="outlined">Save as Draft</Button>
            <LoadingButton variant="contained" type="submit">
              Create
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
