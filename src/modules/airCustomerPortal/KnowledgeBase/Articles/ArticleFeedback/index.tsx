import { useState } from 'react';
import { PostArticleFeedback } from '../PostArticleFeedback';
import { ShowAlert } from '../ShowAlert';

export const ArticleFeedback = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSuccess) return <PostArticleFeedback setIsSuccess={setIsSuccess} />;

  return <ShowAlert setAlert={setIsSuccess} />;
};
