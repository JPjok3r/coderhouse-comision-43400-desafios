export const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause);
    res.send({status: "error", error: error.name});
}