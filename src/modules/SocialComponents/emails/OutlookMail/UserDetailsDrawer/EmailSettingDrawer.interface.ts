export interface UserDetailsDrawerI {
  isOpenDrawer: any;
  setIsOpenDrawer: any;
  isUserDetail: any;
}

export interface EmailAddressI {
  name?: string;
}

export interface RecipientI {
  emailAddress?: EmailAddressI;
}

export interface UserDetailI {
  toRecipients?: RecipientI[];
}
