import { usdTogbp } from './usd-gbp';
import { gbpTousd } from './gbp-usd';
import { deleteTrade } from './delete-trade';

export interface TradeParam {
  inputValue: number;
}

export const tradesService = {
  usdTogbp,
  gbpTousd,
  deleteTrade,
}
