import React from 'react';
import useAgentExtension from './useAgentExtension';
import { Grid, Stack, Typography } from '@mui/material';
import { BackArrIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { agentExtArray } from './AgentExtension.data';
import { PHONE_SETTINGS } from '@/routesConstants/paths';

const AgentExtension = () => {
  const { methods, navigate } = useAgentExtension();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate?.push(PHONE_SETTINGS?.PHONE_SETTINGS_MAIN);
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
        </Grid>
      </FormProvider>
    </>
  );
};

export default AgentExtension;
