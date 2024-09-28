const fs = require('fs');
let products = require('./products.json'); // Loại bỏ .data

function getAll() {
  return products;
}

function getOne(id) {
  return products.find(product => product.id === parseInt(id));
}

function add(data) {
  products.push(data);
  fs.writeFileSync('./products.json', JSON.stringify({products}, null, 2)); // Không còn { data: products }
}

function update(id, newData) {
  const index = products.findIndex(product => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...newData };
    fs.writeFileSync('./products.json', JSON.stringify({products}, null, 2)); // Không còn { data: products }
  }
}

function remove(id) {
  products = products.filter(product => product.id !== parseInt(id)); // Cập nhật products sau khi xoá
  fs.writeFileSync('./products.json', JSON.stringify({products}, null, 2)); // Không còn { data: updatedProducts }
}

module.exports = { getAll, getOne, add, update, remove };