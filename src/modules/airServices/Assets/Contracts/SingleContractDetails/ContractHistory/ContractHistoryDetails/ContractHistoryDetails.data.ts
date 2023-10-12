import { editImage } from '@/assets/images';
import { CreatedImage } from '@/assets/images';
import { ContractHistoryDataI } from './ContractHistoryDetails.interface';

export const contracthistorydetails: ContractHistoryDataI[] = [
  {
    timestamp: 'Tue, 7 Mar, 2023 10:31 PM',
    Renewed: 'Renewed',
    datestamp: '28 March, 2023 to 24 Nov,2024',
    descriptionone: 'Cost :£6944 ',
    descriptiontwo: 'Created By :Mark',
    image: editImage,
  },
  {
    timestamp: 'Tue, 7 Mar, 2023 10:31 PM',
    Created: 'Created',
    datestamp: '28 March, 2023 to 24 Nov,2024',
    descriptionone: 'Cost :£6944 ',
    descriptiontwo: 'Created By :System',
    image: CreatedImage,
  },
];
