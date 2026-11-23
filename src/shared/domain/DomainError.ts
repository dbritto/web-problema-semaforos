/**
 * CONTRATO DDD: Error de Dominio (DomainError)
 * Representa una violación a una regla de negocio dentro del dominio.
 */
export class DomainError extends Error {
  public readonly code: string;

  constructor(message: string, code = 'DOMAIN_RULE_VIOLATION') {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}
