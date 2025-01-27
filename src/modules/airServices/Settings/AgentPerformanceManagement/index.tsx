import { Typography } from '@mui/material';
import { agentPerformanceManagement } from './AgentPerformanceManagement';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const AgentPerformanceManagement = () => {
  return (
    <>
      <Typography variant="h3">
        Agent Productivity & Workload Management
      </Typography>
      <br />
      <ContainerGrid spacing={3}>
        {agentPerformanceManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <CustomGrid md={6} lg={4}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
                itemPurpose={item?.purpose}
                display="block"
                itemTypeFontSize="h6"
                avatarVariant="circular"
                avatarSize={{ width: 56, height: 56 }}
                textAlign="center"
                avatarMargin="auto"
                marginY={1.2}
              />
            </CustomGrid>
          </PermissionsGuard>
        ))}
      </ContainerGrid>
    </>
  );
};
