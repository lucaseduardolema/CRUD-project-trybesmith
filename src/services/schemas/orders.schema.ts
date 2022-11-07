import Joi from 'joi';

const orderSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).required(),
});

export default orderSchema;
