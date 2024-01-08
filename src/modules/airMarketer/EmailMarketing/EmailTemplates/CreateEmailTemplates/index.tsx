import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { styles } from './CreateTemplatesForm.style';
import { BackArrowIcon } from '@/assets/icons';
import InnerTab from './InnerTab';
import {
  customersAttributesArray,
  sideBarMenuArray,
} from './CreateTemplatesForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateTemplatesForm';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateTemplatesForm = () => {
  const {
    router,
    addField,
    dynamicFields,
    deleteField,
    setDynamicFields,
    theme,
  } = useCreateForm();

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={4} lg={3}>
          <Button
            className="small"
            sx={{ color: '#374151', marginRight: '20px', fontWeight: '500' }}
            startIcon={<BackArrowIcon />}
            onClick={() => router?.push(AIR_MARKETER.EMAIL_TEMPLATES)}
          >
            {' '}
            Arrow
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6} lg={8}>
          <Box sx={{ width: '94%', margin: 'auto' }}>
            <InnerTab
              dynamicFields={dynamicFields}
              deleteField={deleteField}
              setDynamicFields={setDynamicFields}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={styles.formSideBar}>
            <Typography variant="h5">Content</Typography>

            {sideBarMenuArray?.map((item: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
                padding={'12px'}
                sx={styles.customField}
                key={uuidv4()}
                onClick={() => addField(item?.type, item?.name)}
              >
                {item?.drag}
                <Box
                  sx={{
                    width: '2px',
                    height: '30px',
                    background: theme?.palette?.custom?.off_white_one,
                  }}
                ></Box>
                <Box sx={styles?.iconBoxStyling}>{item?.icon}</Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: theme?.palette?.secondary?.main }}
                  >
                    {item?.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.custom?.dark }}
                  >
                    {item?.paragraph}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Divider sx={{ marginY: '20px' }} />

            <Typography variant="h5" sx={{ fontWeight: '600' }}>
              Layouts
            </Typography>

            {customersAttributesArray?.map((item: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
                padding={'12px'}
                sx={styles.customField}
                key={uuidv4()}
                onClick={() => addField(item?.type, item?.name)}
              >
                {item?.drag}
                <Box
                  sx={{
                    width: '2px',
                    height: '30px',
                    background: theme?.palette?.custom?.off_white_one,
                  }}
                ></Box>
                {item?.icon}
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.secondary?.main }}
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateTemplatesForm;
