import Image from 'next/image';

import { Box } from '@mui/material';

import useUploadLogo from './useUploadLogo';

import { UserAvatarImage } from '@/assets/images';
import { AddPenIcon } from '@/assets/icons';

const UploadLogo = () => {
  const { handleChangeImg, onImageError } = useUploadLogo();
  return (
    <Box
      className="my-account"
      sx={{ justifyContent: 'center', display: 'flex', width: 'auto' }}
    >
      <Box position="relative" sx={{ mt: 4 }}>
        <Image
          src={UserAvatarImage}
          alt="user-avatar-image"
          style={{
            position: 'relative',
            borderRadius: '50%',
            minWidth: '150px',
            minHeight: '150px',
            objectFit: 'cover',
          }}
          height={50}
          width={50}
          className="profile-img"
          onError={onImageError}
        />

        <label htmlFor="upload-button">
          <Box
            className="upload-icon"
            sx={{
              position: 'absolute',
              bottom: '0px',
              right: '30px',
              cursor: 'pointer',
            }}
          >
            <AddPenIcon />
          </Box>
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: 'none' }}
          accept="image/png, image/gif, image/jpeg, image/webp"
          onChange={handleChangeImg}
        />
      </Box>
    </Box>
  );
};
export default UploadLogo;
