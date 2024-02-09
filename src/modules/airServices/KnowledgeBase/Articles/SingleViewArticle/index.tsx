import { Box, Divider, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { ArrowLeftIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { styles } from './SingleViewArticle.style';
import { useSingleViewArticle } from './useSingleViewArticle';
import { sideData } from './SingleViewArticle.data';

export const SingleViewArticle = () => {
  const {
    theme,
    handlePageBack,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleEditSubmit,
    data,
    // isLoading,
    // isFetching,
    // isError,
  } = useSingleViewArticle();
  return (
    <>
      <Grid container spacing={1} justifyContent={'space-between'}>
        <Grid item xs={12} lg={8.9}>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2.5}
            gap={1.4}
          >
            <Box
              onClick={handlePageBack}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: 'pointer' }}
            >
              <ArrowLeftIcon />
            </Box>
            <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
              View Article
            </Typography>
          </Box>
          <div dangerouslySetInnerHTML={{ __html: data?.data?.details }}></div>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box sx={styles?.sideStyle(theme)}>
            <Box>
              {sideData?.(data?.data)?.map((item: any) => (
                <Grid
                  container
                  key={item?._id}
                  flexDirection={'column'}
                  spacing={1.5}
                  mt={2}
                >
                  <Grid item>
                    <Typography variant="body2" fontWeight={500}>
                      {item?.heading}
                    </Typography>
                  </Grid>
                  {item?.details?.map((ele: any) => (
                    <Grid
                      item
                      key={ele?._id}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Typography
                        variant="body3"
                        color={theme?.palette?.grey?.[600]}
                      >
                        {ele?.title}
                      </Typography>
                      <Typography
                        variant="body4"
                        sx={styles?.desStyle(ele?.des, theme)}
                      >
                        {ele?.des}
                      </Typography>
                    </Grid>
                  ))}
                  {item?.keyword && (
                    <Grid item display={'flex'} flexWrap={'wrap'} gap={1}>
                      {item?.keyword?.map((i: any) => (
                        <Typography
                          key={i?._id}
                          variant="body2"
                          sx={styles?.keywordStyle(theme)}
                        >
                          {<FiberManualRecordSharpIcon fontSize={'inherit'} />}
                          {i}
                        </Typography>
                      ))}
                    </Grid>
                  )}
                  <Divider sx={{ mt: 2 }} />
                </Grid>
              ))}
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleEditSubmit}
                fullWidth
              >
                Edit
              </LoadingButton>
              <LoadingButton
                variant="text"
                color="error"
                onClick={() => setOpenDelete(true)}
                fullWidth
              >
                Delete
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AlertModals
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        type="delete"
        message="Are you sure you want to delete?"
        handleSubmitBtn={handleDeleteSubmit}
        cancelBtnText="Cancel"
        submitBtnText="Delete"
      />
    </>
  );
};
