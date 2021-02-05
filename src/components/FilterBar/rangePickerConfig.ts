import { ValueType, DateRangePickerProps } from 'rsuite/lib/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import moment from 'moment';
import { lockBodyScroll, unlockBodyScroll } from '../../util/lockBodyScroll';

const { afterToday } = DateRangePicker;

export default (
  dateFilter: DateInterval,
  setCustomInterval: (data: DateInterval) => void,
  mobile = false,
  className: string,
  menuClassName: string
): DateRangePickerProps => ({
  size: 'lg',
  className,
  value: [moment(dateFilter?.start).toDate(), moment(dateFilter?.end).toDate()],
  cleanable: false,
  onOk: (date: ValueType): void => {
    if (date.length !== 2) return;
    setCustomInterval({
      start: moment(date[0]),
      end: moment(date[1]),
    });
    const container = document.getElementById('rs-date-range-picker-container');
    if (container) {
      container.style.width = '0vw';
      container.style.height = '0vh';
      container.style.display = 'none';
    }
    unlockBodyScroll();
  },
  showOneCalendar: mobile,
  onOpen: (): void => {
    const container = document.getElementById('rs-date-range-picker-container');
    if (container) {
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.display = 'flex';
    }
    if (mobile) {
      lockBodyScroll();
    }
  },
  onClose: (): void => {
    const container = document.getElementById('rs-date-range-picker-container');
    if (container) {
      container.style.width = '0vw';
      container.style.height = '0vh';
      container.style.display = 'none';
    }
    unlockBodyScroll();
  },
  container: (): HTMLElement => {
    const container = document.querySelector('#rs-date-range-picker-container');
    return container as HTMLElement;
  },
  menuClassName,
  locale: {
    sunday: 'Dom',
    monday: 'Seg',
    tuesday: 'Ter',
    wednesday: 'Qua',
    thursday: 'Qui',
    friday: 'Sex',
    saturday: 'Sab',
    ok: 'OK',
    today: 'Hoje',
    yesterday: 'Ontem',
    last7Days: 'Últimos sete Dias',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
  },
  format: 'DD/MM/YYYY',
  ranges: [],
  disabledDate: afterToday(),
  renderValue: (value: ValueType, format: string): string =>
    `${moment(value[0]).format(format)} a ${moment(value[1]).format(format)}`,
});
