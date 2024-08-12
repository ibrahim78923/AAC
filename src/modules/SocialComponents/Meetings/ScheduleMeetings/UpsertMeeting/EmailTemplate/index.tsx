import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { AddWhiteBgIcon } from '@/assets/icons';
import { useEmilTemplate } from './useEmailTemplate';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { SOCIAL_COMPONENTS } from '@/constants';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const EmailTemplate = () => {
  const {
    router,
    handleMoveCreateEmail,
    dropdownOptions,
    meetingsEmailData,
    isLoading,
    isFetching,
  } = useEmilTemplate();
  if (isLoading || isFetching) {
    return <SkeletonForm />;
  }
  return (
    <Box>
      <PageTitledHeader
        title={`All Template`}
        canMovedBack
        moveBack={() => router?.basePath}
      >
        <Search label="Search Here" setSearchBy={() => {}} />
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          onClick={handleMoveCreateEmail}
        >
          Create New Template
        </Button>
      </PageTitledHeader>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {meetingsEmailData?.map((item: any) => (
          <Grid key={item?.id} item lg={4} md={6} xs={12}>
            <Card
              sx={{
                borderRadius: '12px',
                border: '1px solid grey',
                overflow: 'hidden',
              }}
            >
              <CardContent
                sx={{
                  padding: '10px 20px',
                  backgroundColor: 'custom.light_gray_bg',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    padding: '16px',
                    backgroundColor: 'common.white',
                    minHeight: '230px',
                    maxHeight: '300px',
                    width: '70%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="body3"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 8,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    <Box
                      dangerouslySetInnerHTML={{ __html: item?.paragraph }}
                    />
                  </Typography>
                </Box>
              </CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                mt={2}
                px={1}
              >
                <Typography variant="body2" fontWeight={600}>
                  Employee Email
                </Typography>
                <SingleDropdownButton
                  dropdownOptions={dropdownOptions}
                  dropdownName={<MoreVert />}
                  hasEndIcon={false}
                  btnVariant="text"
                />
              </Stack>
              <CardActions>
                <Button
                  className="small"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    router?.push(
                      `${SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE}`,
                    )
                  }
                >
                  <Typography variant="body3" fontWeight={400}>
                    Use this Template
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmailTemplate;
