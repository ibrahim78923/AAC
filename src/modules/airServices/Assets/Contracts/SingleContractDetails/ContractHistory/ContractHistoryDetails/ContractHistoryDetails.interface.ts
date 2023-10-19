import { StaticImageData } from 'next/image';

export interface ContractHistoryDataI {
  timestamp: string;
  Renewed?: string;
  Created?: string;
  datestamp: string;
  descriptionone: string;
  descriptiontwo: string;
  image: StaticImageData;
}
