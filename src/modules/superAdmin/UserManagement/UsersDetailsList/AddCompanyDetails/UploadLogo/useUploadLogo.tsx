import { UserAvatarImage } from '@/assets/images';
import { UseUploadLogoProps } from '../../UsesDetailList-interface';

const useUploadLogo = ({ companyImg, setCompanyImg }: UseUploadLogoProps) => {
  const handleChangeImg = (e: any) => {
    if (e?.target?.files?.length) {
      setCompanyImg(e?.target?.files[0]);
    }
  };
  const placeholderImage = UserAvatarImage;
  const onImageError = (e: any) => {
    e.target.src = companyImg + placeholderImage;
  };

  return { handleChangeImg, onImageError };
};
export default useUploadLogo;
