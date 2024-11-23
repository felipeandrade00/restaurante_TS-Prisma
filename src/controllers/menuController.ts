import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'   

const prisma = new PrismaClient();

export const getAllItems = async (req : Request, res : Response) => {
    try {
        const items = await prisma.cardapioItens.findMany();
        res.json(items);
    } catch (error) {
        res.status(500).json({error: 'Ocorreu um erro durante a busca pelos itens do cardápio'})
    }
};

export const getItemByID = async (req : Request, res : Response) => {
    const {id} = req.params;
    try {
        const item = await prisma.cardapioItens.findUnique({
            where : { id_item : Number(id) }
        });

        if (!item) {
            res.status(404).json({message : 'Item não encontrado no cardápio'});
            return;
        }

        res.status(200).json(item);
    } catch(error) {
        console.error('Erro ao buscar o item no cardápio: ', error);
        res.status(500).json({message : 'Erro durante a busca do item no Banco de Dados'});
    }
};

export const createItem = async (req : Request, res : Response) => {
    try {
        const {nome_item, preco_item,  descricao_item, vegano_bool, glutenfree_bool, id_categoria} = req.body;
        const newItem = await prisma.cardapioItens.create({
            data : {nome_item, preco_item, descricao_item, vegano_bool, glutenfree_bool, id_categoria}
        });
        res.status(201).json(newItem);
    }   catch(error) {
        res.status(400).json({error : 'Erro durante a criação do item no cardápio'});
    }
};

export const updateItem = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const data = req.body;  
        const updateItem = await prisma.cardapioItens.update({
            where : {id_item : parseInt(id) }, 
            data
        });
        res.json(updateItem)
    } catch(error) {
        res.status(400).json({ error : 'Erro durante a atualização do item. '}) ;
    }
};

export const deleteItem = async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        await prisma.cardapioItens.delete({where : {id_item: parseInt(id)} });
        res.status(204).send();

    } catch(error) {
        res.status(400).json({ error : 'Erro durante a remoção do item no banco de dados' });

    }
};