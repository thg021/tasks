module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'test', 'refactor', 'docs', 'merge', 'style', 'perf']]
  }
};
