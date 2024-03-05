import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import useCreateTeams from './useCreateTeams';
import { v4 as uuidv4 } from 'uuid';
import { teamsDataArray } from './CreateTeams.data';

const CreateTeams = (props: any) => {
  const { isAddTeam, setIsAddTeam } = props;
  const { methods, handleSubmit, onSubmit, productsUsers } = useCreateTeams();

  return (
    <CommonDrawer
      isDrawerOpen={isAddTeam}
      onClose={() => setIsAddTeam(false)}
      title={'Create Team'}
      okText={'Add'}
      footer={true}
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {teamsDataArray(productsUsers)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default CreateTeams;
