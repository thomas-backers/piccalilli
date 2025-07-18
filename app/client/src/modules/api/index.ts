import axios, { type AxiosResponse } from "axios";

export type Errors = Record<string, string[]>;

export interface Answer<Payload extends object> {
  errors: Errors;
  message: string;
  payload: Payload;
}

const api = axios.create();

export const post = async <Payload extends object, Data extends object>(
  url: string,
  data?: Data
): Promise<Answer<Payload>> => {
  try {
    const { data: answer }: AxiosResponse<Answer<Payload>> = await api.post(
      url,
      data,
      {
        validateStatus: () => true,
      }
    );
    return answer;
  } catch (error: unknown) {
    return {
      errors: {
        global: ["Disconnected from the server."],
      },
      message: "An error occurred while processing your request",
      payload: {} as Payload,
    };
  }
};
