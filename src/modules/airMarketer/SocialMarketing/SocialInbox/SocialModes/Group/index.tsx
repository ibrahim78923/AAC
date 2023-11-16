import { chatGroupsData } from '@/mock/modules/SocialComponents/Chat';
import React, { useState } from 'react';
import GroupCard from './GroupCard';
import { v4 as uuidv4 } from 'uuid';

const GroupMode = () => {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  return (
    <>
      {chatGroupsData?.map((item) => (
        <GroupCard
          key={uuidv4()}
          chatGroupsData={item}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      ))}
    </>
  );
};

export default GroupMode;
