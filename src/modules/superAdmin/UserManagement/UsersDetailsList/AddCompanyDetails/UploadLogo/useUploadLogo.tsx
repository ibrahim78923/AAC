import { UserAvatarImage } from '@/assets/images';
import { useState } from 'react';

const useUploadLogo = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const handleChangeImg = (e: any) => {
    if (e.target.files.length) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const placeholderImage = UserAvatarImage;
  const onImageError = (e: any) => {
    e.target.src = selectedFile + placeholderImage;
  };
  return { selectedFile, setSelectedFile, handleChangeImg, onImageError };
};
export default useUploadLogo;
