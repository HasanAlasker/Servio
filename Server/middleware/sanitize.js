import { body } from "express-validator";

const sanitize = [body("*").trim().escape()];

export default sanitize;
