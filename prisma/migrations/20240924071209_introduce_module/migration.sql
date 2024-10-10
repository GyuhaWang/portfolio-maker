/*
  Warnings:

  - You are about to drop the column `introduce` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "introduce";

-- CreateTable
CREATE TABLE "Introduce" (
    "id" TEXT NOT NULL,
    "introduce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Introduce_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Introduce" ADD CONSTRAINT "Introduce_id_fkey" FOREIGN KEY ("id") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
