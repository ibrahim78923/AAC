import dayjs from 'dayjs';

export const formatTimeDifference = (createdAt: any) => {
  const diffMinutes = dayjs()?.diff(dayjs(createdAt), 'minute');
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    const diffDays = Math.floor(diffMinutes / (24 * 60));
    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      const diffMonths = dayjs()?.diff(dayjs(createdAt), 'month');
      if (diffMonths < 12) {
        return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
      } else {
        const diffYears = Math.floor(diffMonths / 12);
        return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
      }
    }
  }
};
