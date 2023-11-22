import React from 'react';
import SocialPost from './SocialPost';
import Mailing from './Mailing';

const PostArea = () => {
  const postType = 'mail';
  const renderPostType = {
    post: <SocialPost />,
    mail: <Mailing />,
  };
  return <>{renderPostType[postType]}</>;
};

export default PostArea;
