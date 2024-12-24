import { Request, Response, UserModel, Utils, Responder, commonMsg, StatusCodes, userMsg, Enum } from '../../helpers/path';

class AuthController {
    constructor() { }

    registerUser = async (req: Request, res: Response) => {
        let data = req?.body;

        if (!data?.name || !data?.password || !data?.email)
            return Responder.sendFailureMessage(commonMsg.validField, StatusCodes.BAD_REQUEST, res);

        data['password'] = Utils.encryptPass(data?.password);
        let user = await UserModel.create(data);
        if (!user) Responder.sendFailureMessage(userMsg.created404, StatusCodes.BAD_REQUEST, res);

        let token = Utils.generateJwt(user?._id);
        Responder.sendSuccessData({ token }, userMsg.created, StatusCodes.OK, res);
    }

    login = async (req: Request, res: Response) => {
        let data = req?.body;

        if (!data?.email || !data?.password)
            return Responder.sendFailureMessage(commonMsg.validField, StatusCodes.BAD_REQUEST, res);

        let encryptPass = Utils.encryptPass(data?.password);
        let userQuery = {
            email: data?.email,
            password: encryptPass,
            active: Enum.STATUS.ACTIVE
        }

        let user = await UserModel.findOne(userQuery);
        if (!user) return Responder.sendFailureMessage(commonMsg.invalidCre, StatusCodes.UNAUTHORIZED, res);

        let token = Utils.generateJwt(user?._id);
        Responder.sendSuccessData({ token }, userMsg.login, StatusCodes.OK, res);
    }

    forgetPassword = async (req: Request, res: Response) => {
        let data = req?.body;

        if (!data?.email || !data?.new_password)
            return Responder.sendFailureMessage(commonMsg.validField, StatusCodes.BAD_REQUEST, res);

        let userQuery = {
            email: data?.email,
            active: Enum.STATUS.ACTIVE
        }

        let user = await UserModel.findOne(userQuery);
        if (!user) return Responder.sendFailureMessage(commonMsg.invalidCre, StatusCodes.UNAUTHORIZED, res);

        data['password'] = Utils.encryptPass(data?.new_password);
        delete data?.new_password

        let updateUser = await UserModel.findOneAndUpdate(userQuery, data, { new: true });
        if (updateUser) Responder.sendSuccessMessage(userMsg.passUpdated, StatusCodes.OK, res);
        else Responder.sendFailureMessage(userMsg.passUpdated404, StatusCodes.NOT_MODIFIED, res);
    }
}

export const Controller = new AuthController();