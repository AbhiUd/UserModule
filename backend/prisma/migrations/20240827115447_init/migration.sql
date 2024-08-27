-- CreateTable
CREATE TABLE "SuperAdminLogin" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,

    CONSTRAINT "SuperAdminLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLogin" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "AdminLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLogin" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "usergroupid" INTEGER,

    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "superadminId" INTEGER NOT NULL,

    CONSTRAINT "OrganizationList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "create_op" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "superAdminId" INTEGER,
    "AdminId" INTEGER,
    "UserId" INTEGER,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "ResourceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperadminToAdminInvite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "superAdminId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "SuperadminToAdminInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminToUserInvite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "AdminToUserInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_schema" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_ug_map" (
    "id" SERIAL NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "ug_id" INTEGER NOT NULL,
    "read_op" BOOLEAN NOT NULL,
    "edit_op" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "resource_ug_map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceHistory" (
    "id" SERIAL NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "editedByUser" INTEGER,
    "editedByAdmin" INTEGER,
    "editedAt" TIMESTAMP(3) NOT NULL,
    "changes" JSONB,

    CONSTRAINT "ResourceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdminLogin_email_key" ON "SuperAdminLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminLogin_email_key" ON "AdminLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_email_key" ON "UserLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperadminToAdminInvite_email_key" ON "SuperadminToAdminInvite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminToUserInvite_email_key" ON "AdminToUserInvite"("email");

-- AddForeignKey
ALTER TABLE "AdminLogin" ADD CONSTRAINT "AdminLogin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminLogin" ADD CONSTRAINT "AdminLogin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLogin" ADD CONSTRAINT "UserLogin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLogin" ADD CONSTRAINT "UserLogin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLogin" ADD CONSTRAINT "UserLogin_usergroupid_fkey" FOREIGN KEY ("usergroupid") REFERENCES "UserGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationList" ADD CONSTRAINT "OrganizationList_superadminId_fkey" FOREIGN KEY ("superadminId") REFERENCES "SuperAdminLogin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceList" ADD CONSTRAINT "ResourceList_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdminLogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceList" ADD CONSTRAINT "ResourceList_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "AdminLogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceList" ADD CONSTRAINT "ResourceList_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "UserLogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceList" ADD CONSTRAINT "ResourceList_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuperadminToAdminInvite" ADD CONSTRAINT "SuperadminToAdminInvite_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdminLogin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuperadminToAdminInvite" ADD CONSTRAINT "SuperadminToAdminInvite_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminToUserInvite" ADD CONSTRAINT "AdminToUserInvite_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminLogin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminToUserInvite" ADD CONSTRAINT "AdminToUserInvite_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_ug_map" ADD CONSTRAINT "resource_ug_map_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "ResourceList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_ug_map" ADD CONSTRAINT "resource_ug_map_ug_id_fkey" FOREIGN KEY ("ug_id") REFERENCES "UserGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_ug_map" ADD CONSTRAINT "resource_ug_map_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceHistory" ADD CONSTRAINT "ResourceHistory_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "ResourceList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceHistory" ADD CONSTRAINT "ResourceHistory_editedByUser_fkey" FOREIGN KEY ("editedByUser") REFERENCES "UserLogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceHistory" ADD CONSTRAINT "ResourceHistory_editedByAdmin_fkey" FOREIGN KEY ("editedByAdmin") REFERENCES "AdminLogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
