export type Errors = Record<string, string[]>;

export interface Answer<Payload extends object> {
  errors: Errors;
  message: string;
  payload: Payload;
}
