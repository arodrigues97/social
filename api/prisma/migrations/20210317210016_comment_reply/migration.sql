/*
  Warnings:

  - You are about to drop the column `replyCommentId` on the `Comment` table. All the data in the column will be lost.
  - Made the column `postId` on table `Comment` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Comment` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyCommentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyCommentId",
ADD COLUMN     "commentId" INTEGER,
ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
