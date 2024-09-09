import { Grid } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { SingleFolderDetail } from '../Folder/SingleFolderDetail';
import { Folder } from '../Folder';
import { Header } from './Header';
import { ArticlesLists } from './ArticlesList';

export const Articles = () => {
  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.ARTICLE_LIST_VIEW,
        ]}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3} xl={1.75}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
              ]}
            >
              <Folder />
            </PermissionsGuard>
          </Grid>
          <Grid item xs={12} lg={9} xl={10.25}>
            <SingleFolderDetail />
            <Header />
            <br />
            <ArticlesLists />
          </Grid>
        </Grid>
      </PermissionsGuard>
    </>
  );
};
