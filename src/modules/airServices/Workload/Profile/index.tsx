import { Avatar, Box, Menu, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { IMG_URL } from '@/config';
import Search from '@/components/Search';
import NoData from '@/components/NoData';
import { AssociationsImage } from '@/assets/images';
import useProfile from './useProfile';

export const Profile = ({ selected, setSelected }: any) => {
  const {
    usersStatus,
    users,
    MAX_LIMIT,
    addToArray,
    setAnchorEl,
    usersExtra,
    anchorEl,
    id,
    debouncedSearch,
    handleClose,
  } = useProfile({
    setSelected,
  });

  if (usersStatus?.isError)
    return <Typography>Something Went Wrong</Typography>;

  return (
    <Fragment>
      <Avatar
        sx={{
          bgcolor: 'primary.lighter',
          color: 'primary.main',
          borderRadius: 2,
          cursor: 'pointer',
          border: selected ? 0 : 3,
          fontSize: '12px',
          width: 38,
          height: 38,
          fontWeight: 500,
        }}
        onClick={() => {
          setSelected(null);
        }}
      >
        All
      </Avatar>

      {users?.map((item: any, index: number) => (
        <Fragment key={item?._id}>
          {index < MAX_LIMIT && (
            <Tooltip title={item?.firstName + ' ' + item?.lastName}>
              <Avatar
                sx={{
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: selected === item ? 3 : 0,
                  fontSize: '12px',
                  width: 38,
                  height: 38,
                  fontWeight: 500,
                  mx: 0.2,
                  textTransform: 'capitalize',
                }}
                src={`${IMG_URL}${item?.img}`}
                onClick={() => addToArray?.(item)}
              >
                {item?.firstName?.[0] ?? '-'}
                {item?.lastName?.[0]}
              </Avatar>
            </Tooltip>
          )}
        </Fragment>
      ))}

      <Tooltip title="Show Remaining">
        <Avatar
          sx={{
            bgcolor: 'primary.lighter',
            color: 'primary.main',
            borderRadius: 2,
            cursor: 'pointer',
            fontSize: '12px',
            width: 38,
            height: 38,
            fontWeight: 500,
          }}
          onClick={(event: any) => {
            setAnchorEl(event?.currentTarget);
          }}
        >
          +{usersExtra?.length}
        </Avatar>
      </Tooltip>

      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box width={250} height={600} p={1}>
          <Search
            setSearchBy={(value: any) => debouncedSearch(value)}
            width={'100%'}
            label={'Search Here'}
          />
          {!usersExtra?.length ? (
            <NoData message="No data is available" image={AssociationsImage} />
          ) : (
            usersExtra?.map((item: any) => (
              <Box
                key={item?._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  borderRadius: 2,
                  py: 1,
                  ':hover': { bgcolor: 'primary.lighter' },
                }}
                onClick={() => {
                  addToArray?.(item);
                  handleClose?.();
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: selected === item ? 3 : 0,
                    fontSize: '12px',
                    width: 38,
                    height: 38,
                    fontWeight: 500,
                    mx: 0.2,
                    textTransform: 'capitalize',
                  }}
                  src={`${IMG_URL}${item?.img}`}
                >
                  {item?.firstName?.[0] ?? '-'}
                  {item?.lastName?.[0]}
                </Avatar>
                <Typography variant={'body1'}>
                  {item?.firstName} {item?.lastName}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Menu>
    </Fragment>
  );
};
