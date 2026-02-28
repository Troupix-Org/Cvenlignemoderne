# Project Context

## Purpose
This project, "CV en ligne moderne," is a web application designed to create and display modern, online CVs (resumes). It provides users with multiple distinct visual templates, including "Ultimate," "Creative," "Interactive," and "Simple" layouts, accessible through different routes.

## Tech Stack
- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **UI Components**: The project uses a component-based architecture with UI components from [shadcn/ui](httpsci.cn), which are built on Radix UI primitives. It also includes dependencies for Material-UI and Emotion, suggesting a potential mix of UI libraries.

## Project Conventions

### Code Style
- **Component Naming**: Components are written in PascalCase (e.g., `CreativeCv.tsx`).
- **File Structure**: A clear separation of concerns is visible, with distinct directories for pages, UI components, and routing configuration.
- **Imports**: The project uses a path alias `@/` which resolves to the `src/` directory for cleaner, absolute imports.

### Architecture Patterns
- **Application Type**: Single Page Application (SPA).
- **Routing**: Centralized routing is managed in `src/app/routes.ts`, which maps URL paths to specific page components.
- **Component Structure**:
  - Top-level pages are located in `src/app/pages/`.
  - Reusable, generic UI components are organized within `src/app/components/ui/`.

### Testing Strategy
[This is not yet defined in the project structure. A recommended approach would be to use Vitest for unit/integration testing and React Testing Library for component testing.]

### Git Workflow
[This is not yet defined. A common convention is to use a main branch for production, a develop branch for integration, and feature branches for new development (e.g., GitFlow or a simplified version).]

## Domain Context
The core domain is personal resume and portfolio presentation. The application treats a user's CV data as a model and presents it through various "view" templates. The key entities are the different CV styles (Ultimate, Creative, etc.) and the underlying CV data structure (which would be defined in `src/app/data/cvData.ts`).

## Important Constraints
There are no apparent technical, business, or regulatory constraints based on the current project structure.

## External Dependencies
There are no external service or API dependencies identified in the current project configuration.
