import React from 'react';
import {
  Typography,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
} from '@mui/material';
import { styles } from '../KnowledgeInsights.style';
import { v4 as uuidv4 } from 'uuid';
import { ViewDetailBackArrowIcon } from '@/assets/icons';

export const TicketRelated = ({
  getRelatedDataArray,
  setTicketRelatedToggler,
}: any) => {
  const theme = useTheme();

  return (
    <>
      {getRelatedDataArray?.map((item: any) => (
        <React.Fragment key={uuidv4()}>
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setTicketRelatedToggler(true)}
            >
              <ViewDetailBackArrowIcon />
            </Box>
            <Typography variant="h5" py={'1rem'}>
              {item?.mainTitle}
            </Typography>
          </Box>
          <Grid container position={'relative'} overflow={'scroll'}>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Agent</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell>Created on</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.relatedData?.map((relatedData: any) => (
                    <TableRow key={uuidv4()}>
                      <TableCell sx={styles?.insightsItemsStyles}>
                        <Box display={'flex'}>
                          <Typography
                            variant="body4"
                            color={theme?.palette?.info?.main}
                          >
                            {relatedData?.subjectDetail}
                          </Typography>
                          <Typography variant="body2" ml={'.5rem'}>
                            {relatedData?.subjectDetailNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={styles?.mentionsItemsStyles}>
                        <Typography variant="body4">
                          {relatedData?.agentDetail}
                        </Typography>
                      </TableCell>
                      <TableCell sx={styles?.mentionsItemsStyles}>
                        <Typography variant="body4">
                          {relatedData?.groupDetail}
                        </Typography>
                      </TableCell>
                      <TableCell sx={styles?.mentionsItemsStyles}>
                        <Typography variant="body4">
                          {relatedData?.createdOnDetail}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};
