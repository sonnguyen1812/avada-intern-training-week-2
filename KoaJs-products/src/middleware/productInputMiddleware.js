const yup = require('yup');

async function productInputMiddleware(ctx, next) {
  try {
    const schema = yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      createdAt: yup.string().required(),
      image: yup.string().url().required()
    });
    await schema.validate(ctx.request.body);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = { success: false, errors: e.errors };
  }
}

module.exports = productInputMiddleware;
