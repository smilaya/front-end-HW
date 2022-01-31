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
      category,
      userId,
    });
    const result = await post.save();
    return result.populate("category");
  }
  async list(userId: string, categoryId: string) {
    const category = await Category.findOne({ _id: categoryId, userId });

    if (!category) {
      throw new NotFoundError();
    }

    const posts = await Post.find().populate("category").exec();

    return posts;
  }
  async find(userId: string, categoryId: string, postId: string) {
    const category = await Category.findOne({ _id: categoryId }).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const post = await Post.findById({
      _id: postId,
      userId,
      category: category.id,
    });

    if (!post) {
      throw new NotFoundError();
    }

    return post.populate("category");
  }
}
