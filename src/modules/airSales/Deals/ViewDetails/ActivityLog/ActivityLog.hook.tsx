import React from 'react';
import { useTheme, Typography } from '@mui/material';

const useActivityLog = () => {
  const theme = useTheme();
  const NameWithStyledWords = ({
    name,
    customKey,
  }: {
    name: string;
    customKey: string;
  }) => {
    const words = name.trim().split(' ');

    const styledName = (
      <Typography
        variant={customKey === 'ActivityHead' ? 'subtitle2' : 'body2'}
        sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}
      >
        {customKey === 'Activitylist' && (
          <span
            style={{
              width: '6px',
              height: '6px',
              background: theme.palette.custom.main,
              borderRadius: '20px',
              display: 'inline-block',
              marginRight: '5px',
            }}
          ></span>
        )}
        <span
          style={{
            color:
              customKey === 'ActivityHead'
                ? theme.palette.primary.main
                : theme.palette.custom.main,
          }}
        >
          {words[0]}
        </span>
        <span
          style={{
            color:
              customKey === 'Activitylist'
                ? theme.palette.custom.main
                : theme.palette.common.black,
          }}
        >
          {words.slice(1, -2).join(' ')}{' '}
        </span>
        <span style={{ color: theme.palette.primary.main }}>
          {words[words.length - 2]} {words[words.length - 1]}
        </span>
      </Typography>
    );

    return styledName;
  };

  return { NameWithStyledWords, theme };
};

export default useActivityLog;
