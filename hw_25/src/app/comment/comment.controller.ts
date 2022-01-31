import * as express from "express";
import type { Request } from "express";
import { CommentService } from "../comment/comment.service";
import {
  CommentCreateBody,
  CommentCreateParams,
  CommentDeleteParams,
  CommentListParams,
  CommentFindParams,
  CommentUpdateBody,
  CommentUpdateParams,
} from "./comment.definition";
import { UnauthorizedError } from "../../definitions/error.definition";
import { withHandler } from "../../decorator/with-handler.decorator";

const comments = express.Router({ mergeParams: true });
const commentService = new CommentService();
comments.post(
  "/",
  withHandler<Request<CommentCreateParams, any, CommentCreateBody>>(
    async (req, res) => {
      const userId = req.userId;
      if (!userId) {
        throw new UnauthorizedError();
      }
      const { categoryId, postId } = req.params;
      const { body } = req.body;
      const response = await commentService.create(
        userId,
        categoryId,
        postId,
        body
      );
      res.json(response);
    }
  )
);
comments.get(
  "/:commentId",
  withHandler<Request<CommentFindParams>>(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId, postId, commentId } = req.params;

    const response = await commentService.find(
      userId,
      categoryId,
      postId,
      commentId
    );
    res.json(response);
  })
);
comments.delete(
  "/:commentId",
  withHandler<Request<CommentDeleteParams>>(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId, postId, commentId } = req.params;

    commentService.delete(userId, categoryId, postId, commentId);
    res.sendStatus(204);
  })
);

comments.put(
  "/:commentId",
  withHandler<Request<CommentUpdateParams, any, CommentUpdateBody>>(
    async (req, res) => {
      const userId = req.userId;

      if (!userId) {
        throw new UnauthorizedError();
      }

      const { categoryId, postId, commentId } = req.params;
      const { body } = req.body;

      const response = await commentService.update(
        userId,
        categoryId,
        postId,
        commentId,
        body
      );

      res.json(response);
    }
  )
);
comments.get(
  "/",
  withHandler<Request<CommentListParams>>(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId, postId } = req.params;

    const response = await commentService.list(userId, categoryId, postId);
    res.json(response);
  })
);
export { comments };
