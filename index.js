import { PrismaClient } from '@prisma/client/';

const prisma = new PrismaClient();

const main = async () => {
  // ✅ create (insert Data)
  // 🖐 single user
  const user = await prisma.user.create({
    data: {
      email: "emam123@gmail.com",
      name: "Emam",
    },
  });
  console.log(user);
  
};



main()
  .catch(e => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

