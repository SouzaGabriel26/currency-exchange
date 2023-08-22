import { usdTogbp } from './usd-gbp';
import { gbpTousd } from './gbp-usd';

export interface TradeParam {
  inputValue: number;
}

export const tradesService = {
  usdTogbp,
  gbpTousd,
}
