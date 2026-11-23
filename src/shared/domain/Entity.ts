/**
 * CONTRATO DDD: Entidad Base (Entity)
 * Una entidad se define por su identidad única (id) y su ciclo de vida, no solo por sus atributos.
 */
export abstract class Entity<TProps, TId = string> {
  protected readonly _id: TId;
  protected readonly props: TProps;

  protected constructor(props: TProps, id: TId) {
    this._id = id;
    this.props = props;
  }

  public get id(): TId {
    return this._id;
  }

  public equals(object?: Entity<TProps, TId>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    return this._id === object._id;
  }
}
