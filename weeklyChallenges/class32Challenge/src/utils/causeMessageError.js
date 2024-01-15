export const createProdError = (product) => {
  return `One or more properties were incomplete or not valid.
  Fields required:
  - title       : ${product.title}
  - description : ${product.description}
  - code        : ${product.code}
  - price       : ${product.price}
  - stock       : ${product.stock}
  `;
}