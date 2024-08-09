import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { CardPropsI } from '../LeadsReports.interface';

const ReportCard = ({ title, value, isLoading }: CardPropsI) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '98px',
        border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
        mb: 1,
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '16px',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: theme?.palette?.custom?.steel_blue_alpha }}
          variant="h6"
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: theme?.palette?.custom?.turquoise_Blue,
            mb: 1.5,
          }}
        >
          {value}
        </Typography>
      </CardContent>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          }}
        >
          <Skeleton animation="wave" variant="rectangular" height={'100%'} />
        </Box>
      )}
    </Card>
  );
};

export default ReportCard;
