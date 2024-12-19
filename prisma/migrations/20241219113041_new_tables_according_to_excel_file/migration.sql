/*
  Warnings:

  - You are about to drop the column `english` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `uzbek` on the `Word` table. All the data in the column will be lost.
  - Added the required column `wordRu` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordUz` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "star" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "star" DROP NOT NULL,
ALTER COLUMN "star" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "english",
DROP COLUMN "uzbek",
ADD COLUMN     "wordRu" TEXT NOT NULL,
ADD COLUMN     "wordUz" TEXT NOT NULL;
