import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ItemLinkCardPropsI } from '../Cards.interface';

export const ItemLinkCard = (props: ItemLinkCardPropsI) => {
  const {
    Icon = null,
    itemType,
    itemPurpose,
    itemLink,
    flexDirection = 'row',
    itemTypeFontSize = 'body2',
    alignItems = 'center',
    display = 'flex',
    textAlign = 'left',
    avatarMargin = 0,
    avatarVariant = 'rounded',
    avatarSize = { width: 40, height: 40 },
    marginY = 0,
    hasLink = true,
    itemPurposeFontSize = 'body2',
    hasQuery,
    hoverStyles = {},
    borderColor,
  } = props;

  const router = useRouter();

  const cardBorder = !hasLink ? 'custom.off_white_three' : 'primary.main';
  const backgroundColor = !hasLink ? 'grey.200' : 'common.white';
  const cursor = hasLink ? 'pointer' : 'not-allowed';

  return (
    <Box
      onClick={() => {
        if (!hasLink) return;
        router?.push({
          pathname: itemLink,
          ...(hasQuery ? { query: hasQuery } : {}),
        });
      }}
      sx={{
        display,
        alignItems,
        flexDirection,
        gap: 2,
        borderRadius: 2,
        padding: 2,
        textAlign,
        border: `1px solid`,
        borderColor: borderColor ?? cardBorder,
        cursor,
        backgroundColor,
        height: '100%',
        flexWrap: 'wrap',
        '&:hover': {
          ...hoverStyles,
        },
      }}
    >
      {Icon !== null && (
        <Avatar
          variant={avatarVariant}
          sx={{
            backgroundColor: 'primary.light',
            width: avatarSize?.width ?? 40,
            height: avatarSize?.width ?? 40,
            margin: avatarMargin,
          }}
        >
          <Icon sx={{ color: 'primary.main' }} />
        </Avatar>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant={itemTypeFontSize}
          color="slateBlue.main"
          marginY={marginY}
        >
          {itemType}
        </Typography>
        {itemPurpose && (
          <Typography variant={itemPurposeFontSize} color="slateBlue.main">
            {itemPurpose}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
