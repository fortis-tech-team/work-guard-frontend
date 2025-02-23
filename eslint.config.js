import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import oxlint from 'eslint-plugin-oxlint';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  oxlint.configs['flat/recommended'],
  skipFormatting,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always',
          },
        },
      ],
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all', // Verifica todas as variáveis
          varsIgnorePattern: '^_', // Ignora variáveis que começam com "_"
          args: 'after-used', // Verifica os argumentos após serem usados
          ignoreRestSiblings: true, // Ignora os irmãos do operador rest
        },
      ],
    },
  },
];
