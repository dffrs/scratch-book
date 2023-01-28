import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createDummyUser = async () => {
  // await prisma.use
  //   .findFirst({ where: { firstName: "Daniel", lastName: "Rodrigues", age: 26 } })
  //   .then(async (e) => await prisma.use.delete({ where: { id: e?.id } }));
  const userCreated = await prisma.use.create({ data: { firstName: "Daniel", lastName: "Rodrigues", age: 26 } });
  console.log("created user", userCreated);
  return userCreated;
};

const getDummyUser = async () => {
  const dummyUser = await prisma.use.findFirst({ where: { firstName: "Daniel" } });
  return dummyUser;
};

const runModifier = async <T extends () => Promise<any>>(cb: T): Promise<Awaited<ReturnType<T>>> => {
  return Promise.resolve(cb())
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
};

type User = Prisma.UseGetPayload<{}>;
export type { User };
export { createDummyUser, getDummyUser, runModifier };
