// middleware global p erros
export const globalErrorHandler = (error, req, res, next) => {
    console.error("ERRO DETECTADO:", error.message);
    console.error("Stack:", error.stack);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: error.statusCode ? error.message : 'Erro interno no servidor',
    })
};