import { Response } from 'express';
import { getGBPinUSD, getUSDinGBP } from '../utils/handleCurrencies/getBidValue';
import { CustomRequest } from '../interfaces/CustomRequest';
import TradesRepository from '../repository/TradesRepository';

class TradesController {

  async findAll(req: CustomRequest, res: Response) {
    const { userId } = req.params;

    if (userId !== req.userId) {
      return res.status(402).json({ error: 'Unauthorized' });
    }

    const userTrades = await TradesRepository.findMany({
      where: {
        userId
      }
    });

    return res.json({ userTrades });
  }

  async create(req: CustomRequest, res: Response) {
    const { trade } = req.params;
    const { inputValue }: { inputValue: number } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(409).json({ error: 'Unauthorized' });
    }

    if (!inputValue) {
      return res.status(402).json({ error: 'input Value required' });
    }

    if (['usd-gbp', 'gbp-usd'].includes(trade)) {
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

      if (bidValueObj) {
        const newTrade = await TradesRepository.create({
          data: {
            userId,
            createdAt: new Date(),
            currentBidValue: bidValueObj.bidValue,
            currentBidDate: bidValueObj.create_date,
            description: bidValueObj.description,
            inputValue: inputValue,
            outputValue: outputValue,
          },
        });

        return res.status(201).json({ newTrade });
      }
    }

    return res.status(404).json({ error: `Trade direction ${trade} not found` });

  }

  async delete(req: CustomRequest, res: Response) {
    const { tradeId } = req.params;
    const userId = req.userId;

    const isUserOwner = await TradesRepository.findUnique({
      where: {
        id: tradeId,
        userId
      }
    });

    if(!isUserOwner) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    await TradesRepository.delete({
      where: {
        id: tradeId
      }
    });

    return res.status(204).json({ message: 'Trade deleted succesfully' });

  }

}

export default new TradesController();