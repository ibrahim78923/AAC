import { Box, Typography, useTheme } from '@mui/material';
import { FeedI } from './UserList.interface';
import Image from 'next/image';
import { styles } from './UserList.style';

const UserList = ({ img = '', name, email, desc, date }: FeedI) => {
  const { userDetails } = styles(useTheme());
  return (
    <Box
      sx={userDetails}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} alignItems={'center'} gap="10px">
        <Image
          src={img}
          alt="icon"
          height={40}
          width={40}
          className="user_img"
        />
        <Box>
          <Typography className="user_name">{name}</Typography>
          <Typography className="user_email">{email}</Typography>
          <Typography className="user_desc">{desc}</Typography>
        </Box>
      </Box>
      <Typography className="user_date">{date}</Typography>
    </Box>
  );
};
export default UserList;
