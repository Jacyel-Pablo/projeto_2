-- CreateTable
CREATE TABLE "usuario" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "apelido" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estrelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_filmes" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "estrelas_id_filmes_fkey" FOREIGN KEY ("id_filmes") REFERENCES "filmes" ("id_filmes") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "estrelas_email_fkey" FOREIGN KEY ("email") REFERENCES "usuario" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "filmes" (
    "id_filmes" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capa" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "star" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_apelido_key" ON "usuario"("apelido");
