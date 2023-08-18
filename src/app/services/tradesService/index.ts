import { usdTogbp } from './usd-gbp';
import { gbpTousd } from './gbp-usd';
import { getAllbyUser } from './getAllbyUser';

export interface TradeParam {
  inputValue: number;
}

export const tradesService = {
  usdTogbp,
  gbpTousd,
  getAllbyUser
}
