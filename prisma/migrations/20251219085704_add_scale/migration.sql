-- CreateTable
CREATE TABLE "Scale" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Scale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scale" ADD CONSTRAINT "Scale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
