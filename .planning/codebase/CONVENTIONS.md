# Code Conventions

## File Naming
- **kebab-case** for all files (e.g., `atomic-write.js`, `detect-platform.js`)
- CommonJS modules (`.js` extension)

## Naming Conventions
- **Functions:** camelCase, verb-first descriptive names (e.g., `detectPlatform`, `atomicWrite`)
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE

## Module System
- CommonJS (`require`/`module.exports`)
- Import order: built-in Node modules first, then local modules
- Export pattern: object with named functions and classes

## Code Style
- Comprehensive JSDoc with `@param`, `@returns`, `@author`, `@license`
- Try-catch with explicit validation and timeout protection
- Error messages are descriptive and actionable

## Error Handling
- Explicit input validation before operations
- Try-catch blocks wrapping I/O and async operations
- Timeout protection on long-running operations
- Errors propagated with context

## Patterns
- Atomic file writes (write-then-rename to prevent corruption)
- Platform detection before path operations
- Functional style with named exports
