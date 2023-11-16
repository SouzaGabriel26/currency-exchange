import { Response } from 'express';
import { CustomRequest } from '../middlewares/userAuth';
import TradesRepository from '../repository/TradesRepository';
import { getBRLinGBP, getBRLinUSD, getGBPinBRL, getGBPinUSD, getUSDinBRL, getUSDinGBP } from '../utils/getBidValue';

class TradesController {

  async findAllByUserId(req: CustomRequest, res: Response) {
    const { userId } = req;

    if (userId !== req.userId) {
      return res.status(402).json({ error: 'Unauthorized' });
    }

    const userTrades = await TradesRepository.findMany({
      where: {
        userId
      }
    });

    return res.json(userTrades);
  }

  async create(req: CustomRequest, res: Response) {
    const { trade } = req.params;
    const { inputValue }: { inputValue: number } = req.body;
    const { userId }= req;

    if (!userId) {
      return res.status(409).json({ error: 'Unauthorized' });
    }

    if (!inputValue) {
      return res.status(402).json({ error: 'input Value required' });
    }

    if (['usd-gbp', 'gbp-usd', 'brl-usd', 'usd-brl', 'brl-gbp', 'gbp-url'].includes(trade)) {
      let outputValue = 0;
      let bidValueObj;

      if (trade === 'usd-gbp') {
        bidValueObj = await getUSDinGBP();
        outputValue = inputValue * bidValueObj.bidValue;
      }
  
      if (trade === 'gbp-usd') {
        bidValueObj = await getGBPinUSD();
        outputValue = inputValue * bidValueObj.bidValue;
      }

      if (trade === 'brl-usd') {
        bidValueObj = await getBRLinUSD();
        outputValue = inputValue * bidValueObj.bidValue;
      }

      if (trade === 'usd-brl') {
        bidValueObj = await getUSDinBRL();
        outputValue = inputValue * bidValueObj.bidValue;
      }

      if (trade === 'brl-gbp') {
        bidValueObj = await getBRLinGBP();
        outputValue = inputValue * bidValueObj.bidValue;
      }

      if (trade === 'gbp-brl') {
        bidValueObj = await getGBPinBRL();
        outputValue = inputValue * bidValueObj.bidValue;
      }

      if (bidValueObj) {
        const newTrade = await TradesRepository.create({
          data: {
            userId,
            createdAt: String(Date.now()),
            currentBidValue: bidValueObj.bidValue,
            currentBidDate: bidValueObj.create_date,
            description: bidValueObj.description,
            inputValue: inputValue,
            outputValue: outputValue,
          },
        });

        return res.status(201).json(newTrade);
      }
    }

    return res.status(404).json({ error: `Incorrect trade direction: ${trade}.` });

  }

  async delete(req: CustomRequest, res: Response) {
    const { tradeId } = req.params;
    const { userId } = req;

    await TradesRepository.delete({
      where: {
        id: tradeId,
        userId
      }
    });

    return res.status(204).json({ message: 'Trade deleted succesfully' });

  }

}

export default new TradesController();