import { Router } from 'express';
import { getAllItems, createItem, updateItem, deleteItem, getItemByID } from '../controllers/menuController';

const router = Router();

router.get('/', getAllItems);
router.get('/menu/:id', getItemByID);

router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;