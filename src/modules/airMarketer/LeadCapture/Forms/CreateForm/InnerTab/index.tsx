import { Box, Button, Grid, Typography, useTheme, Theme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateForm.style';
import {
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateForm.data';
import { useState } from 'react';
import { DeleteIcon } from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';

const InnerTab = ({ showView, dynamicFields, deleteField }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme<Theme>();
  const dynamicallyFormForm = useForm({
    resolver: yupResolver(dynamicallyFormValidationSchema),
    defaultValues: dynamicallyFormDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = dynamicallyFormForm;

  return (
    <Box sx={styles.subDiv(showView)}>
      <Box sx={styles.innerBox}>
        {isNullOrEmpty(dynamicFields) && (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Please Create your Form from side bar menu selection.
          </Typography>
        )}
        <FormProvider
          methods={dynamicallyFormForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4} sx={{ marginTop: '-20px' }}>
            {dynamicFields?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{
                  padding: '10px !important',
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
                  <Box
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 1,
                    }}
                    onClick={() => {
                      deleteField(index);
                    }}
                  >
                    <DeleteIcon />
                  </Box>
                )}
                {item?.componentProps?.heading && (
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {item?.componentProps?.paragraph && (
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {item?.componentProps?.paragraph}
                  </Typography>
                )}
                {item?.componentProps?.button && (
                  <Button variant="contained">
                    {item?.componentProps?.text}
                  </Button>
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
    </Box>
  );
};

export default InnerTab;
