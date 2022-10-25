const { HttpError, ApplicationError } = require('../utils/error-defs');
const {
  formatApplicationError,
  formatHttpError,
  formatInternalError,
} = require('../utils/error');

module.exports = async (ctx, next) => {
  try {
    await next();

    if (!ctx.response._explicitStatus) {
      return ctx.notFound();
    }
  } catch (error) {
    if (error instanceof ApplicationError) {
      const { status, body } = formatApplicationError(error);
      ctx.status = status;
      ctx.body = body;
      return;
    }

    if (error instanceof HttpError) {
      const { status, body } = formatHttpError(error);
      ctx.status = status;
      ctx.body = body;
      return;
    }

    const { status, body } = formatInternalError(error);
    ctx.status = status;
    ctx.body = body;
  }
};
