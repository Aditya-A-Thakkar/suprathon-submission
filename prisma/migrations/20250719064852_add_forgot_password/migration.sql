/*
  Warnings:

  - You are about to drop the column `eventDate` on the `EventPost` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `EventPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `EventPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `EventPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `where` to the `EventPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventPost" DROP COLUMN "eventDate",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "where" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ForgotPasswordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForgotPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordToken_token_key" ON "ForgotPasswordToken"("token");

-- AddForeignKey
ALTER TABLE "ForgotPasswordToken" ADD CONSTRAINT "ForgotPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
