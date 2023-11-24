import { Box, Divider, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { ArrowLeftIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { sideData, articleEditorData } from './ViewArticlesDetail.data';
import { styles } from './ViewArticlesDetail.style';
import { useViewArticlesDetail } from './useViewArticlesDetail';

export const ViewArticlesDetail = () => {
  const {
    theme,
    handlePageBack,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleEditSubmit,
  } = useViewArticlesDetail();
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
          <div
            dangerouslySetInnerHTML={{
              __html: articleEditorData ? articleEditorData : '',
            }}
          ></div>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box sx={styles?.sideStyle(theme)}>
            <Box>
              {sideData?.map((item: any) => (
                <Grid
                  container
                  key={uuidv4()}
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
                      key={uuidv4()}
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
                          key={uuidv4()}
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
