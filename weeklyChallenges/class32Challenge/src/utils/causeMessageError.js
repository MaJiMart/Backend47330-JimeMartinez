export const createProdError = (product) => {
  const { title, description, code, price, stock } = product;
  let errorMessage =
    'The following fields are required and must be valid to create the product: \n';

  if (!title || typeof title !== 'string') {
    errorMessage +=
      "- The 'title' field is required and must be a string of characters.\n";
  }

  if (!description || typeof description !== 'string') {
    errorMessage +=
      "- The 'description' field is required and must be a string of characters.\n";
  }

  if (isNaN(price) || price <= 0) {
    errorMessage +=
      "- The 'price' field is required and must be a number larger than zero.\n";
  }

  if (!code || typeof code !== 'string') {
    errorMessage +=
      "- The 'code' field is required and must be a string of characters.\n";
  }

  if (isNaN(stock) || stock < 0) {
    errorMessage +=
      "- The 'stock' field is required and must be a number larger than zero.\n";
  }
  return errorMessage;
};
