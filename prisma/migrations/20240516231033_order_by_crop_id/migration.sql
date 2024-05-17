/*
  Warnings:

  - You are about to drop the column `cropName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `cropType` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.
  - Added the required column `cropId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantity` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cropName",
DROP COLUMN "cropType",
DROP COLUMN "price",
ADD COLUMN     "cropId" INTEGER NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
