#!/bin/bash

# Select staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.ts$')

if [ -z "$STAGED_FILES" ]; then
  echo "No TypeScript files to lint."
  exit 0
fi

# Execute ESLint on staged files
# echo "Linting the following files:"
# echo "$STAGED_FILES"
echo "$STAGED_FILES" | xargs npx eslint --fix
echo "$STAGED_FILES" | xargs git add
