import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para lidar com o upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções do controlador de posts
import cors from "cors";

const corsOpitions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento para o Multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage })

// Função que define as rotas da aplicação
const routes = (app) => {
    // Permite que o Express entenda requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOpitions))
    // Rota GET para buscar todos os posts (chama a função listarPosts do controlador)
    app.get("/posts", listarPosts);
    // Rota POST para criar um novo post (chama a função postarNovoPost do controlador)
    app.post("/posts", postarNovoPost);
    // Rota POST para fazer upload de uma imagem (chama a função uploadImagem do controlador)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;