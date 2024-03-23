import React from 'react';
import { styles } from './stopWatch.style';

const StopWatch = (props: any) => {
  const { seconds, minutes, hours } = props;
  return (
    <div
      style={{ textAlign: 'center', marginRight: '2rem', marginLeft: '1rem' }}
    >
      <div style={styles}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
};
export default StopWatch;
