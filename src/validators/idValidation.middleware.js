// middleware p validar se o id é um valido
export const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        const error = new Error('ID FALTANDO');
        error.statusCode = 400;
        return next(error);
    }

    if (isNaN(id) || !Number.isInteger(Number(id))) {
        const error = new Error('ID NAO E VALOR INTEIRO POSITIVO');
        error.statusCode = 400;
        return next(error);
    }

    if (Number(id) <= 0) {
        const error = new Error('ID NAO E VALOR INTEIRO POSITIVO');
        error.statusCode = 400;
        return next(error);
    }

    next();
};
