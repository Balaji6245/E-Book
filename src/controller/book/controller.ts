import { BookModel, bookMsg, commonMsg, Enum, Request, Responder, Response, StatusCodes, Utils } from '../../helpers/path';

class BookController {
    constructor() { }

    createBook = async (req: Request, res: Response) => {
        let data = req?.body;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(commonMsg.noAuthAcc, StatusCodes.UNAUTHORIZED, res);

        let user = Utils.verifyToken(token);
        if (!user) return Responder.sendFailureMessage(commonMsg.tokenExp, StatusCodes.UNAUTHORIZED, res);

        let book = await BookModel.findOne({ title: data?.title, author: data?.author, active: Enum.STATUS.ACTIVE });
        if (book) return Responder.sendFailureMessage(bookMsg.bookExsist, StatusCodes.FORBIDDEN, res);

        if (!data?.author || !data?.title || !data?.price || !data?.published_on)
            return Responder.sendFailureMessage(commonMsg.validField, StatusCodes.BAD_REQUEST, res);

        let createBook = await BookModel.create(data);
        if (createBook) Responder.sendSuccessData({ book: createBook }, bookMsg.created, StatusCodes.OK, res);
        else Responder.sendFailureMessage(bookMsg.created404, StatusCodes.NO_CONTENT, res);

    }

    getBook = async (req: Request, res: Response) => {
        let id = req?.params?.id;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(commonMsg.noAuthAcc, StatusCodes.UNAUTHORIZED, res);

        let user = Utils.verifyToken(token);
        if (!user) return Responder.sendFailureMessage(commonMsg.tokenExp, StatusCodes.UNAUTHORIZED, res);

        let bookQuery = {
            _id: id,
            active: Enum.STATUS.ACTIVE
        }

        let book = await BookModel.findOne(bookQuery);
        if (book) Responder.sendSuccessData({ book }, bookMsg.book, StatusCodes.OK, res);
        else Responder.sendFailureMessage(bookMsg.book404, StatusCodes.NOT_FOUND, res);

    }

    getBooks = async (req: Request, res: Response) => {
        let query: any = req?.query;
        let { page, limit } = await Utils.returnPageLimit(query);

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(commonMsg.noAuthAcc, StatusCodes.UNAUTHORIZED, res);

        let user = Utils.verifyToken(token);
        if (!user) return Responder.sendFailureMessage(commonMsg.tokenExp, StatusCodes.UNAUTHORIZED, res);

        await Utils.dateQuery(query);
        if (query?.title) await Utils.appendRegex(query, 'title', query?.title);
        if (query?.author) await Utils.appendRegex(query, 'author', query?.author);
        if (query?.price) query['price'] = parseInt(query?.price);
        if (query?.isbn) query['isbn'] = parseInt(query?.isbn);

        let bookQuery = {
            active: Enum.STATUS.ACTIVE,
            ...query
        }

        let books = await BookModel.find(bookQuery).sort({ price: 1, published_on: -1 }).skip(page * limit).limit(limit);
        if (books) Responder.sendSuccessData({ books }, bookMsg.books, StatusCodes.OK, res);
        else Responder.sendFailureMessage(bookMsg.books404, StatusCodes.NOT_FOUND, res)
    }

    updateBook = async (req: Request, res: Response) => {
        let id = req?.params?.id;
        let data = req?.body;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(commonMsg.noAuthAcc, StatusCodes.UNAUTHORIZED, res);

        let user = Utils.verifyToken(token);
        if (!user) return Responder.sendFailureMessage(commonMsg.tokenExp, StatusCodes.UNAUTHORIZED, res);

        let bookQuery = { _id: { $ne: Utils.returnObjectId(id) }, title: data?.title, author: data?.author, active: Enum.STATUS.ACTIVE }

        let book = await BookModel.findOne(bookQuery);
        if (book) return Responder.sendFailureMessage(bookMsg.bookExsist, StatusCodes.CONFLICT, res);

        let updateBook = await BookModel.findOneAndUpdate({ _id: Utils.returnObjectId(id), active: Enum.STATUS.ACTIVE }, data, { new: true });
        if (updateBook) Responder.sendSuccessData({ book: updateBook }, bookMsg.updateBook, StatusCodes.OK, res);
        else Responder.sendFailureMessage(bookMsg.updateBook404, StatusCodes.NOT_MODIFIED, res);
    }

    deleteBook = async (req: Request, res: Response) => {
        let id = req?.params?.id;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(commonMsg.noAuthAcc, StatusCodes.UNAUTHORIZED, res);

        let user = Utils.verifyToken(token);
        if (!user) return Responder.sendFailureMessage(commonMsg.tokenExp, StatusCodes.UNAUTHORIZED, res);

        let bookQuery = {
            _id: Utils.returnObjectId(id),
            active: Enum.STATUS.ACTIVE
        }

        let book = await BookModel.findOne(bookQuery);
        if (!book) return Responder.sendFailureMessage(bookMsg.book404, StatusCodes.NOT_FOUND, res);

        let deleteBook = await BookModel.findOneAndDelete(bookQuery);
        if (deleteBook) Responder.sendSuccessMessage(bookMsg.deleteBook, StatusCodes.OK, res);
        else Responder.sendFailureMessage(bookMsg.deleteBook404, StatusCodes.NOT_MODIFIED, res);
    }

}

export const Controller = new BookController();