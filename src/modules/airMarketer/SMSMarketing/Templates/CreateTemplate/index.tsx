import React from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Grid,
  Skeleton,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { CreateTemplateDataArray } from './CreateTemplate.data';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import useCreateTemplate from './useCreateTemplate';

const CreateTemplate = () => {
  const {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
    Category,
    Details,
  } = useCreateTemplate();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
          <Box
            onClick={() => router?.back()}
            sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
          >
            <ArrowBackIcon />
          </Box>
          <Typography variant="h4">Create Post</Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {CreateTemplateDataArray?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
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
          </Grid>
        </FormProvider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4">Preview</Typography>
          <Typography variant="body2">
            {TemplateName ? TemplateName : 'Your Preview will appear here'}
          </Typography>
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
                    sx={{ marginY: '15px', bgcolor: '#EBECF1' }}
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
                  sx={{ marginTop: '20px', bgcolor: '#EBECF1' }}
                  width={443}
                  height={10}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ marginTop: '10px', bgcolor: '#EBECF1' }}
                  width={348}
                  height={10}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ marginTop: '10px', bgcolor: '#EBECF1' }}
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
                  border: '1px solid #E5E7EB',
                  padding: '15px',
                  borderRadius: '8px',
                }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', marginY: '20px' }}>
            <Button
              className="small"
              variant="outlined"
              sx={{
                marginLeft: '10px',
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
                color: '#6B7280',
              }}
            >
              Cancel
            </Button>
            <Button
              className="small"
              variant="contained"
              sx={{ marginLeft: '10px' }}
              onClick={() => router?.back()}
            >
              Save Template
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default CreateTemplate;
