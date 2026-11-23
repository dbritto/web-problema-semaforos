# 🏛️ CONTRATO DE ARQUITECTURA: React + TypeScript (DDD + Hexagonal + Modular + Atomic Design + Smart/Dumb)

> **PROPÓSITO DE ESTE DOCUMENTO**: Este archivo define el contrato inquebrantable de arquitectura del proyecto. Ni desarrolladores ni agentes de IA deben violar estas reglas para evitar perder el contexto a medida que el sistema escale.

---

## 1. Visión General y Regla de Dependencia (Arquitectura Hexagonal)

Toda la lógica de negocio vive exclusivamente en la capa de **Dominio (`domain`)**. React es únicamente un detalle de implementación en la capa de **Presentación (`presentation`)**.

```
[ Presentation (React: Smart Containers -> Dumb Atomic UI) ]
                        │
                        ▼
           [ Application (Use Cases) ]
                        │
                        ▼
  [ Domain (Entities, Value Objects, Domain Services, Ports) ]
                        ▲
                        │
   [ Infrastructure (API Repositories, LocalStorage, Mappers) ]
```

### Reglas Estrictas de Importación:
1. **`domain/`**:
   - **PROHIBIDO** importar React, hooks (`useState`, `useEffect`), librerías HTTP (`axios`), o cualquier archivo de `application`, `infrastructure` o `presentation`.
   - **PERMITIDO**: Solo TypeScript puro y primitivas de `@shared/domain`.
2. **`application/`**:
   - Orquesta las entidades del dominio ejecutando casos de uso (`UseCase`).
   - Depende únicamente de `domain/` (entidades y **Ports** / interfaces de repositorio).
   - **PROHIBIDO** importar React o implementaciones concretas de `infrastructure/`.
3. **`infrastructure/`**:
   - Implementa los **Ports** definidos en `domain/ports/` (ej. `ApiTrafficLightRepository implements TrafficLightRepositoryPort`).
   - Transforma DTOs externos al modelo de Dominio mediante `Mappers`.
4. **`presentation/`**:
   - Conecta los Casos de Uso con la interfaz en React mediante Custom Hooks, **Smart Components** y **Dumb Components** organizados con **Atomic Design**.

---

## 2. Diseño Modular vs. Carpeta `shared/`

El código se organiza en dos grandes bloques dentro de `src/`:

```
src/
├── app/                  # Punto de ensamblaje global (Inyección de Dependencias, Providers, Routing)
├── shared/               # Lógica, contratos y componentes transversales reutilizables en toda la app
│   ├── domain/           # Contratos base DDD (Entity, ValueObject, DomainError, Result)
│   ├── application/      # Contrato base UseCase<TInput, TOutput>
│   ├── infrastructure/   # Clientes HTTP base, Storage adapters, EventBus
│   └── presentation/     # Atomic Design compartido + Contratos Smart/Dumb Components
│       ├── contracts/    # Interfaces TypeScript para Smart y Dumb Components
│       └── ui/           # Componentes Brutos (Dumb) universales clasificados por Atomic Design
│           ├── atoms/
│           ├── molecules/
│           ├── organisms/
│           └── templates/
└── modules/              # Módulos de negocio independientes (Bounded Contexts de DDD)
    └── <module-name>/
        ├── domain/
        │   ├── entities/
        │   ├── value-objects/
        │   ├── errors/
        │   ├── services/
        │   └── ports/          # Interfaces (Contratos) que la infraestructura debe implementar
        ├── application/
        │   ├── use-cases/      # Casos de uso del módulo
        │   └── dtos/
        ├── infrastructure/
        │   ├── adapters/       # Implementaciones de los ports (API, Mock, WebSockets)
        │   └── mappers/
        └── presentation/
            ├── hooks/          # Adaptadores React para consumir Casos de Uso
            ├── containers/     # 🧠 COMPONENTES INTELIGENTES (Smart Components)
            ├── components/     # 🎨 COMPONENTES BRUTOS (Dumb Components del módulo en Atomic Design)
            │   ├── atoms/
            │   ├── molecules/
            │   ├── organisms/
            │   └── templates/
            └── pages/          # Páginas que ensamblan Templates y Smart Containers
```

---

## 3. Contrato de Componentes: Inteligentes (Smart) vs. Brutos (Dumb) + Atomic Design

Para evitar componentes acoplados y difíciles de mantener, todo componente de React debe cumplir uno de estos dos roles:

### 🎨 Componente Bruto (Dumb / Presentational Component)
- **Ubicación**: `src/shared/presentation/ui/{atoms,molecules,organisms,templates}` o `src/modules/<modulo>/presentation/components/{atoms,molecules,organisms,templates}`.
- **Reglas**:
  1. **Cero lógica de negocio**: No conoce Casos de Uso ni Repositorios.
  2. **Puro y predecible**: Recibe datos por `props` (`DumbComponentProps<TData, TActions>`) y emite eventos mediante callbacks (`onAction`).
  3. **Sin efectos secundarios de dominio**: No hace llamadas a APIs ni muta estado global.
  4. **Clasificación Atomic Design**:
     - **Atoms**: Elementos indivisibles (`Button`, `Badge`, `SignalLight`, `Typography`).
     - **Molecules**: Agrupación simple de átomos con una sola responsabilidad UI (`TrafficLightHead`, `MetricStatCard`).
     - **Organisms**: Secciones visuales completas compuestas por moléculas y átomos (`IntersectionControlCard`, `HeaderBar`).
     - **Templates**: Layouts estructurales sin datos reales, reciben componentes hijos o slots (`DashboardTemplate`).

### 🧠 Componente Inteligente (Smart / Container Component)
- **Ubicación**: `src/modules/<modulo>/presentation/containers/` o `pages/`.
- **Reglas**:
  1. **Orquestador**: Conecta los casos de uso (`application/use-cases`) a través de hooks (`presentation/hooks`) o del contenedor de dependencias.
  2. **Sin estilos complejos ni marcado pesado**: Su JSX se limita a invocar **Componentes Brutos** (Organisms/Templates/Molecules) pasándoles los datos ya procesados y las funciones manejadoras.
  3. **Cumple el contrato `SmartContainerContract`**: Maneja estados de carga, errores de dominio y despacho de casos de uso.

---

## 4. Checklist Antes de Crear Código Nuevo

1. ¿Es una regla o validación de negocio? ➡️ Va en `modules/<modulo>/domain/` (dentro de un `ValueObject`, `Entity` o `DomainService`).
2. ¿Es una acción que el usuario o sistema dispara? ➡️ Crea un `UseCase` en `modules/<modulo>/application/use-cases/`.
3. ¿Necesita guardar o leer datos externos? ➡️ Declara la interfaz (`Port`) en `domain/ports/` y créale su implementación (`Adapter`) en `infrastructure/adapters/`.
4. ¿Es un elemento visual reutilizable en 2 o más módulos? ➡️ Créalo como **Componente Bruto** en `shared/presentation/ui/<nivel-atomico>/`.
5. ¿Necesita conectar estado/casos de uso con la vista? ➡️ Crea un **Smart Container** en `modules/<modulo>/presentation/containers/` que renderice **Dumb Components**.
