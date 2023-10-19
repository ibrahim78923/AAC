import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface FeedI {
  key?: number | string;
  img?: string | StaticImport;
  name?: string;
  email?: string;
  desc?: string;
  date?: string;
}
