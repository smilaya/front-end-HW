import { NotFoundError } from "../../definitions/error.definition";
import { Comment } from "../../models/comment.models";
import { Post } from "../../models/post.models";

export class CommentService {
  async create(
    userId: string,
    categoryId: string,
    postId: string,
    body: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();
    if (!post) {
      throw new NotFoundError();
    }
    const comment = new Comment({
      userId,
      body,
      post,
    });
    const result = await comment.save();
    return result.populate({
      path: "post",
      populate: "category",
    });
  }
  async find(
    userId: string,
    categoryId: string,
    postId: string,
    commentId: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();
    if (!post) {
      throw new NotFoundError();
    }
    const comment = await Comment.findOne({
      _id: commentId,
      userId,
      post: post.id,
    });
    if (!comment) {
      throw new NotFoundError();
    }
    return comment.populate({
      path: "post",
      populate: "category",
    });
  }
  async delete(
    userId: string,
    categoryId: string,
    postId: string,
    commentId: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();
    if (!post) {
      throw new NotFoundError();
    }
    const comment = await Comment.deleteOne({
      _id: commentId,
      userId,
      post: post.id,
    });
    if (!comment) {
      throw new NotFoundError();
    }
    return comment;
  }

  async list(userId: string, categoryId: string, postId: string) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();
    if (!post) {
      throw new NotFoundError();
    }
    const comments = await Comment.find({
      userId,
      post: post.id,
    });
    return comments;
  }
  async update(
    userId: string,
    categoryId: string,
    postId: string,
    commentId: string,
    body: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const comment = await Comment.findOne({
      _id: commentId,
      userId,
      post: post.id,
    });

    if (!comment) {
      throw new NotFoundError();
    }

    const result = await Comment.findByIdAndUpdate(
      comment.id,
      { body },
      { new: true }
    );

    if (!result) {
      throw new NotFoundError();
    }

    return result.populate({
      path: "post",
      populate: { path: "category" },
    });
  }
}
