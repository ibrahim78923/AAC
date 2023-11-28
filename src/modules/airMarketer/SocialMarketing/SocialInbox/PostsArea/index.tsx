import React from 'react';
import SocialPost from './SocialPost';
import Mailing from './Mailing';

const PostArea = ({ postMode }: any) => {
  const renderPostType: any = {
    fbPost: <SocialPost postType={postMode} />,
    twitterPost: <SocialPost postType={postMode} />,
    instagramPost: <SocialPost postType={postMode} />,
    mail: <Mailing />,
  };
  return <>{renderPostType[postMode]}</>;
};
export default PostArea;
