export interface PostCreateBody {
  tittle: string;
  body: string;
}

export interface PostCreateParams {
  categoryId: string;
}

export interface PostListParams extends PostCreateParams {}

export interface PostFindParams extends PostCreateParams {
  postId: string;
}
