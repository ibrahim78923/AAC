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
import { templatesCardsArray } from './EmailTemplate.data';
import Image from 'next/image';
import { SingleSelection } from '@/components/DynamicFormModals';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { AddWhiteBgIcon } from '@/assets/icons';
import { useEmilTemplate } from './useEmailTemplate';
import { SOCIAL_COMPONENTS } from '@/constants';

const EmailTemplate = () => {
  const {
    router,
    handleMoveBackMeeting,
    handleMoveCreateEmail,
    dropdownOptions,
  } = useEmilTemplate();
  return (
    <Box>
      <PageTitledHeader
        title={`All Template`}
        canMovedBack
        moveBack={handleMoveBackMeeting}
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
        {templatesCardsArray?.map((item: any) => (
          <Grid key={item?.id} item lg={4} md={6} xs={12}>
            <Card
              sx={{
                borderRadius: '12px',
                border: ' 1px solid grey.700',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'custom.light_gray_bg',
                  display: 'flex',
                }}
              >
                <Image
                  src={item?.image}
                  alt="gaga"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              </Box>
              <CardContent sx={{ padding: '20px' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body3" fontWeight={600}>
                    {item?.title}
                  </Typography>
                  <SingleSelection />
                  <SingleDropdownButton
                    dropdownOptions={dropdownOptions}
                    dropdownName={<MoreVert />}
                    hasEndIcon={false}
                    btnVariant="text"
                  />
                </Stack>
              </CardContent>
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
