-- CreateTable
CREATE TABLE `CategoriaItem` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CategoriaItem_nome_categoria_key`(`nome_categoria`),
    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardapioItens` (
    `id_item` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_item` VARCHAR(191) NOT NULL,
    `descricao_item` VARCHAR(191) NULL,
    `preco_item` DECIMAL(65, 30) NOT NULL,
    `vegano_bool` BOOLEAN NOT NULL,
    `glutenfree_bool` BOOLEAN NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardapioItens` ADD CONSTRAINT `CardapioItens_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `CategoriaItem`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;
