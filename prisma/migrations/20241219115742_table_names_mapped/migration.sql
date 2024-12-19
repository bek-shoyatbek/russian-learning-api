/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Star` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCategoryProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSectionProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTestCompletion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `XP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCategoryProgress" DROP CONSTRAINT "UserCategoryProgress_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserCategoryProgress" DROP CONSTRAINT "UserCategoryProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSectionProgress" DROP CONSTRAINT "UserSectionProgress_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSectionProgress" DROP CONSTRAINT "UserSectionProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTestCompletion" DROP CONSTRAINT "UserTestCompletion_testId_fkey";

-- DropForeignKey
ALTER TABLE "UserTestCompletion" DROP CONSTRAINT "UserTestCompletion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "XP" DROP CONSTRAINT "XP_userId_fkey";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "Star";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserCategoryProgress";

-- DropTable
DROP TABLE "UserProgress";

-- DropTable
DROP TABLE "UserSectionProgress";

-- DropTable
DROP TABLE "UserTestCompletion";

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "XP";

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "star" INTEGER DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stars" (
    "id" SERIAL NOT NULL,
    "star" INTEGER NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_category_progresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_category_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progresses" (
    "id" SERIAL NOT NULL,
    "streakDays" INTEGER DEFAULT 0,
    "level" TEXT NOT NULL DEFAULT 'beginner',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_section_progresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_section_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_test_completions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_test_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "wordRu" TEXT NOT NULL,
    "example_uzbek" TEXT NOT NULL,
    "wordUz" TEXT NOT NULL,
    "english_translation" TEXT NOT NULL,
    "example_english" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xps" (
    "id" SERIAL NOT NULL,
    "xp" INTEGER NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "xps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stars_userId_idx" ON "stars"("userId");

-- CreateIndex
CREATE INDEX "user_category_progresses_userId_idx" ON "user_category_progresses"("userId");

-- CreateIndex
CREATE INDEX "user_category_progresses_categoryId_idx" ON "user_category_progresses"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "user_category_progresses_userId_categoryId_key" ON "user_category_progresses"("userId", "categoryId");

-- CreateIndex
CREATE INDEX "user_section_progresses_userId_idx" ON "user_section_progresses"("userId");

-- CreateIndex
CREATE INDEX "user_section_progresses_sectionId_idx" ON "user_section_progresses"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_section_progresses_userId_sectionId_key" ON "user_section_progresses"("userId", "sectionId");

-- CreateIndex
CREATE INDEX "user_test_completions_userId_idx" ON "user_test_completions"("userId");

-- CreateIndex
CREATE INDEX "user_test_completions_testId_idx" ON "user_test_completions"("testId");

-- CreateIndex
CREATE UNIQUE INDEX "user_test_completions_userId_testId_key" ON "user_test_completions"("userId", "testId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "xps_userId_idx" ON "xps"("userId");

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stars" ADD CONSTRAINT "stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_category_progresses" ADD CONSTRAINT "user_category_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_category_progresses" ADD CONSTRAINT "user_category_progresses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progresses" ADD CONSTRAINT "user_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_section_progresses" ADD CONSTRAINT "user_section_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_section_progresses" ADD CONSTRAINT "user_section_progresses_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_test_completions" ADD CONSTRAINT "user_test_completions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_test_completions" ADD CONSTRAINT "user_test_completions_testId_fkey" FOREIGN KEY ("testId") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xps" ADD CONSTRAINT "xps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
