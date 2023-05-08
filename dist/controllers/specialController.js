"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletepost = exports.updatepost = exports.createpost = exports.getpost = void 0;
const posts_1 = __importDefault(require("../models/posts"));
const data_verification = (request, response) => {
    if (!request.body.category ||
        !request.body.title ||
        !request.body.name ||
        !request.body.avatar ||
        !request.body.data) {
        return false;
    }
    const properties = {
        category: request.body.category,
        title: request.body.title,
        author: {
            name: request.body.name,
            avatar: request.body.avatar,
        },
        data: request.body.data,
    };
    return properties;
};
const getpost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield posts_1.default.find();
    if (!documents)
        return response.status(400).json({ msg: "No hay post creados" });
    return response.json(documents);
});
exports.getpost = getpost;
const createpost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const dataVerification = data_verification(request, response);
    if (!dataVerification) {
        return response
            .status(400)
            .json({ msg: "Por favor, completa la informacion para poder continuar" });
    }
    const post = new posts_1.default(dataVerification);
    yield post.save();
    return response.status(200).json({ msg: "El post fue creado satisfactoriamente" });
});
exports.createpost = createpost;
const updatepost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!request.body.category ||
        !request.body.title ||
        !request.body.name ||
        !request.body.avatar ||
        !request.body.data) {
        return response
            .status(400)
            .json({ msg: "Por favor, completa la informacion para poder continuar" });
    }
    const properties = {
        category: request.body.category,
        title: request.body.title,
        author: {
            name: request.body.name,
            avatar: request.body.avatar,
        },
        data: request.body.data,
    };
    const update = yield posts_1.default.findByIdAndUpdate(id, properties);
    return response.status(200).json({ msg: "Post se ha actualizado satisfactoriamente" });
});
exports.updatepost = updatepost;
const deletepost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const clear = yield posts_1.default.findByIdAndDelete(id);
    return response.status(200).json({ msg: "Post se ha eliminado satisfactoriamente" });
});
exports.deletepost = deletepost;
