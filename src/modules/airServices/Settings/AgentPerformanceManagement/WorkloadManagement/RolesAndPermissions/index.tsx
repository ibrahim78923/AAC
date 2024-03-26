import { Box, Divider, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AIR_SERVICES } from '@/constants';
import Link from 'next/link';

export const RolesAndPermissions = () => {
  return (
    <>
      <Typography variant="h4">
        Agents and project members can be given these workload permissions via
        roles.
      </Typography>
      <Box pt={4}>
        <Box display={'flex'} alignItems="center" gap={1}>
          <Typography variant="body2">{`Manage all member's workload`}</Typography>
          <Tooltip
            title={
              <Box>
                <h3>Agent</h3>
                <Typography>
                  Agents can manage the workload of all members in their
                  assigned roles
                </Typography>
              </Box>
            }
          >
            <ErrorIcon color="primary" />
          </Tooltip>
        </Box>
        <Divider variant="middle" style={{ margin: '1rem 0' }} />
        <Box display={'flex'} alignItems="center" gap={1}>
          <Typography variant="body2">
            {`Manage all department member's workload`}
          </Typography>
          <Tooltip
            title={
              <Box>
                <h3>Agent</h3>
                <Typography>
                  Agents can manage the workload of all members in their
                  assigned roles
                </Typography>
              </Box>
            }
          >
            <ErrorIcon color="primary" />
          </Tooltip>
        </Box>
        <Divider variant="middle" style={{ margin: '1rem 0' }} />
        <Box display={'flex'} alignItems="center" gap={1}>
          <Typography variant="body2">
            {`Manage project member's workload`}
          </Typography>
          <Tooltip
            title={
              <Box>
                <h3>Agent</h3>
                <Typography>
                  Agents can manage the workload of all members in their
                  assigned roles
                </Typography>
              </Box>
            }
          >
            <ErrorIcon color="primary" />
          </Tooltip>
        </Box>
        <Divider variant="middle" style={{ margin: '1rem 0' }} />
        <Link href={AIR_SERVICES?.USER_ROLES_SETTINGS}>
          <Box display={'flex'} alignItems={'center'} gap={1} mt={2}>
            <VisibilityIcon color={'primary'} />
            <Typography color={'primary'}>
              View Roles and Permissions
            </Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
};
