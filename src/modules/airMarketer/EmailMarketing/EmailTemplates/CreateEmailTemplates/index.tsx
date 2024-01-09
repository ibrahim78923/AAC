import { Box, Divider, Grid, Typography } from '@mui/material';
import { styles } from './CreateTemplatesForm.style';
import InnerTab from './InnerTab';
import {
  customersAttributesArray,
  headerArray,
  sideBarMenuArray,
} from './CreateTemplatesForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateTemplatesForm';

const CreateTemplatesForm = () => {
  const { addField, dynamicFields, deleteField, theme } = useCreateForm();

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container sx={styles.headerBar}>
        {headerArray?.map((item: any, index: any) => (
          <Grid item xs={6} md={4} lg={2} key={uuidv4()}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Box sx={styles.headerIcon(theme)}>
                {item?.icon}
                <Typography
                  variant="body2"
                  sx={{ marginLeft: '10px', fontWeight: '500' }}
                >
                  {item?.name}
                </Typography>
              </Box>
              {/* <Box sx={{ width:"2px", height: "100px", background: theme?.palette?.grey[700] }}></Box> */}
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  border:
                    index != 3 && `1px solid ${theme?.palette?.grey[700]}`,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6} lg={8}>
          <Box sx={{ width: '94%', margin: 'auto' }}>
            <InnerTab dynamicFields={dynamicFields} deleteField={deleteField} />
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
                onClick={() => addField(item?.type)}
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

            {customersAttributesArray?.map((item: any, index: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
                padding={'12px'}
                sx={styles.customField}
                key={uuidv4()}
                onClick={() => addField(item?.type)}
              >
                {item?.drag}
                <Box
                  sx={{
                    width: '2px',
                    height: '30px',
                    background: theme?.palette?.custom?.off_white_one,
                  }}
                ></Box>
                <Box sx={styles?.iconBoxStyling}>
                  {index === 3 ? (
                    <>
                      <Box
                        sx={{
                          background: theme?.palette?.custom?.light_gray_color,
                          width: '25%',
                          height: '20px',
                        }}
                      >
                        {' '}
                      </Box>
                      <Box
                        sx={{
                          background: theme?.palette?.custom?.light_gray_color,
                          width: '75%',
                          height: '20px',
                          marginLeft: '2px',
                        }}
                      >
                        {' '}
                      </Box>
                    </>
                  ) : (
                    Array.from({ length: index + 1 }).map(() => (
                      <Box
                        key={uuidv4()}
                        sx={{
                          background: theme?.palette?.custom?.light_gray_color,
                          width:
                            index === 0 ? '100%' : index === 1 ? '50%' : '33%',
                          height: '20px',
                          marginLeft: index !== 0 ? '2px' : '0',
                        }}
                      ></Box>
                    ))
                  )}
                </Box>
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
