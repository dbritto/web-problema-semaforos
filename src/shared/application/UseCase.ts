/**
 * CONTRATO HEXAGONAL (CAPA DE APLICACIÓN): Caso de Uso (UseCase)
 * Todo caso de uso del sistema implementa este contrato único.
 * Recibe un comando/consulta (TInput) y retorna una promesa o valor (TOutput).
 */
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
