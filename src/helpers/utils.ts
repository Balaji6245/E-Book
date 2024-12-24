import { crypto, jwt, Request } from "./path";

class utilsClass {
    constructor() { }

    generateJwt = (id: any) => {
        return jwt.sign({ id: id }, process.env.SECRET_KEY!, { expiresIn: process.env.EXPIRATION_TIME });
    }

    encryptPass = (password: string) => {
        return crypto.createHash('md5').update(password).digest('hex');
    }

    getToken = (req: Request) => {
        let token: any;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];

        return token;
    }

    verifyToken = (token: any) => {
        let decode: any = jwt.verify(token, process.env.SECRET_KEY!);
        return decode ? decode : null
    }
}

export const Utils = new utilsClass();