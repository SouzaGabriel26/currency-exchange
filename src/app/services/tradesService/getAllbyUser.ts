import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";


export async function getAllbyUser(userId: string) {
  const { data } = await httpClient.get<TradeInterface[]>(`/trades/${userId}`);

  return data;
}
