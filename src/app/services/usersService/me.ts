import { httpClient } from "../httpClient";

interface MeResponse {
  id: string,
  email: string,
  name: string,
  trades: [],
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/user/me');

  return data;
}
