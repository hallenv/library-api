import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura'; // Use variável de ambiente em produção

// simulando banco de dados de usuário 
const users = [
    { id: 1, email: 'admin@library.com', password: '123456', role: 'admin' }
];

export const register = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        // Verifica se usuário já existe
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            return res.status(400).json({
                error: 'Este email já está registrado'
            });
        }

        // Cria novo usuário como client por padrão
        const newUser = {
            id: users.length + 1,
            email,
            password, // criptografar a senha com bcrypt
            role: 'client'
        };

        users.push(newUser);

        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

export const login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        // Busca usuário
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({
                error: 'Email ou senha inválidos'
            });
        }

        // Gera token JWT com role
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};
