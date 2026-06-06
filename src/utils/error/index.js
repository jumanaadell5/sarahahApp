export const asyncHandler = (fn) =>{ 
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(err);
        })
        }
}

export const globalErrorHandler =  (err, req, res, next) => {
        console.log(err["cause"]);
        return res.status(err["cause"] || 500).json({
            msg: "Error",
            message: err.message,
            stack: err.stack
        });
        }
        ;
