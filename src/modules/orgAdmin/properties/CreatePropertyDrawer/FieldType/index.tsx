import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { fieldTypeFields } from '../CreatePropertyDrawer.data';
import { AddCircleBlackIcon } from '@/assets/icons';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { fieldTypeAddOptionDefaultValues } from './FieldType.data';
import { SwitchBtn } from '@/components/SwitchButton';
import useFieldType from './useFieldType';
import LoadOptionModal from './LoadOptionModal';
import OwnOptionsModal from './LoadOptionModal/OwnOptionsModal';
import PropertyModal from './LoadOptionModal/PropertyModal';

const FieldType = (props: any) => {
  const { fieldTypeVal } = props;
  const theme = useTheme();
  const { control } = useForm({
    defaultValues: fieldTypeAddOptionDefaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'addOptions',
  });

  const {
    isOpenLoadOptionModal,
    setIsOpenLoadOptionModal,
    handleOpenOwnOptionsModal,
    handleOpenPropertyModal,
    isOpenOwnOptionsModal,
    setIsOpenOwnOptionsModal,
    isOpenPropertyModal,
    setIsOpenPropertyModal,
    handleCancelOwnOptionsModal,
    handleCancelPropertyModal,
  } = useFieldType();

  return (
    <Grid container spacing={2} sx={{ p: 0 }}>
      {fieldTypeFields()?.map((item: any) => {
        return (
          item?.toShowFor?.includes(
            fieldTypeVal === '' || fieldTypeVal === null ? 'all' : fieldTypeVal,
          ) && (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component size="small" {...item?.componentProps} />
              {item?.componentProps?.name === 'search' && (
                <Box mt={2}>
                  <Box display="flex" gap={1} justifyContent="flex-end">
                    <Button
                      color="inherit"
                      variant="outlined"
                      className="small"
                      onClick={() => setIsOpenLoadOptionModal(true)}
                    >
                      Load Options
                    </Button>
                    <Button
                      color="inherit"
                      variant="outlined"
                      className="small"
                    >
                      Delete
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <form>
                      {fields?.map((item, index) => (
                        <Grid
                          container
                          key={item?.id}
                          sx={{ mb: '10px' }}
                          spacing={1}
                          alignItems="center"
                        >
                          {index === 0 && (
                            <>
                              <Grid item xs={1}>
                                <Checkbox />
                              </Grid>
                              <Grid item xs={4}>
                                <FormLabel>
                                  <Typography
                                    variant="body3"
                                    fontWeight={500}
                                    color={theme?.palette?.blue?.main}
                                  >
                                    Label
                                  </Typography>
                                </FormLabel>
                              </Grid>
                              <Grid item xs={4}>
                                <FormLabel>
                                  <Typography
                                    variant="body3"
                                    fontWeight={500}
                                    color={theme?.palette?.blue?.main}
                                  >
                                    Internal Value
                                  </Typography>
                                </FormLabel>
                              </Grid>
                              <Grid item xs={3}>
                                <FormLabel>
                                  <Typography
                                    variant="body3"
                                    fontWeight={500}
                                    color={theme?.palette?.blue?.main}
                                  >
                                    In forms
                                  </Typography>
                                </FormLabel>
                              </Grid>
                            </>
                          )}
                          <Grid item xs={1}>
                            <Checkbox />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              render={() => (
                                <>
                                  <TextField
                                    size="small"
                                    type="text"
                                    placeholder="Enter Label"
                                    fullWidth
                                  />
                                </>
                              )}
                              name={`addOptions.${index}.label`}
                              control={control}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              render={() => (
                                <>
                                  <TextField
                                    size="small"
                                    type="text"
                                    placeholder="Enter Value"
                                    fullWidth
                                  />
                                </>
                              )}
                              name={`addOptions.${index}.value`}
                              control={control}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <SwitchBtn />
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        onClick={() => append({ label: '', value: '' })}
                        sx={{
                          color: theme?.palette?.slateBlue?.main,
                          marginTop: '15px',
                        }}
                        startIcon={<AddCircleBlackIcon />}
                      >
                        Add an Option
                      </Button>
                    </form>
                  </Box>
                </Box>
              )}
            </Grid>
          )
        );
      })}
      {isOpenLoadOptionModal && (
        <LoadOptionModal
          isOpenLoadOptionModal={isOpenLoadOptionModal}
          onClose={() => setIsOpenLoadOptionModal(false)}
          handleOpenOwnOptionsModal={handleOpenOwnOptionsModal}
          handleOpenPropertyModal={handleOpenPropertyModal}
        />
      )}
      {isOpenOwnOptionsModal && (
        <OwnOptionsModal
          open={isOpenOwnOptionsModal}
          onClose={() => setIsOpenOwnOptionsModal(false)}
          handleCancelOwnOptionsModal={handleCancelOwnOptionsModal}
        />
      )}
      {isOpenPropertyModal && (
        <PropertyModal
          open={isOpenPropertyModal}
          onClose={() => setIsOpenPropertyModal(false)}
          handleCancelPropertyModal={handleCancelPropertyModal}
        />
      )}
    </Grid>
  );
};

export default FieldType;
