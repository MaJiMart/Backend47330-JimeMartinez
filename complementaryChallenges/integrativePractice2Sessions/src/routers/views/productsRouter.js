import { Router } from "express";
import ProductModel from "../../models/productModel.js";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, sort } = req.query;
    const criteria = {};
    const ops = { page, limit, sort: { price: sort || "desc" } };
    if (category) {
      criteria.category = category;
    }
    const result = await ProductModel.paginate(criteria, ops);
    let userData = req.session.user;
    //console.log('userData', userData);
    res.render("products", buildResponse({ ...result }, { category, userData }));
    
    } catch (error) {
      console.error('Error', error.message);
  }
});

const buildResponse = (data, {category, userData}) => {
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
      userData: userData,
      category: category,
  };
};

export default router;
