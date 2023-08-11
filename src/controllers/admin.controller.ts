import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin';
import jwt from 'jsonwebtoken';

export const newAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validamos si el nombre de usuario ya existe en la base de datos
    const admin = await Admin.findOne({ where: { username: username } });

    if(admin) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Guardarmos usuario administrador en la base de datos
        await Admin.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error! ',
            error
        })
    }
}

export const loginAdmin = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // Validamos si el nombre de usuario existe en la base de datos
    const admin: any = await Admin.findOne({ where: { username: username } });

    if(!admin) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
    }

    // Validamos password
    const passwordValid = await bcrypt.compare(password, admin.password)
    if(!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        })
    }

    // Generamos token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'elpepe');

    res.json(token);
}