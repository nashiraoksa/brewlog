-- CreateTable
CREATE TABLE "Brew" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "method" TEXT NOT NULL,
    "grindSetting" TEXT,
    "coffeeAmount" INTEGER NOT NULL,
    "waterAmount" INTEGER NOT NULL,
    "waterTemperature" INTEGER NOT NULL,
    "temperatureMetric" TEXT NOT NULL,
    "brewMinutes" INTEGER NOT NULL,
    "brewSeconds" INTEGER NOT NULL,
    "aroma" INTEGER NOT NULL,
    "sweetness" INTEGER NOT NULL,
    "acidity" INTEGER NOT NULL,
    "bitterness" INTEGER NOT NULL,
    "body" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "notes" TEXT,
    "grinderId" TEXT,
    "dripperId" TEXT,
    "espressoMachineId" TEXT,
    "filterId" TEXT,
    "kettleId" TEXT,
    "scaleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "brewId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "water" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Step_brewId_order_idx" ON "Step"("brewId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Step_brewId_order_key" ON "Step"("brewId", "order");

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_dripperId_fkey" FOREIGN KEY ("dripperId") REFERENCES "Dripper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_espressoMachineId_fkey" FOREIGN KEY ("espressoMachineId") REFERENCES "EspressoMachine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "Filter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_kettleId_fkey" FOREIGN KEY ("kettleId") REFERENCES "Kettle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_scaleId_fkey" FOREIGN KEY ("scaleId") REFERENCES "Scale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_brewId_fkey" FOREIGN KEY ("brewId") REFERENCES "Brew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
