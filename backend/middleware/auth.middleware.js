import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, please login'
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secret'
        );

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
}
