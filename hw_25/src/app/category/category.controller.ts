import * as express from "express";
import type { Request } from "express";
import {
  CategoryCreateBody,
  CategoryFindParams,
  CategoryDeleteParams,
  CategoryUpdateBody,
  CategoryUpdateParams,
} from "../category/category.definition";
import { CategoryService } from "../category/category.service";
import { withHandler } from "../../decorator/with-handler.decorator";
import { UnauthorizedError } from "../../definitions/error.definition";

const categories = express.Router();
const categoryService = new CategoryService();
categories.post(
  "/",
  withHandler<Request<any, any, CategoryCreateBody>>(async (req, res) => {
    const { name } = req.body;
    const response = await categoryService.create(name);
    res.json(response);
  })
);
categories.get(
  "/:categoryId",
  withHandler<Request<CategoryFindParams>>(async (req, res) => {
    const { categoryId } = req.params;
    const response = await categoryService.find(categoryId);
    res.json(response);
  })
);

categories.get(
  "/",
  withHandler<Request<any>>(async (_req, res) => {
    const response = await categoryService.list();
    res.json(response);
  })
);
categories.put(
  "/:categoryId",
  withHandler<Request<CategoryUpdateParams, any, CategoryUpdateBody>>(
    async (req, res) => {
      const userId = req.userId;

      if (!userId) {
        throw new UnauthorizedError();
      }

      const { categoryId } = req.params;
      const { name } = req.body;

      const response = await categoryService.update(userId, categoryId, name);

      res.json(response);
    }
  )
);

categories.delete(
  "/:categoryId",
  withHandler<Request<CategoryDeleteParams>>(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId } = req.params;
    categoryService.delete(userId, categoryId);

    res.sendStatus(204);
  })
);
export { categories };
