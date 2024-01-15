import EnumsErrors from '../utils/enumsError.js';

export default (error, req, res, next) => {
  console.error(error.cause);
  switch (error.code) {
    case EnumsErrors.BAD_REQUEST_ERROR:
    case EnumsErrors.INVALID_PARAMS_ERROR:
    case EnumsErrors.INVALID_TYPE_ERROR:
      res.status(400).json({ status: 'error', message: error.message });
      break;
    case EnumsErrors.DATA_BASE_ERROR:
    case EnumsErrors.ROUTING_ERROR:
      res.status(500).json({ status: 'error', message: error.message });
      break;
    default:
      res.status(500).json({
        status: 'error',
        message: 'Ups! An unknown error occurred, sorry',
      });
      break;
  }
};