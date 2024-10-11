import { Box, Button } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';

const { SEARCH_AND_FILTER } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};
const { AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW_ACTIONS } = Permissions ?? {};

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
      <PermissionsGuard permissions={[SEARCH_AND_FILTER]}>
        <Search label="Search Here" setSearchBy={setArticleSearch} />
      </PermissionsGuard>
      <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
        <PermissionsGuard
          permissions={AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW_ACTIONS}
        >
          <SingleDropdownButton
            disabled={!!!selectedArticlesList?.length}
            dropdownOptions={articlesActionDropdown}
          />
        </PermissionsGuard>
        <PermissionsGuard permissions={[SEARCH_AND_FILTER]}>
          <Button
            className="small"
            variant="outlined"
            size="large"
            startIcon={<FilterIcon />}
            color="secondary"
            onClick={openArticleFilterPortal}
          >
            Filter
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
