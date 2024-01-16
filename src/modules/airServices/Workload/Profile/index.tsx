import { Avatar, Box, Menu, Tooltip, Typography } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { useLazyGetAssignToQuery } from '@/services/airServices/workload';
import { IMG_URL } from '@/config';
import Search from '@/components/Search';
import { debounce } from 'lodash';

export const Profile = ({ selected, setSelected }: any) => {
  const [users, setUsers] = useState<any>([]);
  const [usersExtra, setUsersExtra] = useState<any>([]);
  const [showExtras, setShowExtras] = useState<any>(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const [searchBy, setSearchBy] = useState('');

  const [trigger, { data, isError }] = useLazyGetAssignToQuery();

  useEffect(() => {
    trigger?.({ params: { search: searchBy } });
  }, [searchBy]);

  const debouncedSearch = debounce((value: any) => {
    setSearchBy(value);
  }, 300);

  const addToArray = (user: any) => {
    setSelected(user);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'basic-menu' : undefined;

  const MAX_LIMIT = 5;

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setUsers(data?.slice(0, MAX_LIMIT));
    setUsersExtra(data?.slice(MAX_LIMIT, data?.length));
  }, [data]);

  if (isError) return <Typography>Something Went Wrong</Typography>;

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

      {usersExtra?.length && (
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
              setShowExtras(true);
            }}
          >
            +{usersExtra?.length}
          </Avatar>
        </Tooltip>
      )}

      {showExtras && (
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
          <Box width={250}>
            <Search
              setSearchBy={(value: any) => debouncedSearch(value)}
              width={'100%'}
            />
            {usersExtra?.map((item: any) => (
              <Box
                key={item?._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  borderRadius: 2,
                  p: 1,
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
            ))}
          </Box>
        </Menu>
      )}
    </Fragment>
  );
};
