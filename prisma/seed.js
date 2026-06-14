// Seed the 14 EBSPL profiles as real User rows.
// Run with: npm run seed
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const profiles = require("./profiles.json");

const prisma = new PrismaClient();
const DEV_PASSWORD = "Ebspl@123"; // local dev password for ALL seeded users

async function main() {
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  for (const p of profiles) {
    const email = p.email.toLowerCase();
    await prisma.user.upsert({
      where: { email },
      update: {
        name: p.name,
        role: p.role,
        initial: p.initial,
        company: p.company,
        passwordHash,
      },
      create: {
        name: p.name,
        email,
        role: p.role,
        initial: p.initial,
        company: p.company,
        passwordHash,
        loginMethod: "password",
      },
    });
    console.log(`  seeded  ${p.role.padEnd(11)} ${p.name}  <${email}>`);
  }

  console.log(`\n✓ ${profiles.length} profiles seeded. Dev password for all: ${DEV_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
