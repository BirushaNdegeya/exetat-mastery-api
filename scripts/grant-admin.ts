import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../src/models/user.model';
import { UserRole, UserRoleEnum } from '../src/models/user-role.model';

async function main() {
  const email = process.argv[2]?.trim() || 'birushandegeya@gmail.com';
  const name = email.split('@')[0] || 'Utilisateur';

  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [User, UserRole],
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });

  await sequelize.authenticate();

  const [user] = await User.findOrCreate({
    where: { email },
    defaults: { email, name },
  });

  await UserRole.findOrCreate({
    where: { userId: user.id, role: UserRoleEnum.ADMIN },
    defaults: { userId: user.id, role: UserRoleEnum.ADMIN },
  });

  // eslint-disable-next-line no-console
  console.log(`OK: ${email} est maintenant admin (userId=${user.id}).`);

  await sequelize.close();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Erreur:', err);
  process.exitCode = 1;
});

