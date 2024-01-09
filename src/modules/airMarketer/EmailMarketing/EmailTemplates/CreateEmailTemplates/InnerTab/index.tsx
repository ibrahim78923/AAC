import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Theme,
  Divider,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateTemplatesForm.style';
import {
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateTemplatesForm.data';
import { useState } from 'react';
import { BackArrowIcon, DeleteIcon, DragSharedIcon } from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';

import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

const InnerTab = ({ dynamicFields, deleteField }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const router = useRouter();
  const theme = useTheme<Theme>();
  const dynamicallyFormForm = useForm({
    resolver: yupResolver(dynamicallyFormValidationSchema),
    defaultValues: dynamicallyFormDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = dynamicallyFormForm;

  return (
    <Box sx={styles?.subDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={4} lg={6}>
          <Box display={'flex'} alignContent={'center'}>
            <Button
              className="small"
              sx={{ color: '#374151', fontWeight: '500' }}
              startIcon={<BackArrowIcon />}
              onClick={() => router?.push(AIR_MARKETER.EMAIL_TEMPLATES)}
            ></Button>
            <Typography variant="h5"> Employee Email</Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ paddingTop: '0px !important', textAlign: 'end' }}
        >
          <Button
            variant="outlined"
            className="small"
            sx={{ marginLeft: '15px' }}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            className="small"
            sx={{ marginLeft: '15px' }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      {isNullOrEmpty(dynamicFields) && (
        <Box
          sx={{
            border: '3px dotted #b9b9b9',
            marginTop: '60px',
            padding: '50px',
            borderRadius: '5px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: theme?.palette?.custom?.dark_grey,
            }}
          >
            Please Create your Form from side bar menu selection.
          </Typography>
        </Box>
      )}
      <FormProvider
        methods={dynamicallyFormForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={4} sx={{ marginTop: '0px' }}>
          {dynamicFields?.map((item: any, index: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              sx={{
                padding: '30px !important',
                marginLeft: '40px !important',
                position: 'relative',
                cursor: 'pointer',
                border: `1px solid ${
                  hoveredIndex === index
                    ? theme?.palette?.primary?.main
                    : 'white'
                }`,
                borderRadius: '5px',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <Box sx={styles?.hoverEffect}>
                  <DragSharedIcon />
                  <Box
                    onClick={() => {
                      deleteField(index);
                    }}
                  >
                    {' '}
                    <DeleteIcon />
                  </Box>
                </Box>
              )}
              {item?.componentProps?.button && (
                <Button variant="contained">
                  {item?.componentProps?.text}
                </Button>
              )}
              {item?.componentProps?.Divider && (
                <Divider
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.light_gray_color}`,
                  }}
                />
              )}
              <item.component
                {...item?.componentProps}
                size={'small'}
              ></item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default InnerTab;
