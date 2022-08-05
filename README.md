# vite-plugin-svelte-bridge

Use your Svelte componentes from React & Vue.

This plugin generates React & Vue wrapper components in `dist/react` and `dist/vue`.


## Setup

Install the package

```bash
pnpm install -D vite-plugin-svelte-bridge
```

Add plugins in your `vite.config.js`:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { svelte } from 'vite-plugin-svelte'
import { react, vue } from 'vite-plugin-svelte-bridge'

export default defineConfig({
  plugins: [ svelte(), react(), vue() ]
})
```

Specify which components should be bridged in your `package.json`:

```javascript
"bridge": {
  "MyComponent": "src/lib/MyComponent.svelte"
}
```

This will generate a `dist/react/MyComponent.jsx` and a `dist/vue/MyComponent.vue`.

Also add the `dist/react` and `dist/vue` to the `exports` section in `package.json`:

```javascript
"exports": {
  "./react/*": "./dist/react/*",
  "./vue/*": "./dist/vue/*"
}
```

## Usage

### React

To access a component from a React project.

First, install the package:

```bash
pnpm install -D my-svelte-lib
```

Then import the component from the `reac5/` folder:

```jsx
// in src/App.jsx
import MyComponent from 'my-svelte-lib/react/MyComponent.jsx'

export default App() {
  return <MyComponent prop={42} onClick={() => alert('clicked')}/>
}
```

### Vue

To access a component from a Vue project.

First, install the package:

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

The following Svelte features are not supported:

- Slots
- 2-way data binding

## License

MIT
