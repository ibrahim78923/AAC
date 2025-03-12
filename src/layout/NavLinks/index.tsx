import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const NavLinks = (props: any) => {
  const {
    iconFill,
    name,
    Icon = null,
    link = '#',
    isActive,
    iconBgColor,
    outerBgColor,
    color,
    onClick,
  } = props;

  return (
    <Link href={link}>
      <Box
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 2,
          p: 1,
          background: isActive ? outerBgColor : 'transparent',
          color,
          my: 0.5,
          '&:hover': {
            background: outerBgColor,
          },
        }}
      >
        {Icon !== null && (
          <Box
            sx={{
              display: 'flex',
              backgroundColor: iconBgColor,
              borderRadius: 0.5,
              p: 0.2,
              opacity: isActive ? 1 : 0.4,
            }}
          >
            <Icon fill={iconFill} />
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-word',
            color,
            fontWeight: isActive ? 'fontWeightBold' : 'fontWeightRegular',
          }}
        >
          {name}
        </Typography>
      </Box>
    </Link>
  );
};
