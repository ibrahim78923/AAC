import {
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

const CreateView = ({ open, onClose }: any) => {
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
    sharedWithvalue,
    handleChange,
    teamId,
  } = useCreateView();

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
        onClose={onClose}
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
            <Grid item xs={12} md={12}>
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
                  aria-labelledby="sharedWith"
                  name="sharedWith"
                  value={sharedWithvalue}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="PRIVATE"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="MY_TEAM"
                    control={<Radio />}
                    label="My Teams (worked)"
                    disabled={!teamId}
                  />
                  <FormControlLabel
                    value="EVERYONE"
                    control={<Radio />}
                    label="Everyone"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default CreateView;
