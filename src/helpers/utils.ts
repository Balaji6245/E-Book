import { crypto, jwt, moment, mongoose, Request } from "./path";

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

    returnObjectId = (id: string) => {
        return new mongoose.Types.ObjectId(id)
    }

    lookupPipeline = async (from: string, local: string, foreign: string, as: string, project: any) => {
        return {
            $lookup: {
                from: from,
                localField: local,
                foreignField: foreign,
                pipeline: [
                    {
                        $project: {
                            ...project
                        },
                    },
                ],
                as: as
            }
        }
    }

    unwindPipeline = async (field: string) => {
        return {
            $unwind: {
                path: field,
                preserveNullAndEmptyArrays: true
            }
        }
    }

    matchPipeline = async (query: any) => {
        return {
            $match: query
        }
    }

    returnPageLimit = async (query: any) => {
        let page: number = parseInt(query?.page ?? 1) - 1;
        let limit: number = parseInt(query?.limit ?? 10);

        delete query?.page;
        delete query?.limit;

        return { page, limit }
    }

    dateQuery = async (query: any) => {
        if (query?.from && query?.to) {
            query['published_on'] = {
                $gte: new Date(moment(query?.from).startOf('days').local().format()),
                $lte: new Date(moment(query?.to).endOf('days').local().format())
            }
            delete query?.from
            delete query?.to
        }
    }

    appendRegex = async (query: any, field: string, value: any) => {
        return query[field] = { $regex: new RegExp(value.replace(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/g), 'i') }
    }
}

export const Utils = new utilsClass();