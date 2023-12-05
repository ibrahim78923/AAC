import { useState } from 'react';
import { Switch, styled } from '@mui/material';
import { styles } from './AntSwitch.style';

export const AntSwitch = styled((props: any) => {
  const [switchVal, setSwitchVal] = useState<boolean>(!!props?.values);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchVal(e?.target?.checked);
  };
  return <Switch {...props} checked={switchVal} onChange={handleChange} />;
})(({ theme }) => styles(theme));
