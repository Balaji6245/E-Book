import { Response, StatusCodes } from '../helpers/path'

class ResponderClass {
    constructor() { }

    sendSuccessMessage = (message: string, code: number, res: Response) => {
        res.setHeader('content-type', 'application/json');
        let result = { success: true, message };
        res.status(code).end(JSON.stringify(result))
    }

    sendSuccessData = (data: any, message: string, code: number, res: Response) => {
        res.setHeader('content-type', 'application/json');
        let result = { success: true, message, data };
        res.status(code).end(JSON.stringify(result))
    }

    sendFailureMessage = (message: string, code: number, res: Response) => {
        res.setHeader('content-type', 'application/json');
        let result = { success: false, message };
        res.status(code).end(JSON.stringify(result))
    }

    sendNoUser = async (res: Response) => {
        this.sendFailureMessage('User account not found!!', StatusCodes.NOT_FOUND, res)
    }
}

export const Responder = new ResponderClass();