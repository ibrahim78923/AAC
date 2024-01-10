import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useApprovals } from '../useApprovals';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';
import { allApprovalData } from './Approvals.data';
const AllApprovals = () => {
  const { theme, palette } = useApprovals();
  return (
    <Box my="0rem">
      {allApprovalData?.map(({ user, ...approval }: any) => (
        <Box
          key={uuidv4()}
          sx={{
            p: '0.75rem 1rem 0.5rem',
            background: palette?.grey?.[100],
            borderRadius: '0.75rem',
            border: `1px solid ${palette?.grey?.[700]}`,
            mb: 2,
          }}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              {' '}
              <Typography fontWeight={600} color={palette?.blue?.main}>
                Request for :
                <Typography
                  component={'span'}
                  variant="body2"
                  sx={{
                    fontSize: 12,
                    pl: '0.5rem',
                    color: palette?.blue?.main,
                  }}
                >{`${approval?.ticketNumber}, ${approval?.ticketTitle}`}</Typography>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: { xs: 'start', lg: 'center' },
                  gap: '0.75rem',
                  pt: '0.5rem',
                }}
              >
                <Avatar></Avatar>
                <Typography
                  color={palette?.blue?.light}
                >{`${user?.firstName} ${user?.lastName} sent approval request `}</Typography>
                <Box
                  sx={{
                    background: palette?.grey?.[700],
                    width: { xs: '100%', lg: '1.5px' },
                    height: { xs: '2px', lg: '1.5rem' },
                  }}
                />
                <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                  {approval?.requestTime}
                </Typography>
                <Box
                  sx={{
                    background: palette?.grey?.[700],
                    width: { xs: '100%', lg: '1.5px' },
                    height: { xs: '2px', lg: '1.5rem' },
                  }}
                />
                <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                  {approval?.device}
                </Typography>
              </Box>
            </Box>
            <Box>
              {approval?.status === '' ? (
                <Box gap={2} display={'flex'} mt={1}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme?.palette?.error?.main,
                      color: 'white',
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme?.palette?.success?.main,
                      color: 'white',
                    }}
                  >
                    Accept
                  </Button>
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    mt: '1rem',
                    color:
                      approval?.status === AGENT_REQUEST_STATUS?.APPROVED
                        ? theme?.palette?.primary?.main
                        : theme?.palette?.error?.main,
                  }}
                >
                  {approval?.status}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AllApprovals;
