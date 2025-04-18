import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { createViewData } from './CreateView.data';
import useCreateView from './useCreateView';
import { sharedWithOptions } from '../ContactsSaleSite.data';
import Loader from '@/components/Loader';

const CreateView = ({ open, onClose, changeRadio, sharedWithvalue }: any) => {
  const theme = useTheme();
  const {
    orgId,
    loadingCreateView,
    submitCreateView,
    methodsCreateView,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
    fetchingAllUserTeams,
    loadingAllUserTeams,
    teamIds,
  } = useCreateView(sharedWithvalue, open);

  const formFields = createViewData(
    orgId,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  );

  const handelClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={handelClose}
        isOk
        okText="Save"
        cancelText={'Cancel'}
        submitHandler={submitCreateView(handelClose)}
        title="Create View"
        footer
        isLoading={loadingCreateView}
      >
        <FormProvider methods={methodsCreateView}>
          <Grid container spacing={2}>
            {formFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
        <Box sx={{ pt: '20px' }}>
          <FormControl>
            <FormLabel
              id="sharedWith"
              sx={{
                fontSize: '14px',
                color: theme?.palette?.grey[600],
                fontWeight: 500,
              }}
            >
              Shared With
            </FormLabel>
            <RadioGroup
              name="sharedWith"
              value={sharedWithvalue}
              onChange={changeRadio}
            >
              <FormControlLabel
                value={sharedWithOptions?.private}
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value={sharedWithOptions?.myTeam}
                control={<Radio />}
                label="My Teams"
                disabled={!teamIds || teamIds?.length === 0}
              />
              <FormControlLabel
                value={sharedWithOptions?.everyone}
                control={<Radio />}
                label="Everyone"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Loader isLoading={fetchingAllUserTeams || loadingAllUserTeams} />
      </CommonDrawer>
    </>
  );
};

export default CreateView;
