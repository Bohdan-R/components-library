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
