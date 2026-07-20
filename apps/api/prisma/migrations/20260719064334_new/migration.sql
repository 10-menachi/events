/*
  Warnings:

  - You are about to drop the column `expires_at` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `token_hash` on the `session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "session_token_hash_key";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "expires_at",
DROP COLUMN "token_hash",
ADD COLUMN     "device_name" TEXT,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "last_active_at" TIMESTAMP(3),
ADD COLUMN     "revoked_at" TIMESTAMP(3),
ADD COLUMN     "user_agent" TEXT;

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
