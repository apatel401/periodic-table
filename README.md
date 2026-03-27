# @stem_dev/periodic-table

A modern, interactive periodic table library for React and standalone web applications.

## Features
- **Interactive 3D Visualization**: Explore atomic structures and properties.
- **Responsive Design**: Optimized for both desktop and mobile layouts.
- **Dark Mode Support**: Built-in dark mode with easy toggling.
- **Dual Build Mode**: 
  - **Standard Library**: Externalized dependencies (React, Three.js, etc.) for React projects.
  - **Standalone UMD**: Bundled dependencies for direct browser use without a build step.
- **TypeScript Support**: Full type definitions included.
- **Zero-Config CSS**: Styles are automatically injected into the DOM.

## Installation

```bash
npm install @stem_dev/periodic-table
```

## Usage

### React

Import the `PeriodicTable` component into your React application. Styles are automatically injected.

```tsx
import { PeriodicTable } from '@stem_dev/periodic-table';

function App() {
  return (
    <div className="app">
      <PeriodicTable darkMode={true} />
    </div>
  );
}
```

### Standalone (Non-React / UMD)

For projects without a build system, use the standalone UMD build. This version includes React and all other dependencies bundled in a single file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Periodic Table Standalone</title>
  <!-- Load the standalone UMD build -->
  <script src="node_modules/@stem_dev/periodic-table/dist/build/index.umd.js"></script>
</head>
<body>
  <div id="periodic-table-container" style="height: 100vh;"></div>

  <script>
    // The library is available under the global 'PeriodicTable' variable
    const { init } = window.PeriodicTable;

    // Initialize by passing a CSS selector and optional props
    init('#periodic-table-container', { 
      darkMode: true,
      showSpectrum: true,
      showBohrModel: true
    });
  </script>
</body>
</html>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `darkMode` | `boolean` | `false` | Enables or disables dark mode. |
| `showSpectrum` | `boolean` | `true` | Show/hide the emission spectrum in the element modal. |
| `showBohrModel` | `boolean` | `true` | Show/hide the 3D Bohr model in the element modal. |

## Development & Build

The project uses a dual-config build system to provide both a lean library and a standalone bundle.

- **Standard Build (ESM/CJS)**: `npm run build`
  - Outputs to `dist/`
  - Externalizes React, Three.js, etc.
  - Included in the npm package.
- **Standalone Build (UMD)**: `npm run build:umd`
  - Outputs to `dist/build/`
  - Bundles all dependencies.
  - Excluded from the npm package to keep the install size small.

## License
MIT
