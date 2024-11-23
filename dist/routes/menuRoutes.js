import { Router } from 'express';
import { getAllItems, createItem, updateItem, deleteItem, getItemByID } from '../controllers/menuController';

const router = Router();

// Definição das rotas
router.get('/', getAllItems); // Listar todos os itens
router.get('/:id', getItemByID); // Buscar um item pelo ID
router.post('/', createItem); // Criar um novo item
router.put('/:id', updateItem); // Atualizar um item
router.delete('/:id', deleteItem); // Deletar um item

export default router;
