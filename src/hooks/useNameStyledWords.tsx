import { Typography, useTheme } from '@mui/material';

const TITLE_KEYS = {
  ACTIVITY_LIST: 'Activitylist',
  ACTIVITY_HEAD: 'ActivityHead',
};

const useNameWithStyledWords = () => {
  const theme = useTheme();
  const NameWithStyledWords = ({
    name,
    customKey,
  }: {
    name: string;
    customKey: string;
  }) => {
    const words = name?.trim()?.split(' ');

    const styledName = (
      <Typography
        variant={customKey === TITLE_KEYS?.ACTIVITY_HEAD ? 'h5' : 'body2'}
        sx={{ fontWeight: 400 }}
      >
        {customKey === TITLE_KEYS?.ACTIVITY_LIST && (
          <span
            style={{
              width: '6px',
              height: '6px',
              background: theme?.palette?.custom?.main,
              borderRadius: '20px',
              display: 'inline-block',
              marginRight: '5px',
            }}
          ></span>
        )}
        <span
          style={{
            color:
              customKey === TITLE_KEYS?.ACTIVITY_HEAD
                ? theme?.palette?.primary?.main
                : theme?.palette?.custom?.main,
          }}
        >
          {words[0]} &nbsp;
        </span>
        <span
          style={{
            color:
              customKey === TITLE_KEYS?.ACTIVITY_LIST
                ? theme?.palette?.custom?.main
                : theme?.palette?.common?.black,
          }}
        >
          {words?.slice(1, -2)?.join(' ')} &nbsp;
        </span>
        <span style={{ color: theme?.palette?.primary?.main }}>
          {words[words?.length - 2]} {words[words?.length - 1]}
        </span>
      </Typography>
    );

    return styledName;
  };

  return { NameWithStyledWords, theme };
};

export default useNameWithStyledWords;
