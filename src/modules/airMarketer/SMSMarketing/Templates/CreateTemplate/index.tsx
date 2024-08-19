import React, { createElement } from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Grid,
  Skeleton,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { createTemplateDataArray } from './CreateTemplate.data';
import { FormProvider } from '@/components/ReactHookForm';
import useCreateTemplate from './useCreateTemplate';
import { API_STATUS, TASK_TYPE } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { componentMap } from '@/utils/dynamic-forms';

const CreateTemplate = () => {
  const {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
    postTempLoading,
    updateTempLoading,
    Category,
    Details,
    type,
    theme,
    handleCancelBtn,
    form,
    getDynamicFieldsStatus,
  } = useCreateTemplate();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router?.back()}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h4">
          {type === TASK_TYPE?.EDIT_TASK ? 'Edit' : 'Create'} Template
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <Grid container spacing={4}>
              {createTemplateDataArray?.map((item: any, index: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                  sx={{
                    paddingTop:
                      index === 0 ? '40px !important' : '17px !important',
                  }}
                >
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

              {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
                <>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {form?.map((item: any) => (
                    <Grid item xs={12} key={item?.id}>
                      {componentMap[item?.component] &&
                        createElement(componentMap[item?.component], {
                          ...item?.componentProps,
                          name: item?.componentProps?.label,
                          size: 'small',
                        })}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={12} sx={{ position: 'relative' }}>
              <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h4">Preview</Typography>
                {!TemplateName ? (
                  <Typography
                    variant="body1"
                    color={theme?.palette?.custom?.dim_blue}
                  >
                    Your preview will appear here{' '}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    color={theme?.palette?.custom?.text_slate_blue}
                  >
                    {TemplateName}
                  </Typography>
                )}
                <Typography variant="body2">{Category}</Typography>

                <Box
                  sx={{
                    backgroundColor: 'white',
                    marginTop: '20px',
                  }}
                >
                  {!Category && (
                    <Box sx={{ display: 'Flex', alignItems: 'center' }}>
                      <Box>
                        <Skeleton
                          variant="rounded"
                          sx={{
                            marginY: '15px',
                            bgcolor: theme?.palette?.custom?.off_white_three,
                          }}
                          width={94}
                          height={10}
                        />
                      </Box>
                    </Box>
                  )}

                  {!Details ? (
                    <>
                      <Skeleton
                        variant="rounded"
                        sx={{
                          marginTop: '20px',
                          bgcolor: theme?.palette?.custom?.off_white_three,
                        }}
                        width={443}
                        height={10}
                      />
                      <Skeleton
                        variant="rounded"
                        sx={{
                          marginTop: '10px',
                          bgcolor: theme?.palette?.custom?.off_white_three,
                        }}
                        width={348}
                        height={10}
                      />
                      <Skeleton
                        variant="rounded"
                        sx={{
                          marginTop: '10px',
                          bgcolor: theme?.palette?.custom?.off_white_three,
                        }}
                        width={280}
                        height={10}
                      />
                    </>
                  ) : (
                    <TextareaAutosize
                      value={Details}
                      minRows={3}
                      maxRows={10}
                      style={{
                        width: '100%',
                        border: `1px solid ${theme?.palette?.grey?.[700]}`,
                        padding: '15px',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            marginY: '20px',
            position: 'absolute',
            bottom: '0',
            right: '40px',
          }}
        >
          <Button
            className="small"
            variant="outlined"
            sx={{
              marginLeft: '10px',
              backgroundColor: 'white',
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
            }}
            onClick={handleCancelBtn}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px' }}
            type="submit"
            loading={postTempLoading || updateTempLoading}
          >
            Save Template
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
export default CreateTemplate;
