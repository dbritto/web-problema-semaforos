/**
 * CONTRATO DDD: Objeto de Valor (Value Object)
 * Un Value Object es inmutable, valida sus propias invariantes al crearse
 * y se compara por la igualdad estructural de sus propiedades, no por un ID.
 */
export abstract class ValueObject<TProps> {
  public readonly props: Readonly<TProps>;

  protected constructor(props: TProps) {
    this.validate(props);
    this.props = Object.freeze({ ...props });
  }

  /**
   * Cada Value Object debe implementar sus propias reglas de negocio/invariantes.
   * Si las reglas no se cumplen, debe lanzar un DomainError.
   */
  protected abstract validate(props: TProps): void;

  public equals(vo?: ValueObject<TProps>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
