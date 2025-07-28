import axios, { type AxiosResponse } from "axios";
import type { Answer } from "shared/types";

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
        global: ["Disconnected from the server"],
      },
      message: "Cannot send request",
      payload: {} as Payload,
    };
  }
};
