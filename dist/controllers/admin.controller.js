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
exports.loginAdmin = exports.newAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../models/admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el nombre de usuario ya existe en la base de datos
    const admin = yield admin_1.Admin.findOne({ where: { username: username } });
    if (admin) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        // Guardarmos usuario administrador en la base de datos
        yield admin_1.Admin.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error! ',
            error
        });
    }
});
exports.newAdmin = newAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el nombre de usuario existe en la base de datos
    const admin = yield admin_1.Admin.findOne({ where: { username: username } });
    if (!admin) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        });
    }
    // Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, admin.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123');
    res.json(token);
});
exports.loginAdmin = loginAdmin;
