export interface IProductCatalogProps {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isDrawerOpen: boolean) => void;
}

export interface IErrorResponse {
  data?: {
    message?: string;
  };
}
