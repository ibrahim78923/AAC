import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { BackArrIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import useTemplateForm from './useTemplateForm';
import { createTemplateFiltersDataArray } from './TemplateForm.data';
import { Info } from '@mui/icons-material';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

const TemplateForm = ({ templateType }: any) => {
  const {
    router,
    theme,
    templateMethods,
    handleSubmit,
    onSubmit,
    TemplateName,
    postTemplateLoading,
    updateTemplateLoading,
    Category,
    Details,
    form,
    getDynamicFieldsStatus,
  } = useTemplateForm();

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          sx={{
            minWidth: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: '0px ',
          }}
          onClick={() => router?.back()}
        >
          <BackArrIcon />
        </Button>
        <Typography variant="h3">{templateType} Template</Typography>
      </Box>
      <FormProvider methods={templateMethods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {createTemplateFiltersDataArray()?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item.componentProps} size={'small'} />
                  {item?.componentProps?.name === 'detail' && (
                    <Box display="flex" gap={1}>
                      <Info sx={{ color: theme?.palette?.grey[500] }} />
                      <Typography color={theme?.palette?.grey[500]}>
                        Please note that the maximum character limit for a
                        template is 1024 characters. If you exceed this limit,
                        the message will not be sent.
                      </Typography>
                    </Box>
                  )}
                </Grid>
              ))}
              {getDynamicFieldsStatus.isLoading ? (
                <Box display="flex" justifyContent="center" mt={3} width="100%">
                  <CircularProgress />
                </Box>
              ) : (
                form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))
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
            onClick={() => router?.back()}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px' }}
            type="submit"
            loading={postTemplateLoading || updateTemplateLoading}
          >
            Save Template
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default TemplateForm;
