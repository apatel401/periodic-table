# @stem_dev/periodic-table

A modern, interactive periodic table library for React and standalone web applications.

## Features
- **Interactive 3D Visualization**: Explore atomic structures and properties.
- **Responsive Design**: Optimized for both desktop and mobile layouts.
- **Dark Mode Support**: Built-in dark mode with easy toggling.
- **Library Mode**: Can be used as a React component or a standalone library.
- **TypeScript Support**: Full type definitions included.

## Installation

```bash
npm install @stem_dev/periodic-table
```

## Usage

### React

Import the `PeriodicTable` component and its styles into your React application.

```tsx
import { PeriodicTable } from '@stem_dev/periodic-table';
import '@stem_dev/periodic-table/style.css';

function App() {
  return (
    <div className="app">
      <PeriodicTable darkMode={true} />
    </div>
  );
}
```

### Standalone (Non-React)

You can use the `init` function to render the periodic table into any DOM element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Periodic Table Standalone</title>
  <link rel="stylesheet" href="node_modules/@stem_dev/periodic-table/dist/style.css">
</head>
<body>
  <div id="periodic-table-container"></div>

  <script type="module">
    import { init } from '@stem_dev/periodic-table';

    const container = document.getElementById('periodic-table-container');
    init(container, { darkMode: false });
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

## Styling

The library uses **Tailwind CSS** for its internal styling. The pre-built CSS file (`@stem_dev/periodic-table/style.css`) includes all the necessary styles.

## License
MIT
