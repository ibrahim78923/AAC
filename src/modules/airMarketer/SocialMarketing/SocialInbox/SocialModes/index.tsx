import React from 'react';
import GroupMode from './Group';
import TeamMode from './Teams';

const SocialModes = ({ socialModeState }: any) => {
  return (
    <div>
      {socialModeState === 'GroupChannel' && <GroupMode />}
      {socialModeState === 'TeamChannel' && <TeamMode />}
    </div>
  );
};

export default SocialModes;
