import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export const useHeader = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );
  const [isHovered, setIsHovered] = useState(false);
  const fullScreenPosition = { top: 0, left: 0, right: 0, bottom: 0 };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const imageUrl = URL?.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return {
    handleFileChange,
    uploadedImage,
    isHovered,
    setIsHovered,
    fullScreenPosition,
    router,
  };
};
