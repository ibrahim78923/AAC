import React from 'react';

import GroupChannel from './GroupChannel';
import TeamsChannel from './TeamsChannel';

const SocialChannels = ({ socialModeState }: any) => {
  return (
    <>
      {socialModeState === 'GroupChannel' && <GroupChannel />}
      {socialModeState === 'TeamChannel' && <TeamsChannel />}
    </>
  );
};

export default SocialChannels;
