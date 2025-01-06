export const ROLE_AND_RIGHTS_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'IN_ACTIVE',
};

export const LOYALTY_PROGRAM_RULE_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'INACTIVE',
};

export const LOYALTY_PROGRAM_TIERS_REWARD_TYPE = {
  FIXED_DISCOUNT: 'FIXED_DISCOUNT',
  FLAT_DISCOUNT: 'FLAT_DISCOUNT',
  POINTS: 'POINTS',
};

export const LOYALTY_PROGRAM_RULES_BENEFIT_TYPE = {
  DISCOUNT: 'DISCOUNT',
  AWARD: 'AWARD',
};

export const LOYALTY_PROGRAM_RULES_TIME_SPAN = {
  THIS_WEEK: 'THIS_WEEK',
  LAST_WEEK: 'LAST_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  CUSTOM_DATE: 'CUSTOM_DATE',
};

export const LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES = {
  SELECT_CONTACT: 'SELECT_CONTACT',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ADDRESS: 'address',
  PHONE_NUMBER: 'phoneNumber',
  AGE: 'AGE',
  LAST_TRANSACTION_AT: 'lastTransactionAt',
  NO_OF_TRANSACTIONS: 'numberOfTransactions',
  CURRENT_POINTS_BALANCE: 'currentPointBalance',
  TOTAL_POINTS_REDEEMED: 'totalPointRedeemed',
};

export const LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR = {
  EQUAL: 'equals',
  NOT_EQUAL: 'not equals',
  GREATER_THAN: 'greater than',
  LESS_THAN: 'less than',
  IS_KNOWN: 'is known',
  IS_UNKNOWN: 'is unknown',
  BEFORE_DATE: 'before a specific date',
  AFTER_DATE: 'after a specific date',
  CONTAINS: 'contains',
  BASE: 'base',
  BEFORE: 'before',
  AFTER: 'after',
};

export const LOYALTY_PROGRAM_LOYALTY_TIERS_TYPE = {
  CONTACTS: 'CONTACTS',
};

export const BACKEND_COLLECTION_NAME = {
  ASSET_TYPES: 'assettypes',
  LOCATION: 'locations',
  DEPARTMENT: 'departments',
  VENDORS: 'vendors',
  USERS: 'users',
  SERVICE_CATEGORIES: 'servicecategories',
  DEAL_PIPELINES: 'dealpipelines',
  FORECAST_PIPELINES: 'goals',
  CONTRACT_TYPE: 'contracttypes',
  NO_OF_RECORDS: 'NO_OF_RECORDS',
};

export const BACKEND_REPORT_ACCESS = {
  EVERYONE: 'EVERYONE',
  PRIVATE: 'PRIVATE',
  SPECIFIC_USERS: 'SPECIFIC_USERS',
  VIEW_AND_EDIT: 'VIEW_AND_EDIT',
  VIEW_ONLY: 'VIEW_ONLY',
  ADD_TO_EXISTING: 'ADD_TO_EXISTING_DASHBOARD',
  ADD_TO_NEW: 'ADD_TO_NEW_DASHBOARD',
  DO_NOT_ADD: 'DO_NOT_ADD_TO_DASHBOARD',
};

export const API_STATUS_CODE = {
  404: 404,
};

export const STATIC_CONTRACT_TYPES = {
  SOFTWARE_LICENSE: 'software_licence',
};
