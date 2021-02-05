import moment from 'moment';

export const getDatesAndValuesBetweenTwoDates = (
  startDate: string,
  endDate: string,
  values: Array<LicenseAPI.IResponseLicenseData>
): Array<LicenseUsageData> => {
  const dates = [];
  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.isSame(lastDate) || currDate.diff(lastDate, 'days') < 0) {
    const accesses = values
      ? values.find((x) => x.Data === currDate.format('DD/MM/YYYY'))
      : null;

    dates.push({
      date: currDate.format('DD/MM/YYYY'),
      quantity: accesses ? accesses.Quantidade : 0,
    });

    currDate.add(1, 'days');
  }

  return dates.reverse();
};
