import React, { useState } from 'react';

import TeamsCard from './TeamsCard';

import { v4 as uuidv4 } from 'uuid';
import { SocialTeamsData } from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

const TeamsMode = ({ postMode, setPostMode }: any) => {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  return (
    <>
      {SocialTeamsData?.map((item) => (
        <TeamsCard
          key={uuidv4()}
          chatGroupsData={item}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          postMode={postMode}
          setPostMode={setPostMode}
        />
      ))}
    </>
  );
};

export default TeamsMode;
