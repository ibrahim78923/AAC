import { Box, Divider, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { AIR_SERVICES } from '@/constants';
import Link from 'next/link';
import { RolesAndPermissionsDataArray } from './RolesAndPermissions.data';
import { Fragment } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export const RolesAndPermissions = () => {
  return (
    <>
      <Typography variant={'h6'} color={'secondary.main'}>
        Agents and project members can be given these workload permissions via
        roles.
      </Typography>

      <Box mt={4}>
        {RolesAndPermissionsDataArray?.map((item) => (
          <Fragment key={item?.id}>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Typography
                variant={'body2'}
                fontWeight={500}
                color={'custom.steel_blue_alpha'}
              >
                {item?.title}
              </Typography>
              <Tooltip
                title={
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'body3'} fontWeight={500}>
                      {item?.tooltipTitle}
                    </Typography>
                    <Typography variant={'body3'}>
                      {item?.description}
                    </Typography>
                  </Box>
                }
              >
                <ErrorIcon color="primary" />
              </Tooltip>
            </Box>
            <Divider style={{ margin: '1rem 0' }} />
          </Fragment>
        ))}

        <Link
          href={AIR_SERVICES?.USER_ROLES_SETTINGS}
          style={{ display: 'block', width: 'max-content' }}
        >
          <Box display={'flex'} alignItems={'center'} gap={0.5}>
            <RemoveRedEyeOutlinedIcon color={'primary'} fontSize={'small'} />
            <Typography color={'primary.main'} variant={'body3'}>
              View Roles and Permissions
            </Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
};
