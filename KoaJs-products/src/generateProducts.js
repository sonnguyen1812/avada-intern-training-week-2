const fs = require('fs');
const {faker} = require('@faker-js/faker');

function generateProducts() {
    const products = [];

    for (let i = 0; i < 100; i++) {
        const product = {
            id: i + 1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            product: faker.commerce.department(),
            color: faker.color.human(),
            createdAt: faker.date.past(),
            image: faker.image.url()
        };
        products.push(product);
    }

    // Ghi file mà không có key "data"
    fs.writeFileSync('./database/products.json', JSON.stringify(products, null, 2));
}

generateProducts();
