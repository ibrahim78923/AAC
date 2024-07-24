import { AvatarI } from '../Avatar';
import { AddressI } from '../Address';

export interface OrganizationI {
  _id: string;
  crn: string;
  name: string;
  address: AddressI;
  ownerId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: AvatarI;
}
