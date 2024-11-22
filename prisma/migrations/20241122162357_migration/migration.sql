/*
  Warnings:

  - You are about to alter the column `preco_item` on the `cardapioitens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `cardapioitens` MODIFY `preco_item` DOUBLE NOT NULL;
