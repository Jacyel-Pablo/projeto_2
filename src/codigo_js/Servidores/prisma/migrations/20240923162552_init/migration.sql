-- CreateTable
CREATE TABLE "filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capa" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "star" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "apelido" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_apelido_key" ON "usuario"("apelido");
