import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/last/'
})

async function getUSDinGBP() {
  try {
    const response = await baseUrl.get('USD-GBP');
    const { data } = response;

    const bidValue = {
      description: 'De usd para gbp',
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
      description: 'De gbp para usd',
      bidValue: parseFloat(data.GBPUSD.bid),
      create_date: data.GBPUSD.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa GBP-USD');
  }
}

async function getUSDinBRL() {
  try {
    const response = await baseUrl.get('USD-BRL');
    const { data } = response;

    const bidValue = {
      description: 'De usd para brl',
      bidValue: parseFloat(data.USDBRL.bid),
      create_date: data.USDBRL.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa USD-BRL');
  }
}

async function getBRLinUSD() {
  try {
    const response = await baseUrl.get('BRL-USD');
    const { data } = response;

    const bidValue = {
      description: 'De brl para usd',
      bidValue: parseFloat(data.BRLUSD.bid),
      create_date: data.BRLUSD.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa BRL-USD');
  }
}

async function getBRLinGBP() {
  try {
    const response = await baseUrl.get('BRL-GBP');
    const { data } = response;

    const bidValue = {
      description: 'De brl para gbp',
      bidValue: parseFloat(data.BRLGBP.bid),
      create_date: data.BRLGBP.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa BRL-GBP');
  }
}

async function getGBPinBRL() {
  try {
    const response = await baseUrl.get('GBP-BRL');
    const { data } = response;

    const bidValue = {
      description: 'De gbp para brl',
      bidValue: parseFloat(data.GBPBRL.bid),
      create_date: data.GBPBRL.create_date,
    }

    return bidValue;

  } catch (error) {
    console.log(error);
    throw new Error('Falha ao obter a taxa GBP-BRL');
  }
}

export {
  getBRLinGBP, getBRLinUSD, getGBPinBRL, getGBPinUSD,
  getUSDinBRL, getUSDinGBP
};
