import React from 'react';
import GroupMode from './Group';
import TeamMode from './Teams';

const SocialModes = ({ socialModeState, postMode, setPostMode }: any) => {
  return (
    <div>
      {socialModeState === 'GroupChannel' && <GroupMode />}
      {socialModeState === 'TeamChannel' && (
        <TeamMode postMode={postMode} setPostMode={setPostMode} />
      )}
    </div>
  );
};

export default SocialModes;
