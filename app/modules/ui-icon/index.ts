import { defineNuxtModule, createResolver, addTypeTemplate } from 'nuxt/kit'
import { consola } from 'consola'
import fs from 'fs'
import path from 'path'

export default defineNuxtModule({
  meta: {
    name: 'ui-icon',
  },

  async setup() {
    function* readAllFiles(dir: string): Generator<string> {
      const files = fs.readdirSync(dir, { withFileTypes: true })
      for (const file of files) {
        if (file.isDirectory()) {
          yield* readAllFiles(path.join(dir, file.name))
        } else {
          yield path.join(dir, file.name)
        }
      }
    }

    const resolver = createResolver(import.meta.url)
    const iconsDir = resolver.resolve('../../assets/icons')
    const filenames = readAllFiles(iconsDir)

    const iconKeys = Array.from(filenames)
      .filter(filePath => filePath.endsWith('.svg'))
      .map(filePath => {
        const path = filePath
          .replace(/\\/g, '/')
          .replace('.svg', '')

        const sourceToIcon = 'assets/icons'
        const match = path.match(sourceToIcon)
        if (match?.index) {
          return path.slice(match.index + sourceToIcon.length + 1)
        } else {
          throw `Icon error, icon not found: ${filePath}`
        }
      })

    const generateIconsConditionString = () => {
      let conditionString = ''
      iconKeys.forEach(iconKey => {
        conditionString += `'${iconKey}' | `
      })

      return conditionString + 'string'
    }

    addTypeTemplate({
      filename: 'types/ui-icon.d.ts',
      getContents: () => {
        return /* ts */`export type TUiIconNames = ${generateIconsConditionString()}`
      },
    })

    consola.info('[$uiIcon] icon types successful generated!')
  },
})
