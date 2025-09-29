import Joi from 'joi';

export const createSecretPhraseShema = Joi.object({
  secretPhrase: Joi.string().required(),

  expiresInTimestamp: Joi.number().integer().default(86400000),

  availableViews: Joi.number().integer().min(1).max(10).required(),

  allowDeletions: Joi.boolean().default(false),
}).required();
