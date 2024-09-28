const Koa = require('koa');
const {koaBody} = require('koa-body');
const productRoutes = require('./routes/productRoutes');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors({
  origin: '*', // Cho phép tất cả các nguồn, bạn có thể giới hạn nếu cần
}));

app.use(koaBody());
app.use(productRoutes.routes());
app.use(productRoutes.allowedMethods());

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000/api/products');
});
