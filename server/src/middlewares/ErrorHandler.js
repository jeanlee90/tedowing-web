import util from "util";
import logger from "../utils/logger";
import errorCodes from "../utils/errorCodes";
import { makeFailureFormat } from "../utils/makeRespFormat";

export const defaultErrorHandler = async (err, req, res, next) => {
  logger.error(util.inspect(err));
  let error = err;

  // DB 관련 에러
  if (error.name === "SequelizeUniqueConstraintError") error = errorCodes[500];

  res.status(error.statusCode).json(makeFailureFormat(error));
};
