import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../Dashboard.data';

const { PRIVATE_TO_OWNER, EVERYONE, SPECIFIC_USER_AND_TEAMS } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const MANAGE_ACCESS_TYPES_API_MAPPED = {
  [PRIVATE_TO_OWNER]: 'Private to owner',
  [EVERYONE]: 'Everyone',
  [SPECIFIC_USER_AND_TEAMS]: 'Specific user',
};
