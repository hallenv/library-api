import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

export const authenticate = (req, res, next) => {
    try {
        // extrai token do header authorization
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Token não fornecido. Faça login primeiro.'
            });
        }

        // verificar e decodificar token
        const decoded = jwt.verify(token, SECRET_KEY);

        // adc dados do usuário ao request para uso posterior
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expirado. Faça login novamente.'
            });
        }

        return res.status(401).json({
            error: 'Token inválido. Acesso negado.'
        });
    }
};


export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Usuário não autenticado'
            });
        }

        if (roles.length === 0 || roles.includes(req.user.role)) {
            return next();
        }

        return res.status(403).json({
            error: 'Acesso negado. Permissão insuficiente.'
        });
    };
};
