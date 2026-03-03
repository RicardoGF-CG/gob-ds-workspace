# GobDs - Design System

@gob-ds/gob-ds is a modern, high-performance design system built with **Angular 21**, **SCSS**, and **Lucide Icons**. It provides a set of reusable components and a robust design token system to ensure consistency across digital products.

## ✨ Key Features

- **Component Library**: Primitive and complex components (Button, Badge, Alert Dialog, etc.).
- **Design Tokens**: Centralized tokens for colors, typography, spacing, shadows, and borders.
- **Storybook Integration**: Interactive documentation and component testing environment.
- **Modern Tech Stack**: Leveraging the latest Angular features and Vitest for testing.
- **Premium Aesthetics**: Curated color palettes and smooth micro-interactions.

## 🛠 Tech Stack

- **Framework**: [Angular 21](https://angular.io/)
- **Documentation**: [Storybook 10](https://storybook.js.org/)
- **Styling**: Vanilla SCSS with a Token System
- **Icons**: [Lucide Angular](https://lucide.dev/guide/packages/lucide-angular)
- **Testing**: [Vitest](https://vitest.dev/)
- **Runtime**: Node.js v24.13.1

## 🚀 Getting Started

### Prerequisites

Ensure you have the correct Node.js version installed (defined in `.nvmrc`).

```bash
nvm use
```

### Installation

```bash
npm install
```

### Development

To start the component library in Storybook:

```bash
npm run storybook
```

To run the Angular application:

```bash
npm start
```

## 📂 Project Structure

- `src/app/lib/`: Core component library.
  - `alert-dialog/`
  - `badge/`
  - `button/`
  - `checkbox/`
  - `input/`
  - `search/`
- `src/tokens/`: Design system tokens (SCSS & TS).
  - `styles/`: SCSS partials for colors, spacing, typography, etc.
- `src/stories/`: Global Storybook configurations and documentation stories.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Runs Storybook for component development. |
| `npm start` | Runs the Angular dev server. |
| `npm run build` | Builds the library/application. |
| `npm run test` | Runs unit tests using Vitest. |
| `npm run build-storybook` | Builds a static Storybook site. |

## 📄 License

Private - All rights reserved.
