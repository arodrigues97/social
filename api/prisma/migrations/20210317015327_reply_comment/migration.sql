/*
  Warnings:

  - Added the required column `replyCommentId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "replyCommentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("replyCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
