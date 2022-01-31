import { NotFoundError } from "../../definitions/error.definition";
import { Category } from "../../models/category.models";
import { Post } from "../../models/post.models";

export class PostService {
  async create(
    categoryId: string,
    tittle: string,
    body: string,
    userId: string
  ) {
    const category = await Category.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundError();
    }
    const post = new Post({
      tittle,
      body,
      categoryId,
      userId,
    });
    const result = await post.save();
    return result.populate("category");
  }
}
