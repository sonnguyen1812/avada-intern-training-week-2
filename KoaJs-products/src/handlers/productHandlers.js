const { getAll: getAllProducts, getOne: getOneProduct, add: addProduct, update: updateProduct, remove: removeProduct } = require('../database/productRepository');

async function getProducts(ctx) {
  try {
    ctx.body =  getAllProducts() ;
  } catch (e) {
    ctx.status = 404;
    ctx.body = { success: false, error: e.message };
  }
}

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = getOneProduct(id);
    if (product) {
      ctx.body = product;
    } else {
      throw new Error('Product Not Found!');
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = { success: false, error: e.message };
  }
}

async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addProduct(postData);
    ctx.status = 201;
    ctx.body = { success: true };
  } catch (e) {
    ctx.body = { success: false, error: e.message };
  }
}

async function update(ctx) {
  try {
    const { id } = ctx.params;
    const postData = ctx.request.body;
    updateProduct(id, postData);
    ctx.status = 200;
    ctx.body = { success: true };
  } catch (e) {
    ctx.body = { success: false, error: e.message };
  }
}

async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    removeProduct(id);
    ctx.status = 200;
    ctx.body = { success: true };
  } catch (e) {
    ctx.body = { success: false, error: e.message };
  }
}

module.exports = { getProducts, getProduct, save, update, deleteProduct };
