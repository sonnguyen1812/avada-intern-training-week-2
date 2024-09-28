const Router = require('koa-router');
const productHandler = require('../handlers/productHandlers');
const productInputMiddleware = require("../middleware/productInputMiddleware");

const router = new Router({});

router.get('/api/products', productHandler.getProducts);
router.get('/api/products/:id', productHandler.getProduct);
router.post('/api/products', productInputMiddleware, productHandler.save);
router.put('/api/products/:id', productInputMiddleware, productHandler.update);
router.delete('/api/products/:id', productHandler.deleteProduct);

module.exports = router;
