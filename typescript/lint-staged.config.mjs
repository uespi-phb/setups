export default {
  '*.{ts,js,mjs}': ['eslint --fix --cache', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
}
