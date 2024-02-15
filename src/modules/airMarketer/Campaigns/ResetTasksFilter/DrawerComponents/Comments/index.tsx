import { FormProvider, RHFEditor } from '@/components/ReactHookForm';
import {
  Grid,
  Box,
  Stack,
  Avatar,
  Typography,
  Card,
  Button,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { dataArray, defaultValues, validationSchema } from './Comments.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { ReplyDoubleArrowIcon } from '@/assets/icons';
import { ArrowBack, Done, MoreHoriz } from '@mui/icons-material';

import { useState } from 'react';

export default function Comments({ initialValueProps = defaultValues }: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });
  const theme = useTheme();
  const [viewAllComments, setViewAllComments] = useState(false);
  const AvatarImg =
    'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png';
  //  commeted for future use
  // const { handleSubmit } = methods;

  // const onSubmit = async (data: any) => {};

  return (
    <Box mt={1}>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {dataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>

        {/* comments section start here*/}
        <Card sx={{ padding: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" gap={2}>
              <Avatar src={AvatarImg} sx={{ width: 48, height: 48 }} />
              <Box>
                <Typography variant="body1">Olivia Rhye</Typography>
                <Typography variant="body3">
                  Today at 2:25AM(22-02-2023)
                </Typography>
              </Box>
            </Stack>

            <MoreHoriz
              sx={{ color: theme?.palette?.custom?.steel_blue_alpha }}
            />
          </Stack>
          <Stack
            direction={{ md: 'row' }}
            justifyContent="space-between"
            ml={6}
          >
            <Box>
              <Button
                className="small"
                onClick={() => {
                  setViewAllComments(true);
                }}
              >
                View 10 Replies
              </Button>
              <Button
                className="small"
                startIcon={<ReplyDoubleArrowIcon />}
                onClick={() => {
                  setViewAllComments(true);
                }}
              >
                reply
              </Button>
            </Box>
            {viewAllComments && (
              <Button
                className="small"
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={() => {
                  setViewAllComments(false);
                }}
              >
                Show Less
              </Button>
            )}
          </Stack>
        </Card>

        {viewAllComments && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
              <Card
                sx={{
                  padding: 1,
                  background: theme?.palette?.grey[100],
                  mt: 2,
                  width: '400px',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" gap={2}>
                    <Avatar src={AvatarImg} sx={{ width: 32, height: 32 }} />
                    <Stack direction="row">
                      <Typography variant="body1">Matt</Typography>
                      <Typography variant="body3">Today at 2:25AM</Typography>
                    </Stack>
                  </Stack>
                  <Box>
                    <MoreHoriz
                      sx={{ color: theme?.palette?.custom?.steel_blue_alpha }}
                    />
                    <Done
                      sx={{ color: theme?.palette?.custom?.steel_blue_alpha }}
                    />
                  </Box>
                </Stack>
                <Typography variant="body3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </Typography>
                <Box>
                  <Button
                    className="small"
                    startIcon={<ReplyDoubleArrowIcon />}
                  >
                    1 reply
                  </Button>
                </Box>
              </Card>
            </Box>
            <RHFEditor name="editor" />
          </>
        )}
      </FormProvider>
    </Box>
  );
}
