import { Router } from "express";
import ProductModel from "../../models/productModel.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { page = 1, limit = 10, category, sort } = req.query;
  const criteria = {};
  const ops = { page, limit, sort: { price: sort || "desc" } };
  if (category) {
    criteria.category = category;
  }
  const result = await ProductModel.paginate(criteria, ops);
  res.render("products", buildResponse({ ...result, category }));
});

const buildResponse = (data) => {

  return {
    status: "success",
    payload: data.docs.map((product) => product.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.prevPage
        }${data.category ? `&category=${data.category}` : ""}${
          data.sort ? `&sort=${data.sort}` : ""
        }`
      : "",
    nextLink: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.nextPage
        }${data.category ? `&category=${data.category}` : ""}${
          data.sort ? `&sort=${data.sort}` : ""
        }`
      : "",
  };
};

export default router;
