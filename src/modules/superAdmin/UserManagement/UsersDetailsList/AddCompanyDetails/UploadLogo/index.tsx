import Image from 'next/image';

import { Box } from '@mui/material';

import useUploadLogo from './useUploadLogo';

import { UserProfileImage } from '@/assets/images';

import { AddPenIcon } from '@/assets/icons';

const UploadLogo = (props: any) => {
  const { companyImg, setCompanyImg } = props;

  const { handleChangeImg, onImageError } = useUploadLogo(
    companyImg,
    setCompanyImg,
  );

  return (
    <Box
      className="my-account"
      sx={{ justifyContent: 'center', display: 'flex', width: 'auto' }}
    >
      <Box position="relative" sx={{ mt: 4 }}>
        <Image
          src={UserProfileImage}
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

        <label htmlFor="upload-img-button">
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
          name="file"
          id="upload-img-button"
          style={{ display: 'none' }}
          accept="image/png, image/gif, image/jpeg, image/webp,image/jfif"
          onChange={handleChangeImg}
        />
      </Box>
    </Box>
  );
};
export default UploadLogo;
