-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "earSize" TEXT NOT NULL,
    "hairStyle" TEXT NOT NULL,
    "hatStyle" TEXT NOT NULL,
    "eyeStyle" TEXT NOT NULL,
    "glassesStyle" TEXT NOT NULL,
    "noseStyle" TEXT NOT NULL,
    "mouthStyle" TEXT NOT NULL,
    "shirtStyle" TEXT NOT NULL,
    "eyeBrowStyle" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
