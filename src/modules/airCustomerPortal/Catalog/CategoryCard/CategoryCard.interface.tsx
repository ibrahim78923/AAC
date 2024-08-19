export interface CategoryI {
  categoryName: string;
  description: string;
  _id: string | undefined;
}

export interface CategoryCardPropsI {
  category: CategoryI;
  onCardClick: () => void;
  categoryId?: string | undefined;
}
