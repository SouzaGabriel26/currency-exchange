import { type Prisma, PrismaClient } from "@prisma/client";

class UsersRepository {
  private readonly prisma = new PrismaClient();

  findAll(findAllDto?: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(findAllDto);
  }

  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.UserCreateArgs) {
    return this.prisma.user.create(createDto);
  }

  update(updateDto: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(updateDto);
  }

  delete(deleteDto: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(deleteDto);
  }
}

export default new UsersRepository();