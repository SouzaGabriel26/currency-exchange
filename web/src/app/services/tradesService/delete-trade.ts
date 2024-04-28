import { httpClient } from "../httpClient";

export async function deleteTrade(tradeId: string) {
  const { data } = await httpClient.delete(`/trade/${tradeId}`)

  return data;
}
