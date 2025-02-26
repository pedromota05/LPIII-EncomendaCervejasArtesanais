import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import RotasUsuário from "./rotas/rotas-usuário";
import RotasCriador from "./rotas/rotas-criador";

const app = express();
const PORT = process.env.PORT || 3333;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use("/usuarios", RotasUsuário);
app.use("/criadores", RotasCriador);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const conexão = createConnection();
export default conexão;
