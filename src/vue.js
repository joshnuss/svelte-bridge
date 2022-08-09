import path from 'path'
import fs from 'fs'

let config

export default function react() {
  return {
    name: 'svelte-bridge-vue',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async closeBundle() {
      const outDir = path.join(config.build.outDir, 'vue')
      const packagePath = path.join(config.root, "package.json")
      const { bridge } = JSON.parse(await fs.promises.readFile(packagePath))

      if (!bridge) {
        throw new Error('missing key `bridge` in package.json')
      }

      await fs.promises.mkdir(outDir, { recursive: true })

      for (const [filePath, distPath] of Object.entries(bridge)) {
        const fullPath = path.join(outDir, distPath) + '.vue'
        const componentName = distPath
        const source = `
// generated by vite-plugin-svelte-bridge
<script>
  import { ${componentName} } from '../${config.build.lib.fileName}'

  export default {
    props: [
      // TODO?
    ],

    data() {
      return {
        component: null
      }
    },

    mounted() {
      this.component = new ${componentName}({
        target: this.$refs.element,
        props: this.$attrs
      })

      const eventPairs = Object.entries(this.$attrs).filter(([name, _]) => name.match(/^on./))

      eventPairs.forEach(([eventName, handler]) => {
        eventName = eventName.replace(/^on/, '')
        eventName = eventName[0].toLowerCase() + eventName.substring(1)

        this.component.$on(eventName, handler)
      })
    },

    unmounted() {
      this.component?.$destroy()
    },

    updated() {
      this.component.$set(this.$attrs)
    }
  }
</script>

<template>
  <div ref="element"/>
</template>`

        await fs.promises.writeFile(fullPath, source)

        console.log(fullPath)
      }
    }
  }
}