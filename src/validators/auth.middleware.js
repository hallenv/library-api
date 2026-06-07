import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

/**
 * Middleware de autenticação
 * Verifica se o token JWT é válido
 * Se válido, adiciona os dados do usuário em req.user
 * Se inválido, retorna erro 401
 */
export const authenticate = (req, res, next) => {
    try {
        // Extrai o token do header Authorization
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Token não fornecido. Faça login primeiro.'
            });
        }

        // Verifica e decodifica o token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Adiciona dados do usuário ao request para uso posterior
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

/**
 * Middleware de autorização (opcional)
 * Você pode criar middleware mais específicos para diferentes permissões
 */
export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Usuário não autenticado'
            });
        }

        // Aqui você poderia verificar roles/permissões do usuário
        // Por exemplo: if (!roles.includes(req.user.role)) { ... }

        next();
    };
};
