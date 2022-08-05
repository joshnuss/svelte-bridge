# vite-plugin-svelte-bridge

Use your Svelte componentes from React & Vue.

This plugin generates wrapper components in `dist/react` and `dist/vue` at build time.

## Setup

Install the package:

```bash
pnpm install -D vite-plugin-svelte-bridge
```

Add `react` and `vue` plugins to `vite.config.js`:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { svelte } from 'vite-plugin-svelte'
import { react, vue } from 'vite-plugin-svelte-bridge'

export default defineConfig({
  plugins: [ svelte(), react(), vue() ]
})
```

Update `package.json`:

1. Add `dist/react` and `dist/vue` to the `exports` section

```javascript
"exports": {
  ".": "./dist/index.js",
  "./react/*": "./dist/react/*",
  "./vue/*": "./dist/vue/*"
}
```

2. Specify which components should be wrapped:

```javascript
"bridge": {
  "MyComponent": "src/lib/MyComponent.svelte"
}
```

Running `vite build` will generate a `dist/react/MyComponent.jsx` and a `dist/vue/MyComponent.vue`.

## Usage

### React

To access a component from a React project, install the package:

```bash
pnpm install -D my-svelte-lib
```

Then import the component from the `react/` folder:

```jsx
// in src/App.jsx
import MyComponent from 'my-svelte-lib/react/MyComponent.jsx'

export default function App() {
  return <MyComponent prop={42} onClick={() => alert('clicked')}/>
}
```

### Vue

To access a component from a Vue project, install the package:

```bash
pnpm install -D my-svelte-lib
```

Then import the component from the `vue/` folder:

```vue
<!-- in src/App.vue -->
<script setup>
  import MyComponent from 'my-svelte-lib/vue/MyComponent.vue'
</script>

<template>
  <MyComponent prop={42} @click="alert('clicked')"/>
</template>
```

## Caveats

The following features are not supported (yet?):

- Slots
- 2-way data binding
- Types

## License

MIT
