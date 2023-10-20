import { StaticImageData } from 'next/image';

export interface ActivityDataI {
  timestamp: string;
  text?: string;
  datestamp: string;
  image: StaticImageData;
}
