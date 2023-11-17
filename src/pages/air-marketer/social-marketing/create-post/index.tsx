import React from 'react';
import Layout from '@/layout';
import CreatePost from '@/modules/airMarketer/SocialMarketing/CreatePost';

const AirMarketerCreatePostPage = () => {
  return <CreatePost />;
};

export default AirMarketerCreatePostPage;

AirMarketerCreatePostPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
