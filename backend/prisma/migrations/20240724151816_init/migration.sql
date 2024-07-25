-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLogin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "AdminLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invite" (
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "organization_list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "organization_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_policy" (
    "id" SERIAL NOT NULL,
    "policy_name" TEXT NOT NULL,

    CONSTRAINT "user_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "user_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminLogin_email_key" ON "AdminLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invite_email_key" ON "invite"("email");
