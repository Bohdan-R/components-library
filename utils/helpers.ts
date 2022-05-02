import { dateOptions } from '../utils/constants';

export const setRuFormatDate = (date: string) => {
  const ruDate = new Date(date);
  return ruDate.toLocaleString('ru-RU', dateOptions);
};
