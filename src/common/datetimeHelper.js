import { date } from 'quasar';

export const getFriendilyTimeString = (stamp) => {
  const now = new Date();
  const target = new Date(stamp);

  const diffYear = now.getFullYear() - target.getFullYear();
  if (diffYear >= 1) {
    return date.formatDate(target, 'YYYY年M月D日H點m分');
  }

  let diffDay = date.getDateDiff(now, target, 'days');
  if (diffDay > 2) {
    return date.formatDate(target, 'YYYY年M月D日H點m分');
  }
  diffDay = now.getDate() - target.getDate();
  if (diffDay === 1) {
    return date.formatDate(target, '昨天H點m分');
  }
  const diffSec = date.getDateDiff(now, target, 'seconds');
  if (diffSec < 60) {
    return '剛剛';
  }
  const diffMin = date.getDateDiff(now, target, 'minutes');
  if (diffMin < 60) {
    return `${diffMin}分鐘前`;
  }
  const diffHour = date.getDateDiff(now, target, 'hours');
  if (diffHour < 10) {
    return `${diffHour}小時前`;
  }
  return date.formatDate(target, 'M月D日H點m分');
};
