import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

const DATE_FORMAT = 'MMM D';
const DATE_FORMAT_HEAD = 'D MMM';
const DATE_FORMAT_EDIT_FORM = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

const humanizeTaskHeadDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT_HEAD) : '';
const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
const humanizeTaskDueTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
const humanizeEditFormDate = (formDate) => formDate ? dayjs(formDate).format(DATE_FORMAT_EDIT_FORM) : '';

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  if (duration.years()) {
    const totalDays = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${String(totalDays).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
  }
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
};

export { humanizeTaskDueDate, humanizeTaskDueTime, humanizeTaskHeadDate, humanizeEditFormDate, getDuration, DATE_FORMAT, DATE_FORMAT_EDIT_FORM };
