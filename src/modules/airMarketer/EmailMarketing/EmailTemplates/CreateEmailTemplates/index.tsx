import { Box, Divider, Grid, Typography } from '@mui/material';
import { styles } from './CreateTemplatesForm.style';
import InnerTab from './InnerTab';
import {
  customersAttributesArray,
  sideBarMenuArray,
} from './CreateTemplatesForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateTemplatesForm';

const CreateTemplatesForm = () => {
  const { addField, dynamicFields, deleteField, setDynamicFields, theme } =
    useCreateForm();

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={8} lg={12}>
          <Typography>
            {' '}
            GiftCard | Loyalty Token | Credits | Voucher{' '}
          </Typography>
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

            {customersAttributesArray?.map((item: any, index: any) => (
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
                <Box sx={styles?.iconBoxStyling}>
                  {index === 3 ? (
                    <>
                      <Box
                        sx={{
                          background: '#D9D9D9',
                          width: '25%',
                          height: '20px',
                        }}
                      >
                        {' '}
                      </Box>
                      <Box
                        sx={{
                          background: '#D9D9D9',
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
                          background: '#D9D9D9',
                          width:
                            index === 0 ? '100%' : index === 1 ? '50%' : '33%',
                          height: '20px',
                          marginLeft: index !== 0 ? '2px' : '0',
                        }}
                      ></Box>
                    ))
                  )}
                </Box>
                {/* {item?.icon} */}
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
