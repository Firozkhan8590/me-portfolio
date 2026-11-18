/**
 * Secure One-Time Local Script to Reset Owner Password
 * Never commits passwords to Git. Runs locally against Neon PostgreSQL.
 */

const { Client } = require("pg");
const crypto = require("crypto");
const readline = require("readline");
const dotenv = require("dotenv");
dotenv.config();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

function promptPassword(promptText) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Simple hidden/plain prompt for Node terminal
    rl.question(promptText, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

async function main() {
  console.log("==================================================");
  console.log("FIROZKHAN PORTFOLIO · SECURE OWNER PASSWORD RESET");
  console.log("==================================================\n");

  const email = (process.env.ADMIN_OWNER_EMAIL || "firoznissar@gmail.com").toLowerCase();

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // 1. Locate existing Owner account
  const res = await client.query('SELECT id, email, name, role FROM "AdminUser" WHERE email = $1', [email]);
  if (res.rows.length === 0) {
    console.error(`[ERROR] No account found with email "${email}".`);
    await client.end();
    process.exit(1);
  }

  const owner = res.rows[0];
  console.log(`Located Account: ${owner.name} (${owner.email})`);
  console.log(`Role: ${owner.role}`);
  console.log(`Account ID: ${owner.id}\n`);

  // 2. Get new password (from argument, env var, or interactive prompt)
  let newPassword = process.argv[2] || process.env.NEW_OWNER_PASSWORD;

  if (!newPassword) {
    newPassword = await promptPassword("Enter new password for OWNER account (min 8 characters): ");
  }

  if (!newPassword || newPassword.length < 8) {
    console.error("\n[ERROR] Password must be at least 8 characters long.");
    await client.end();
    process.exit(1);
  }

  // 3. Hash with PBKDF2/SHA-512 + 100,000 iterations
  const { salt, hash } = hashPassword(newPassword);

  // 4. Update password in Neon PostgreSQL without modifying other account or portfolio data
  await client.query(
    'UPDATE "AdminUser" SET "passwordHash" = $1, salt = $2, "failedLogins" = 0, "lockedUntil" = NULL, "updatedAt" = NOW() WHERE id = $3',
    [hash, salt, owner.id]
  );

  // 5. Invalidate existing sessions so new password is required
  await client.query('DELETE FROM "AdminSession" WHERE "userId" = $1', [owner.id]);

  console.log("\n[SUCCESS] Password updated successfully in Neon PostgreSQL!");
  console.log("All existing sessions revoked. Zero portfolio records modified.");
  console.log("You can now log in at /admin/login using your new password.\n");

  await client.end();
}

main().catch((err) => {
  console.error("Password reset failure:", err);
  process.exit(1);
});

