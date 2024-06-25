import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import useCreateTeams from './useCreateTeams';
import { v4 as uuidv4 } from 'uuid';
import { teamsDataArray } from './CreateTeams.data';
import useUserManagement from '../../useUserManagement';
import { DRAWER_TYPES } from '@/constants/strings';
import { getSession } from '@/utils';

const CreateTeams = (props?: any) => {
  const { user }: any = getSession();
  const { isAddTeam, setIsAddTeam, teamDataById, teamByIdLoading } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    productsUsers,
    postTeamLoading,
    updateTeamLoading,
  } = useCreateTeams(teamDataById, setIsAddTeam, isAddTeam?.type);
  const { skeletonLines } = useUserManagement();
  const filteredUsers = productsUsers
    ? productsUsers?.data?.usercompanyaccounts
    : [];
  const loggedUserData = [
    {
      _id: user?._id,
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
    },
  ];

  const allTeamMembers = [...loggedUserData, ...filteredUsers];
  const filterdTeamMembers = allTeamMembers?.filter((item: any) => !item?.team);

  return (
    <CommonDrawer
      isDrawerOpen={isAddTeam?.isToggle}
      onClose={() => setIsAddTeam(false)}
      title={
        isAddTeam?.type === DRAWER_TYPES?.ADD ? 'Create Team' : 'Edit Team'
      }
      okText={isAddTeam?.type === DRAWER_TYPES?.ADD ? 'Add' : 'Edit'}
      footer={true}
      isOk={true}
      isLoading={
        isAddTeam?.type === DRAWER_TYPES?.ADD
          ? postTeamLoading
          : updateTeamLoading
      }
      submitHandler={handleSubmit(onSubmit)}
    >
      {teamByIdLoading ? (
        <Box>{skeletonLines}</Box>
      ) : (
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {teamsDataArray(
                isAddTeam?.type === DRAWER_TYPES?.ADD
                  ? filterdTeamMembers
                  : allTeamMembers,
              )?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
      )}
    </CommonDrawer>
  );
};

export default CreateTeams;
