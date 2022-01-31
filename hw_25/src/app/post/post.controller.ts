import * as express from "express";
import type { Request } from "express";
import { PostService } from "./post.service";
import {
  PostCreateBody,
  PostCreateParams,
  PostFindParams,
  PostListParams,
} from "./post.definition";
import { withHandler } from "../../decorator/with-handler.decorator";
import { UnauthorizedError } from "../../definitions/error.definition";

const posts = express.Router({ mergeParams: true });
const postService = new PostService();
posts.post(
  "/",
  withHandler<Request<PostCreateParams, any, PostCreateBody>>(
    async (req, res) => {
      const userId = req.userId;

      if (!userId) {
        throw new UnauthorizedError();
      }
      const { categoryId } = req.params;
      const { tittle, body } = req.body;
      const response = await postService.create(
        categoryId,
        tittle,
        body,
        userId
      );
      res.json(response);
    }
  )
);
posts.get(
  "/:postId",
  withHandler<Request<PostFindParams>>(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId, postId } = req.params;

    const response = await postService.find(userId, categoryId, postId);
    res.json(response);
  })
);
posts.get(
  "/",
  withHandler<Request<PostListParams>>(async (req, res) => {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { categoryId } = req.params;

    const response = await postService.list(userId, categoryId);

    res.json(response);
  })
);

export { posts };
