---
description: Reglas obligatorias de Arquitectura Hexagonal, DDD, Diseño Modular, Atomic Design y Componentes Smart/Dumb en TypeScript
---

# Reglas de Contexto Arquitectónico (Siempre Activas)

1. **Separación Hexagonal + DDD**:
   - Toda regla de negocio, invariante o cálculo debe vivir en `src/modules/<modulo>/domain/` (dentro de `entities`, `value-objects` o `services`).
   - La capa `domain` NUNCA debe importar React ni librerías externas de infraestructura.
   - Toda comunicación hacia el exterior desde `domain` o `application` se define mediante interfaces en `domain/ports/` y se implementa en `infrastructure/adapters/`.

2. **Contratos Base en `src/shared/`**:
   - Las entidades deben extender `Entity<TProps, TId>` de `@shared/domain/Entity`.
   - Los Objetos de Valor deben extender `ValueObject<TProps>` de `@shared/domain/ValueObject`.
   - Los Casos de Uso deben implementar `UseCase<TRequest, TResponse>` de `@shared/application/UseCase`.

3. **Smart vs. Dumb Components + Atomic Design**:
   - **Dumb Components (Brutos)**: Ubicados en `shared/presentation/ui/{atoms,molecules,organisms,templates}` o `modules/<modulo>/presentation/components/{atoms,molecules,organisms,templates}`. Solo reciben `props` (tipadas con `DumbComponentProps`) y emiten callbacks. Prohibido inyectar casos de uso o repositorios en ellos.
   - **Smart Components (Inteligentes)**: Ubicados en `modules/<modulo>/presentation/containers/`. Inyectan casos de uso mediante hooks, transforman entidades a ViewModels/Props y renderizan Dumb Components.
