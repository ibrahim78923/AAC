import { Box } from '@mui/material';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { CustomButton } from '@/components/Buttons/CustomButton';

export const Header = () => {
  const {
    articlesActionDropdown,
    setArticleSearch,
    openArticleFilterPortal,
    selectedArticlesList,
  } = useHeader();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      gap={1}
      flexWrap={'wrap'}
      alignItems={'center'}
    >
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
        ]}
      >
        <Search label="Search Here" setSearchBy={setArticleSearch} />
      </PermissionsGuard>
      <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW_ACTIONS
          }
        >
          <SingleDropdownButton
            disabled={!!!selectedArticlesList?.length}
            dropdownOptions={articlesActionDropdown}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <CustomButton onClick={openArticleFilterPortal}>Filter</CustomButton>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
