import { type Prisma, PrismaClient } from "@prisma/client";

class TradesRepository {

  private readonly prisma = new PrismaClient();

  findUnique(findUniqueDto: Prisma.TradeFindUniqueArgs) {
    return this.prisma.trade.findUnique(findUniqueDto);
  }

  findMany(findManyDto?: Prisma.TradeFindManyArgs) {
    return this.prisma.trade.findMany(findManyDto);
  }

  create(createDto: Prisma.TradeCreateArgs) {
    return this.prisma.trade.create(createDto);
  }

  delete(deleteDto: Prisma.TradeDeleteArgs) {
    return this.prisma.trade.delete(deleteDto);
  }

}

export default new TradesRepository();