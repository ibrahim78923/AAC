import { DiscussionImage } from '@/assets/images';

export const styles = {
  noMeetingsGrid: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '15px',
  },
  innerBox: {
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'grey.700',
    background: 'common.white',
    boxShadow: 2,
    p: '16px 23px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '8px',
  },
  imageBoxStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImageBox: {
    background: `url(${DiscussionImage}), lightgray 50% / cover no-repeat`,
  },
  addMeetingButton: {
    fontWeight: '500',
  },
};
