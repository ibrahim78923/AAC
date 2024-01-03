import { UserAvatarImage } from '@/assets/images';

const useUploadLogo = (companyImg: any, setCompanyImg: any) => {
  // const { companyImg, setCompanyImg } = props;

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
