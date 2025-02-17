import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

const DATE_FORMAT = 'D MMMM';
const DATE_FORMAT_EDIT_FORM = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
const humanizeTaskDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
const humanizeEditFormDate = (formDate) => formDate ? dayjs(formDate).format(DATE_FORMAT_EDIT_FORM) : '';

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

export { humanizeTaskDueDate, humanizeTaskDueTime, humanizeEditFormDate, getDuration, DATE_FORMAT, DATE_FORMAT_EDIT_FORM };
