import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { GridViewIcon, ListViewIcon } from '@/assets/icons';

const ListGridViewBtn = ({ onClick }: { onClick: ({}) => void }) => {
  const [activeColor, setActiveColor] = React.useState('listView');

  const handleClick = (type: string) => {
    onClick(type);
    setActiveColor(type);
  };

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      sx={{ minHeight: '36px' }}
    >
      <Button
        color="inherit"
        className="small"
        onClick={() => handleClick('listView')}
        sx={{
          '&:hover': { backgroundColor: '#F3F4F6' },
          backgroundColor: activeColor === 'listView' ? '#F3F4F6' : '',
        }}
      >
        <ListViewIcon />
      </Button>
      <Button
        color="inherit"
        className="small"
        onClick={() => handleClick('gridView')}
        // sx={{
        //   '&:hover': { backgroundColor: '#F3F4F6' },
        //   backgroundColor: activeColor === 'gridView' ? '#F3F4F6' : '',
        // }}
      >
        <GridViewIcon />
      </Button>
    </ButtonGroup>
  );
};

export default ListGridViewBtn;
