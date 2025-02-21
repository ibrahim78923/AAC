import { StaticAvatarPropsI } from '../Avatars.interface';
import Image from 'next/image';
import { pxToRem } from '@/utils/getFontValue';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { STATIC_BLUR_DATA_URL } from '@/constants/images';
import { AVATAR_VARIANTS_BORDER_RADIUS } from '@/constants/style';

export const StaticAvatar = (props: StaticAvatarPropsI) => {
  const {
    avatarSrc,
    alt = '',
    backgroundColor = 'transparent',
    width = pxToRem(25),
    height = pxToRem(25),
    variant = AVATAR_VARIANTS?.CIRCULAR,
    aspectRatio = '1',
    sizes = '100vw',
  } = props;

  const borderRadius = AVATAR_VARIANTS_BORDER_RADIUS?.[variant];

  return (
    <div
      style={{
        position: 'relative',
        width: width,
        height: height,
        aspectRatio,
        backgroundColor,
        borderRadius,
        overflow: 'hidden',
      }}
    >
      <Image
        alt={alt}
        fill
        src={avatarSrc}
        priority
        sizes={sizes}
        placeholder="blur"
        blurDataURL={STATIC_BLUR_DATA_URL}
        style={{
          objectFit: 'cover',
          borderRadius,
          aspectRatio,
        }}
      />
    </div>
  );
};
