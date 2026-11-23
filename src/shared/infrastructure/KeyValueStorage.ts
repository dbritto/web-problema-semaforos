/**
 * CONTRATO DE INFRAESTRUCTURA COMPARTIDA: StoragePort
 * Permite que los adaptadores de infraestructura persistan datos sin acoplarse a localStorage o IndexedDB.
 */
export interface KeyValueStoragePort {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}

export class InMemoryStorageAdapter implements KeyValueStoragePort {
  private readonly store = new Map<string, unknown>();

  public getItem<T>(key: string): T | null {
    return (this.store.get(key) as T) ?? null;
  }

  public setItem<T>(key: string, value: T): void {
    this.store.set(key, value);
  }

  public removeItem(key: string): void {
    this.store.delete(key);
  }
}
