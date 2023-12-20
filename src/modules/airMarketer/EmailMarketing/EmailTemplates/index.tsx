import React from 'react';
import DotsBold from '@/assets/icons/modules/airMarketer/SocialInbox/dots-bold';
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
import { templatesCardsArray } from './EmailTemplates.data';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const EmailTemplates = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {templatesCardsArray?.map((item: any) => (
          <Grid key={uuidv4()} item lg={4} md={6} xs={12}>
            <Card
              sx={{
                borderRadius: '12px',
                border: ' 1px solid var(--Stroke-Color-200, #E5E7EB)',
              }}
            >
              <Box
                sx={{
                  background: 'var(--TextColor-100, #F3F4F6)',
                  display: 'flex',
                }}
              >
                <Image
                  src={item?.image}
                  alt="gaga"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              </Box>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body3" fontWeight={600}>
                    {item?.title}
                  </Typography>
                  <DotsBold />
                </Stack>
              </CardContent>
              <CardActions>
                <Button className="small" fullWidth variant="contained">
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

export default EmailTemplates;
