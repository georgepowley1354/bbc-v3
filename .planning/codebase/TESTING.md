# Testing

## Current State
- **No automated test framework** implemented
- Zero `.test.js` or `.spec.js` files exist in the codebase
- Testing done through agents/skills rather than unit tests

## Recommended Framework
- **Jest** or **Vitest** (parallel test execution, ES module support)

## Critical Areas for Testing
- Security validation (path traversal prevention, input sanitization)
- File I/O operations (atomic writes, error cases)
- Async operations with timeout protection
- Platform detection logic (Windows vs Unix paths)

## Proposed Structure
```
tests/
  unit/
    atomic-write.test.js
    detect-platform.test.js
  integration/
    end-to-end flows
```

## Mocking Approach
- Mock `fs` module for file I/O tests
- Mock platform globals for cross-platform tests
- Use real filesystem for integration tests (temp directories)
