import { Box, Switch, Typography } from '@mui/material';
import { useState } from 'react';

const QuickLinkSwitch = ({ title, onChange, id, name, isActive }: any) => {
  const [isChecked, setIsChecked] = useState(isActive);

  const handleSwitchChange =
    (Id: string, isActive: boolean) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Id, isActive);
      setIsChecked(event?.target?.checked);
    };

  return (
    <Box
      sx={{
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontWeight: '500' }}>{title}</Typography>
      <Switch
        name={name}
        checked={isChecked}
        onChange={handleSwitchChange(id, isActive)}
      />
    </Box>
  );
};

export default QuickLinkSwitch;
