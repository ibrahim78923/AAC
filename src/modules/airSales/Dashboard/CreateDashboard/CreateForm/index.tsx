import React from 'react';

import {
  Grid,
  Box,
  Button,
  useTheme,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { FormProvider, RHFSwitch } from '@/components/ReactHookForm';

import { dataArray, defaultValues, validationSchema } from './CreateForm.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import DetailsView from '../DetailsView';
import { EyeIcon } from '@/assets/icons';
import DialogCards from '../../Preview/DialogCards';
import useCreateForm from './useCreateForm';

const CreateForm = ({ isShowEditDashboard }: any) => {
  const {
    isOpenPreview,
    setIsOpenPreview,
    selectedDashoardWidget,
    setSelectedDashboardWidgets,
    handleChangeAccessValue,
    accessValue,
  } = useCreateForm();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    setSelectedDashboardWidgets(values);
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
    reset();
  };
  const theme = useTheme();

  return (
    <>
      <Box mt={1}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid sm={12} lg={6}>
              {dataArray?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  style={{ paddingTop: '10px' }}
                >
                  {item.componentProps.name === 'accessDashboard' ? (
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <FormControl>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="slateblue.main"
                          >
                            Who can access this dashboard?
                          </Typography>
                          <RadioGroup
                            value={accessValue}
                            onChange={handleChangeAccessValue}
                            name="access"
                          >
                            <FormControlLabel
                              value="Private to owner (me)"
                              control={<Radio />}
                              label="Private to owner (me)"
                            />
                            <FormControlLabel
                              value="Everyone"
                              control={<Radio />}
                              label="Everyone"
                            />
                            {accessValue === 'Everyone' && (
                              <FormControl sx={{ ml: 2 }} component="fieldset">
                                <RadioGroup aria-label="child" name="child">
                                  <FormControlLabel
                                    value="View and edit"
                                    control={<Radio />}
                                    label="View and edit"
                                  />
                                  <FormControlLabel
                                    value="View only"
                                    control={<Radio />}
                                    label="View only"
                                  />
                                </RadioGroup>
                              </FormControl>
                            )}
                            <FormControlLabel
                              // onClick={handleOpenUsersList}
                              value="Only specific user and teams"
                              control={<Radio />}
                              label="Only specific user and teams"
                            />
                            {/* <SearchableMultiSelect
                        labels={userData}
                       anchorEl={anchorElUserList}
                         handleClose={handleCloseUsersList}
                         pendingValue={pendingValue}
                        setPendingValue={setPendingValue}
                        value={specificUsers}
                      /> */}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box display={{ xl: 'block', xs: 'none' }}>
                        <RHFSwitch name="default" label="Set as default" />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        fontWeight={600}
                        color="slateblue.main"
                        variant="h6"
                      >
                        {item.componentProps?.heading}
                      </Typography>
                      <item.component {...item.componentProps} size="small" />
                    </>
                  )}
                </Grid>
              ))}
              {isShowEditDashboard && (
                <Grid sm={12} sx={{ textAlign: 'end' }} mt={6} mr={3}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsOpenPreview(true)}
                    startIcon={<EyeIcon />}
                  >
                    Preview Dashboard
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid sm={12} lg={6}>
              <DetailsView selectedDashoardWidget={selectedDashoardWidget} />
            </Grid>

            <Grid item sm={12} style={{ textAlign: 'end' }}>
              <Button
                className="small"
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '112px',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="small"
                type="submit"
                sx={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
      {isOpenPreview && (
        <DialogCards
          open={isOpenPreview}
          setOpen={setIsOpenPreview}
          selectedDashoardWidget={selectedDashoardWidget}
        />
      )}
    </>
  );
};
export default CreateForm;
