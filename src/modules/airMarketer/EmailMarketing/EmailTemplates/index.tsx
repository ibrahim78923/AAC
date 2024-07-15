import React, { useState } from 'react';
import DotsBold from '@/assets/icons/modules/airMarketer/SocialInbox/dots-bold';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  useDeleteEmailTemplatesMutation,
  useGetEmailTemplatesQuery,
} from '@/services/airMarketer/emailTemplates';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { generateHTML } from '@/utils/emailTemplate';
import { API_STATUS } from '@/constants';

const EmailTemplates = () => {
  const [search, setSearch] = useState<any>();

  const router = useRouter();

  const { data, status } = useGetEmailTemplatesQuery({
    params: { ...(search?.length && { search: search }) },
  });

  return (
    <Box>
      <Stack spacing={2} sx={{ paddingTop: '8px !important', mb: '2rem' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h5">All Template</Typography>
          <Stack
            spacing={2}
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS.SEARCH_TEMPLATE,
              ]}
            >
              <Search
                size="small"
                label="Search Here"
                searchBy={search}
                setSearchBy={setSearch}
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS.CREATE_NEW_TEMPLATE,
              ]}
            >
              <Button
                variant="contained"
                className="small"
                startIcon={<PlusIcon />}
                onClick={() =>
                  router.push(`${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`)
                }
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Create New Template
              </Button>
            </PermissionsGuard>
          </Stack>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ display: 'flex' }}>
        {status === API_STATUS?.PENDING ? (
          <>
            {[1, 2, 3, 4]?.map(() => (
              <Grid item lg={4} md={6} xs={12} key={uuidv4()}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    height: '327px',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: '100%' }}
                    height={200}
                  />
                  <Box sx={{ p: 1 }}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1.5rem', mt: 0.5 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{ width: '100%', mt: 2.5 }}
                      height={40}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {data?.data?.emailtemplates.length ? (
              data?.data?.emailtemplates?.map((item: any) => (
                <TemplateCard key={uuidv4()} item={item} />
              ))
            ) : (
              <Box
                sx={{
                  height: '20vh',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No records found
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

const TemplateCard = ({ item }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handelNavigate = () => {
    router.push({
      pathname: `${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`,
      query: { id: item?._id },
    });
  };

  const theme = useTheme();

  const [deleteEmailTemplate, { isLoading }] =
    useDeleteEmailTemplatesMutation();
  const handelDelete = async () => {
    try {
      await deleteEmailTemplate({
        id: item?._id,
      })?.unwrap();
      enqueueSnackbar('Template deleted successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
    }
  };

  const generatedHTML = generateHTML(item?.data, true);

  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card
        sx={{
          borderRadius: '12px',
        }}
      >
        <Box
          sx={{
            background: theme?.palette?.custom?.light_gray_bg,
            display: 'flex',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              width: '80%',
              height: '300px',
              background: theme?.palette?.common?.white,
              margin: '0 auto',
              padding: '10px 20px',
              borderRadius: '8px',
              pointerEvents: 'none',
              fontSize: '10px',
              overflow: 'auto',
            }}
          >
            <Box dangerouslySetInnerHTML={{ __html: generatedHTML }} />
          </Box>
        </Box>
        <CardContent sx={{ padding: '20px' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body3" fontWeight={600}>
              {item?.name}
            </Typography>
            <Button
              id="basic-button"
              aria-controls={'basic-menu'}
              aria-haspopup="true"
              aria-expanded={'true'}
              color="inherit"
              onClick={handleActionsMenuClick}
              sx={{ height: 'fit-Content', minWidth: '5px' }}
            >
              <DotsBold />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleActionsMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS?.EDIT_TEMPLATE,
                ]}
              >
                <MenuItem onClick={handelNavigate}>Edit</MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS?.DELETE_TEMPLATE,
                ]}
              >
                <MenuItem
                  sx={{ color: theme?.palette?.error?.main }}
                  onClick={() => {
                    setIsDeleteModal(true);
                    handleActionsMenuClose;
                  }}
                >
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>
          </Stack>
        </CardContent>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS?.USE_TEMPLATE,
          ]}
        >
          <CardActions>
            <Button
              className="small"
              fullWidth
              variant="contained"
              onClick={() =>
                router.push({
                  pathname: `${AIR_MARKETER?.CREATE_EMAIL_TEMPLATES}`,
                  query: { id: item?._id, send: true },
                })
              }
            >
              <Typography variant="body3" fontWeight={400}>
                Use this Template
              </Typography>
            </Button>
          </CardActions>
        </PermissionsGuard>
      </Card>
      <AlertModals
        message={'Are you sure you want to delete this template?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={handelDelete}
        loading={isLoading}
      />
    </Grid>
  );
};

export default EmailTemplates;
