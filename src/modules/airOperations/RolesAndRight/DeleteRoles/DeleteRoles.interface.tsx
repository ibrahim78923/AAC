interface IRole {
  _id?: string;
}

export interface IDeleteRolesParameter {
  pathParams?: {
    roleId?: string;
  };
}

export interface IUseDeleteRolesProps {
  setIsPortalOpen?: ((isOpen?: boolean) => void) | any;
  selectedRolesList?: Array<IRole> | any;
  setSelectedRolesList?: ((roles?: Array<IRole>) => void) | any;
  setPage?: ((page?: number) => void) | any;
  totalRecords?: number;
  page?: number;
  getRolesListData?: (page?: number) => Promise<void>;
  isPortalOpen?: boolean | any;
}
