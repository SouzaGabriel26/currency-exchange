import { tradesService } from "../services/tradesService";

export async function serviceByCurrency(inputCurrency: string, outputCurrency: string, value: number) {
  if (inputCurrency === 'usd') {
    if (outputCurrency === 'brl') {
      const data = await tradesService.usdTobrl({ inputValue: value });
      return data;
    } else if (outputCurrency === 'gbp') {
      const data = await tradesService.usdTogbp({ inputValue: value });
      return data;
    }
  }

  if (inputCurrency === 'brl') {
    if (outputCurrency === 'usd') {
      const data = await tradesService.brlTousd({ inputValue: value });
      return data;
    } else if (outputCurrency === 'gbp') {
      const data = await tradesService.brlTogbp({ inputValue: value });
      return data;
    }
  }

  if (inputCurrency === 'gbp') {
    if (outputCurrency === 'usd') {
      const data = await tradesService.gbpTousd({ inputValue: value });
      return data;
    } else if (outputCurrency === 'brl') {
      const data = await tradesService.gbpTobrl({ inputValue: value });
      return data;
    }
  }
}
