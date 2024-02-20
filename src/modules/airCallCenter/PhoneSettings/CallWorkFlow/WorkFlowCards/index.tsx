import { Card, Grid, Stack, Typography } from '@mui/material';
import { workflowCardArr } from './WrokFlow.data';
import { TimmerIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const WorkFlowCard = () => {
  const navigate = useRouter();
  return (
    <Grid container spacing={2}>
      {workflowCardArr?.map((item: any) => (
        <Grid item xs={12} sm={6} lg={4} key={uuidv4()}>
          <Card
            sx={{ p: 1, cursor: 'pointer' }}
            onClick={() => {
              navigate?.push(item?.link);
            }}
          >
            <Stack direction="row" gap={1}>
              <TimmerIcon />
              <Typography variant="body1" fontWeight={500}>
                {item?.title}
              </Typography>
            </Stack>
            <Typography variant="body3" color="text.secondary">
              {item?.desc}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WorkFlowCard;
