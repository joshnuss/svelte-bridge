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

Also add the `dist/react` and `dist/vue` to the `exports` section in `pacakge.json`:

```javascript
"exports": {
  "./react/*": "./dist/react/*",
  "./vue/*": "./dist/vue/*"
}
```

## Usage

### React

To access a component from a React project:

```jsx
import MyComponent from 'my-lib/react/MyComponent.jsx'

export default App() {
  return <MyComponent prop={42} onClick={() => alert('clicked')}/>
}
```

### Vue

To access a component from a Vue project:

```vue
<script setup>
  import MyComponent from 'my-lib/vue/MyComponent.vue'
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
