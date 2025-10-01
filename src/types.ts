export interface PostData {
  title: string;
  date: string;
}

export interface StatisticsData {
  clicks: number;
  isDestroyed: boolean;
}

export interface UserData {
  name: string;
  age: number;
  gender: string;
  company: string;
  email: string;
}

export type DataFormat = 'json' | 'csv' | 'xml';
