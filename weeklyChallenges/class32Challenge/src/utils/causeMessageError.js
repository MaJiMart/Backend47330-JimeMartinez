export const prodErrorGenerator = (product) => {
  return `All fields are required.
  Fields required:
  - title  : ${product.title}
  - code   : ${product.code}
  - price       : ${product.price}
  - stock    : ${product.stock}`;
}