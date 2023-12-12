import {
  Grid,
  Box,
  useTheme,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Radio,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import {
  dataArray,
  defaultValues,
  specificUserOrTeamOptions,
  teamsArr,
  usersArr,
  validationSchema,
} from './SaveNewViewDrawer.data';
import useSaveAndNewViewDrawer from './useSaveNewViewDrawer';

export default function SaveNewViewDrawer({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Export Campaign Exported Successfully', {
      variant: 'success',
    });
  };
  const theme = useTheme();
  const { accessValue, handleChangeAccessValue } = useSaveAndNewViewDrawer();
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Save New View'}
      okText={'Save'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
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
          <FormControl>
            <Typography
              variant="h6"
              fontWeight={600}
              color={theme?.palette?.slateBlue.main}
            >
              Shared with
            </Typography>
            <RadioGroup
              value={accessValue}
              onChange={handleChangeAccessValue}
              name="access"
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="specificUserOrTeam"
                control={<Radio />}
                label="Specific User or Team"
              />
              {accessValue ===
                specificUserOrTeamOptions?.specificUserOrTeam && (
                <FormControl sx={{ ml: 2 }} component="fieldset">
                  <RHFSelect name="users" label="Users" size="small">
                    {teamsArr?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect name="teams" label="Teams" size="small">
                    {usersArr?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </RHFSelect>
                </FormControl>
              )}
              <FormControlLabel
                value="everyOne"
                control={<Radio />}
                label="EveryOne"
              />
            </RadioGroup>
          </FormControl>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
