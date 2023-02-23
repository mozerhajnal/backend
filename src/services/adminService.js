import createHttpError from 'http-errors';
import fs from 'fs';
import util from 'util';
import uploadToS3 from '../utils/s3';
import Product from '../models/productModel';

export const adminService = {
  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndRemove(id);

      if (!product) {
        throw createHttpError(400, { message: 'Product not found' });
      }

      return {
        statusCode: 200,
        responseObj: { product },
      };
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
  },

  async addProduct(files, product) {
    const imagesUrl = [];
    const asyncRes = await Promise.all(
      files.map(async item => {
        try {
          const result = await uploadToS3(item);
          imagesUrl.push(result.Location);
          const unlinkFile = util.promisify(fs.unlink);
          unlinkFile(item.path);
          return result.Location;
        } catch (err) {
          throw createHttpError(400, { message: err });
        }
      })
    );

    const { name, price, sku, description, quantity, category } = product;

    const newItem = new Product({
      name,
      sku,
      price,
      quantity,
      description,
      type: category,
      productImage: asyncRes,
    });
    const savedProduct = await newItem.save();
    return {
      statusCode: 200,
      responseObj: {
        id: savedProduct._id,
        name: savedProduct.name,
        price: savedProduct.price,
        sku: savedProduct.sku,
        description: savedProduct.description,
        quantity: savedProduct.quantity,
        type: savedProduct.category,
        productImage: savedProduct.productImage,
      },
    };
  },

  async modifyProduct(files, product, productId) {
    const imagesUrl = [];

    const { name, price, sku, description, quantity, category, image } =
      product;

    const productItem = await Product.findById({ _id:productId });

    if (name) productItem.name = name;
    if (price) productItem.price = price;
    if (sku) productItem.sku = sku;
    if (description) productItem.description = description;
    if (quantity) productItem.quantity = quantity;
    if (category) productItem.category = category;
    if (image) {
      image.split(",").map((item)=>{
        imagesUrl.push(item);
        return imagesUrl;
      });
      productItem.productImage = imagesUrl;
    }
    if(files){
      const asyncRes = await Promise.all(
        files.map(async item => {
          try {
            const result = await uploadToS3(item);
            imagesUrl.push(result.Location);
            const unlinkFile = util.promisify(fs.unlink);
            unlinkFile(item.path);
            return result.Location;
          } catch (err) {
            throw createHttpError(400, { message: err });
          }
        })
      );
      productItem.productImage = asyncRes;
    }

    try {
      const savedProduct = await productItem.save();
      return {
        statusCode: 200,
        responseObj: {
          id: savedProduct._id,
          name: savedProduct.name,
          price: savedProduct.price,
          sku: savedProduct.sku,
          description: savedProduct.description,
          quantity: savedProduct.quantity,
          type: savedProduct.category,
          productImage: savedProduct.productImage,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err });
    }
  },
};
