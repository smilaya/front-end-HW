export interface CategoryCreateBody {
  name: string;
}
export interface CategoryCreateParams {
  categoryId: string;
}

export interface CategoryFindParams extends CategoryCreateParams {}

export interface CategoryDeleteParams extends CategoryCreateParams {}

export interface CategoryUpdateParams extends CategoryCreateParams {}

export interface CategoryUpdateBody extends CategoryCreateBody {}
