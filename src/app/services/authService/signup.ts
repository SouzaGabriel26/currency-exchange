import { httpClient } from "../httpClient";

export interface SignupParams {
  email: string,
  name: string,
  password: string,
}

interface SignupResponse {
  token: string,
}

export async function signup(params: SignupParams) {
    const { data } = await httpClient.post<SignupResponse>('/auth/signup', params);

    return data;
}
