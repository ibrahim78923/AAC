import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const RolesAndPermissions = () => {
  return (
    <>
      <Typography variant="h4">
        Agents and project members can be given these workload permissions via
        roles.
      </Typography>
      <Box pt={4}>
        <Box display={'flex'} alignItems="center" gap={1}>
          <Typography variant="body2">
            Manage all member&apos;s workload
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
            Manage all department member&apos;s workload
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
            Manage project member&apos;s workload
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
        <Box display={'flex'} gap={1} pt={2}>
          <VisibilityIcon color={'primary'} />
          <Typography color={'primary'}>View Roles and Permissions</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 24,
          bottom: 8,
          zIndex: 50,
        }}
      >
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </>
  );
};
