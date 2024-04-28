import { brlTogbp } from './brl-gbp';
import { brlTousd } from './brl-usd';
import { gbpTobrl } from './gbp-brl';
import { gbpTousd } from './gbp-usd';
import { usdTobrl } from './usd-brl';
import { usdTogbp } from './usd-gbp';

import { deleteTrade } from './delete-trade';

export interface TradeParam {
  inputValue: number;
}

export const tradesService = {
  usdTogbp,
  gbpTousd,
  deleteTrade,
  brlTogbp,
  gbpTobrl,
  brlTousd,
  usdTobrl,
}
