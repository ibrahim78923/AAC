import { Box, Typography, Theme, useTheme } from '@mui/material';
import OrganizationCard from './OrganizationSubFolder/OrganizationCard';
import OrganizationTable from './OrganizationSubFolder/OrganizationTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_ORGANIZATION_PERMISSIONS } from '@/constants/permission-keys';

const Organization = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        sx={{
          background: `${theme?.palette?.common?.white}`,
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            padding: '0.7rem',
          }}
        >
          <Typography variant="h3" mb={1}>
            Organisation
          </Typography>
          <OrganizationCard />
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_ORGANIZATION_PERMISSIONS?.COMPANY_ACCOUNT_LIST,
            ]}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              Company Accounts
            </Typography>
            <OrganizationTable />
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};

export default Organization;
