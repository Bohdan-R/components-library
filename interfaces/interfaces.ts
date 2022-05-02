export interface ICost {
  id: string;
  title: string;
  sum: number | string;
  category: string;
  date: string;
}

export interface ICategory {
  id: string;
  category: string;
}

export interface IDateOptions {
  year: '2-digit' | 'numeric';
  month: '2-digit' | 'long' | 'narrow' | 'numeric' | 'short';
  day: '2-digit' | 'numeric';
}
