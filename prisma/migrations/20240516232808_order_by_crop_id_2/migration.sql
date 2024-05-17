/*
  Warnings:

  - Added the required column `cropName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cropType` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "cropName" TEXT NOT NULL,
ADD COLUMN     "cropType" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
