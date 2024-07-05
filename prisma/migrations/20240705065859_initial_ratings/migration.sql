-- CreateTable
CREATE TABLE "Rating" (
    "userId" VARCHAR(255) NOT NULL,
    "numRatings" INTEGER NOT NULL DEFAULT 0,
    "ratingScore" DOUBLE PRECISION,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("userId")
);
