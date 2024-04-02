import { Switch } from '@mui/material';
import { useState } from 'react';

const QuickLinkSwitch = ({ data, name }: any) => {
  const [isChecked, setIsChecked] = useState(data.isActive ?? false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Switch
      name={name}
      checked={isChecked}
      onChange={handleSwitchChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default QuickLinkSwitch;
