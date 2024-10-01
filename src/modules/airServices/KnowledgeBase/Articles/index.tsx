import { Grid } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { SingleFolderDetail } from '../Folder/SingleFolderDetail';
import { Folder } from '../Folder';
import { Header } from './Header';
import { ArticlesLists } from './ArticlesList';
import { resetComponentState } from '@/redux/slices/airServices/knowledge-base/slice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';

const { ARTICLE_LIST_VIEW } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS ?? {};

export const Articles = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3} xl={1.75}>
          <Folder />
        </Grid>
        <Grid item xs={12} lg={9} xl={10.25}>
          <SingleFolderDetail />
          <PermissionsGuard permissions={[ARTICLE_LIST_VIEW]}>
            <Header />
            <br />
            <ArticlesLists />
          </PermissionsGuard>
        </Grid>
      </Grid>
    </>
  );
};
