import React from 'react';
import useAgentExtension from './useAgentExtension';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { BackArrIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { agentExtArray } from './AgentExtension.data';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';

const AgentExtension = () => {
  const { methods, navigate, handleSubmit, onSubmit } = useAgentExtension();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
        }}
      >
        <BackArrIcon />
        <Typography variant="h3">Agent Extension Flow</Typography>
      </Stack>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {agentExtArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Typography variant="body1" fontWeight={600}>
                  {item?.componentProps?.heading}
                </Typography>
              )}
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
          <Grid item sm={12}>
            <Stack direction={{ md: 'row' }} gap={1} justifyContent="end">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default AgentExtension;
