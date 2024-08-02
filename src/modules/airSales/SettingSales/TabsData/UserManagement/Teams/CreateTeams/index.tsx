import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import useCreateTeams from './useCreateTeams';
import { teamsDataArray } from './CreateTeams.data';
import { DRAWER_TYPES } from '@/constants/strings';
import { CreateTeamsPropsI } from '../Teams.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const CreateTeams = (props: CreateTeamsPropsI) => {
  const { isAddTeam, setIsAddTeam, teamId } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    productsUsers,
    postTeamLoading,
    updateTeamLoading,
    availableUsersData,
    teamByIdLoading,
    poductUsersLoading,
    availableUsersLoading,
  } = useCreateTeams(teamId, setIsAddTeam, isAddTeam?.type);

  return (
    <CommonDrawer
      isDrawerOpen={isAddTeam?.isToggle}
      onClose={() => setIsAddTeam({ ...isAddTeam, isToggle: false })}
      title={
        isAddTeam?.type === DRAWER_TYPES?.VIEW
          ? 'View Team'
          : isAddTeam?.type === DRAWER_TYPES?.ADD
            ? 'Create Team'
            : 'Edit Team'
      }
      okText={isAddTeam?.type === DRAWER_TYPES?.ADD ? 'Add' : 'Edit'}
      footer={true}
      isOk={true}
      isLoading={postTeamLoading || updateTeamLoading}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {teamsDataArray(
              isAddTeam?.type === DRAWER_TYPES?.ADD
                ? productsUsers?.data
                : availableUsersData?.data,
            )?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                {teamByIdLoading ||
                poductUsersLoading ||
                availableUsersLoading ? (
                  <SkeletonTable />
                ) : (
                  <item.component {...item.componentProps} size={'small'} />
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default CreateTeams;
