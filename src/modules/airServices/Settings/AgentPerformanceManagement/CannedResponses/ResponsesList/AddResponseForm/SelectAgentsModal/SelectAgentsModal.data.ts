import { UserAvatarImage } from '@/assets/images';
import * as Yup from 'yup';

export const userData = [
  { label: 'Alee Javed', src: UserAvatarImage, id: '1', value: 'Alee Javed' },
  {
    label: 'Rajvir Hundal',
    src: UserAvatarImage,
    id: '2',
    value: 'Rajvir Hundal',
  },
  { label: 'Ben Stock', src: UserAvatarImage, id: '3', value: 'Ben Stock' },
  {
    label: 'Aleesha Kong',
    src: UserAvatarImage,
    id: '4',
    value: 'Aleesha Kong',
  },
];
export const AGENTS = 'agents';
export const selectAgentSchema = Yup?.object()?.shape({
  agents: Yup?.array()?.required('Select At least One Agent'),
});
export const selectAgentDefaultValues = {
  agents: [],
};
