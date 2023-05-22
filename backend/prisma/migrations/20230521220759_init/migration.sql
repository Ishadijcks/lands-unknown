-- CreateTable
CREATE TABLE "Character" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_userName_key" ON "Character"("userName");
