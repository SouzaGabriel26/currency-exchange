import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/last/'
})

async function getUSDinGBP() {
  try {
    const response = await baseUrl.get('USD-GBP');
    const { data } = response;

    const bidValue = {
      description: 'usd in gbp',
      bidValue: parseFloat(data.USDGBP.bid),
      create_date: data.USDGBP.create_date
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa USD-GBP');
  }
}

async function getGBPinUSD() {
  try {
    const response = await baseUrl.get('GBP-USD');
    const { data } = response;

    const bidValue = {
      description: 'gbp in usd',
      bidValue: parseFloat(data.GBPUSD.bid),
      create_date: data.GBPUSD.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa GBP-USD');
  }
}

export { getGBPinUSD, getUSDinGBP };