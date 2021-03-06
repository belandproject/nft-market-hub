import { Joi } from 'koa-joi-router';

const color = Joi.object({
  color: Joi.object({
    r: Joi.number(),
    g: Joi.number(),
    b: Joi.number(),
  }),
});

export const userCreateOrUpdateValidate = {
  type: 'json',
  body: {
    name: Joi.string(),
    introduction: Joi.string().allow(''),
    avatar_image: Joi.string().allow(''),
    banner_image: Joi.string().allow(''),
    website: Joi.string().allow(''),
    email: Joi.string().email().allow(''),
    version: Joi.number(),
    tutorialStep: Joi.number(),
    avatar: Joi.object({
      bodyShape: Joi.string(),
      eyes: color,
      hair: color,
      skin: color,
      wearables: Joi.array().items(Joi.string()).max(10).min(1),
      snapshots: Joi.object({
        face: Joi.string(),
        body: Joi.string(),
        face256: Joi.string(),
        face128: Joi.string(),
      })
    }),
  },
};

export const userToggleValidate = {
  type: 'json',
  body: {
    userIds: Joi.array().items(Joi.string()).min(1).required(),
    enabled: Joi.bool().required(),
  },
};
