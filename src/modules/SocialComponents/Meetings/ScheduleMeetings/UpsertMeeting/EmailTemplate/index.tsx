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
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { templateDropdownFunction } from './EmailTemplate.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { TemplateDeleteModal } from './TemplateDeleteModal';
import { MeetingDataI } from './EmailTemplate.interface';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

const EmailTemplate = () => {
  const {
    router,
    handleMoveCreateEmail,
    meetingsEmailData,
    isLoading,
    isFetching,
    setSearch,
    isError,
    refetch,
    meetingId,
    moduleId,
    submitDeleteModal,
    setDeleteModal,
    deleteModal,
    deleteMeetingsTrigger,
    theme,
    moduleType,
    type,
  } = useEmilTemplate();
  return (
    <Box>
      <PageTitledHeader
        title={`All Template`}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
            query: {
              type: router?.query?.type,
              id: router?.query?.meetingId,
              ...(moduleId && { moduleId }),
              ...(moduleType && { moduleType }),
            },
          })
        }
      >
        <Search label="Search Here" setSearchBy={setSearch} />
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          onClick={handleMoveCreateEmail}
          className="small"
        >
          Create New Template
        </Button>
      </PageTitledHeader>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD}
        hasError={isError}
        refreshApi={refetch}
        hasNoData={!meetingsEmailData?.length}
        noDataMessage="No email template found"
      >
        <Grid container spacing={2} sx={{ display: 'flex' }}>
          {meetingsEmailData?.map((item: MeetingDataI) => (
            <Grid key={item?._id} item lg={4} md={6} xs={12}>
              <Card
                sx={{
                  borderRadius: '12px',
                  border: `1px solid ${theme?.palette?.grey[800]}`,
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
                      maxHeight: '230px',
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
                        dangerouslySetInnerHTML={{
                          __html: item?.paragraph,
                        }}
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
                    dropdownOptions={templateDropdownFunction(
                      item,
                      router,
                      meetingId,
                      moduleId,
                      setDeleteModal,
                      moduleType,
                    )}
                    dropdownName={<MoreVert />}
                    hasEndIcon={false}
                    btnVariant="text"
                  />
                </Stack>
                <CardActions sx={{ pb: 2 }}>
                  <Button
                    className="small"
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      router?.push({
                        pathname: SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE,
                        query: {
                          type,
                          meetingId,
                          ...(moduleId && { moduleId }),
                          ...(moduleType && { moduleType }),
                          templateId: item?._id,
                          templateType: GENERIC_UPSERT_FORM_CONSTANT?.USE,
                        },
                      })
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
      </ApiRequestFlow>
      {deleteModal && (
        <TemplateDeleteModal
          message={'Are you sure you want to delete this entry?'}
          open={deleteModal?.isOpen ?? false}
          handleClose={() => {
            setDeleteModal({});
          }}
          submitDeleteModal={submitDeleteModal}
          deleteMeetingsStatus={deleteMeetingsTrigger}
        />
      )}
    </Box>
  );
};

export default EmailTemplate;
