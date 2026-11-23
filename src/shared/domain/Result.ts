/**
 * CONTRATO DDD: Result Pattern
 * Evita usar excepciones no controladas para flujos de negocio esperados.
 */
export type Result<TValue, TError = Error> =
  | { readonly isSuccess: true; readonly isFailure: false; readonly value: TValue }
  | { readonly isSuccess: false; readonly isFailure: true; readonly error: TError };

export const Result = {
  ok<TValue, TError = Error>(value: TValue): Result<TValue, TError> {
    return { isSuccess: true, isFailure: false, value };
  },
  fail<TValue, TError = Error>(error: TError): Result<TValue, TError> {
    return { isSuccess: false, isFailure: true, error };
  },
};
