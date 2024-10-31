import { Grid } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { SingleFolderDetail } from '../Folder/SingleFolderDetail';
import { Folder } from '../Folder';
import { Header } from './Header';
import { ArticlesLists } from './ArticlesList';
import {
  resetComponentState,
  resetSelectedFolder,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';

export const Articles = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleRouteChangeStart = (url: any) => {
      if (url?.includes(AIR_SERVICES?.KNOWLEDGE_BASE)) return;
      dispatch(resetSelectedFolder());
    };

    router?.events?.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router?.events?.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router?.events]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3} xl={1.75}>
          <Folder />
        </Grid>
        <Grid item xs={12} lg={9} xl={10.25}>
          <SingleFolderDetail />
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.ARTICLE_LIST_VIEW,
            ]}
          >
            <Header />
            <br />
            <ArticlesLists />
          </PermissionsGuard>
        </Grid>
      </Grid>
    </>
  );
};
