import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
const humanizeTaskDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
};

export { humanizeTaskDueDate, humanizeTaskDueTime, getDuration, DATE_FORMAT };
