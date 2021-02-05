import moneyFormater from '../../util/moneyFormatter';
import secondsToTime from '../../util/secondsToTime';

export default function TextFormater(data: number, to: ChartDataType): string {
  if (data === null || data === undefined) return ''; // Erro no data.toFixed
  switch (to) {
    case 'BRL':
      return moneyFormater.format(data);
    case 'HH:mm':
    case 'mm:ss':
      return secondsToTime(data, to);
    case 'HH:mm:ss':
      return secondsToTime(data);
    case 'percent':
      return `${data.toFixed(2)}%`;
    default:
      return `${data}`;
  }
}
