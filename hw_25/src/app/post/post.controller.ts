import * as express from "express";
import type { Request } from "express";
import { PostService } from "./post.service";
import { PostCreateBody, PostCreateParams } from "./post.definition";
import { withHandler } from "../../decorator/with-handler.decorator";

const posts = express.Router({ mergeParams: true });
const postService = new PostService();
posts.post(
  "/",
  withHandler<Request<PostCreateParams, any, PostCreateBody>>(
    async (req, res) => {
      const { categoryId } = req.params;
      const { tittle, body, userId } = req.body;
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

export { posts };
