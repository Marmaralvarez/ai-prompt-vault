---
title: "TypeScript Coding Standards"
description: "Organization-wide TypeScript coding standards and best practices for consistent, maintainable code"
type: "rule"
slug: "typescript-standards"
status: "published"
version: "1.0.0"
difficulty: "intermediate"
estimatedTokens: 950
author:
  name: "Maria Martin"
  email: "maria@example.com"
  url: "https://mariamartin.dev"
tags:
  - typescript
  - coding-standards
  - best-practices
  - team-standards
  - intermediate
  - code-quality
platforms:
  - claude
  - chatgpt
created: "2024-01-15"
lastModified: "2024-01-15"
relatedPrompts:
  - "code-review-comprehensive"
---

# TypeScript Coding Standards

This document defines the coding standards for TypeScript across the organization. All TypeScript code should follow these standards for consistency, maintainability, and quality.

## File Organization

### File Structure
```
src/
├── types/              # Shared type definitions
├── interfaces/         # Shared interfaces
├── utils/              # Utility functions
├── services/           # Business logic services
├── components/         # React components (if applicable)
├── hooks/              # Custom React hooks
├── middleware/         # Middleware functions
└── index.ts            # Public exports
```

### File Naming
- Files: `camelCase.ts` or `kebab-case.ts`
- Components: `PascalCase.tsx`
- Types: `PascalCase.ts` in `/types` directory
- Never mix naming conventions in same directory

### Export Organization
```typescript
// ✅ Good: Organized exports
export type { UserType, AdminType };
export { getUser, createUser };
export const CONFIG = { ... };

// ❌ Bad: Mixed and unorganized
export const getUser = () => {};
export type UserType = {};
export function createUser() {}
```

## Type Safety

### Use Strict Compiler Options

Required `tsconfig.json` settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Define All Types

```typescript
// ✅ Good: Explicit types
const getUserName = (user: User): string => {
  return user.name;
};

// ❌ Bad: Implicit any
const getUserName = (user) => {
  return user.name;
};
```

### Use Interfaces for Objects

```typescript
// ✅ Good: Clear interface
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ❌ Bad: Anonymous object
function createUser(user: { id: string; name: string }) {}
```

### Use Generics for Reusability

```typescript
// ✅ Good: Generic function
interface Response<T> {
  data: T;
  status: number;
}

const fetchUser = async (id: string): Promise<Response<User>> => {
  // ...
};

// ❌ Bad: Type-specific duplicates
interface UserResponse {
  data: User;
  status: number;
}

interface PostResponse {
  data: Post;
  status: number;
}
```

### Use Discriminated Unions

```typescript
// ✅ Good: Clear type distinction
type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ Bad: Ambiguous types
type Result<T> = {
  data?: T;
  error?: Error;
  status: 'success' | 'error';
};
```

## Naming Conventions

### Variables & Constants

```typescript
// ✅ Good: Descriptive names
const maxRetries = 3;
const isUserAuthenticated = true;
const userData: User = { ... };
const API_BASE_URL = 'https://api.example.com';
const [isLoading, setIsLoading] = useState(false);

// ❌ Bad: Unclear or ambiguous
const mr = 3;
const flag = true;
const data = { ... };
const url = 'https://api.example.com';
const [l, setL] = useState(false);
```

### Functions & Methods

```typescript
// ✅ Good: Verb-based names
const getUserById = (id: string): User => { ... };
const calculateTotalPrice = (items: Item[]): number => { ... };
const isValidEmail = (email: string): boolean => { ... };

// ❌ Bad: Unclear intent
const get = (id: string): User => { ... };
const calc = (items: Item[]): number => { ... };
const check = (email: string): boolean => { ... };
```

### Classes & Types

```typescript
// ✅ Good: PascalCase for classes and types
class UserService { ... }
interface AuthenticationProvider { ... }
type ValidationError = { ... };

// ❌ Bad: camelCase for classes
class userService { ... }
interface authenticationProvider { ... }
```

## Functions & Methods

### Function Signatures

```typescript
// ✅ Good: Explicit return types
const add = (a: number, b: number): number => {
  return a + b;
};

// ❌ Bad: Implicit return types
const add = (a: number, b: number) => {
  return a + b;
};
```

### Arrow Functions vs Function Declarations

```typescript
// ✅ Good: Arrow functions for callbacks/exports
export const processUser = (user: User): void => {
  // ...
};

const callbacks = users.map((user) => user.name);

// ✅ Good: Function declarations for exported functions (optional)
export function validateUser(user: User): boolean {
  // ...
}

// ❌ Bad: Function declarations for callbacks
const callbacks = users.map(function(user) {
  return user.name;
});
```

### Async/Await

```typescript
// ✅ Good: Proper async/await typing
const fetchUser = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
};

// ❌ Bad: No return type, poor error handling
const fetchUser = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
```

### Function Parameters

```typescript
// ✅ Good: Type all parameters
const createUser = (
  name: string,
  email: string,
  role: 'admin' | 'user'
): User => { ... };

// ❌ Bad: Implicit any types
const createUser = (name, email, role) => { ... };
```

### Parameter Objects

```typescript
// ✅ Good: Use objects for multiple parameters
interface CreateUserParams {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const createUser = (params: CreateUserParams): User => { ... };

// ❌ Bad: Too many individual parameters
const createUser = (
  name: string,
  email: string,
  role: 'admin' | 'user',
  department: string,
  location: string,
  // ...
) => { ... };
```

## Classes

### Class Structure

```typescript
// ✅ Good: Organized class
class UserService {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public getUser(id: string): Promise<User> {
    // public method
  }

  private validateUser(user: User): boolean {
    // private method
  }
}

// ❌ Bad: Unorganized, inconsistent visibility
class UserService {
  database: Database; // no visibility modifier

  getUser = (id: string): Promise<User> => {};
  validateUser = (user: User): boolean => {};
}
```

### Visibility Modifiers

```typescript
// ✅ Good: Explicit visibility
class Database {
  private connectionString: string;
  protected pool: ConnectionPool;
  public isConnected: boolean;

  private connect(): void { ... }
  protected getPool(): ConnectionPool { ... }
  public query<T>(sql: string): Promise<T[]> { ... }
}

// ❌ Bad: Implicit public
class Database {
  connectionString: string; // unclear intent
  pool: ConnectionPool;
  isConnected: boolean;
}
```

## Error Handling

### Use Custom Error Types

```typescript
// ✅ Good: Typed error handling
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
  }
}

try {
  validateUser(user);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Invalid ${error.field}: ${error.message}`);
  }
}

// ❌ Bad: Generic error handling
try {
  validateUser(user);
} catch (error) {
  console.log(error);
}
```

### Never Use Void for Errors

```typescript
// ✅ Good: Return error information
const parseJSON = (json: string): { success: boolean; error?: Error } => {
  try {
    return { success: true, data: JSON.parse(json) };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// ❌ Bad: Silent failures
const parseJSON = (json: string): void => {
  try {
    JSON.parse(json);
  } catch (error) {
    // Error lost
  }
};
```

## Modules & Imports

### Import Organization

```typescript
// ✅ Good: Organized imports
// 1. External packages
import React, { useState } from 'react';
import axios from 'axios';

// 2. Internal absolute imports (using path aliases)
import { User } from '@/types/user';
import { UserService } from '@/services/user';

// 3. Internal relative imports (if needed)
import { formatDate } from '../utils/date';

// 4. Type imports
import type { UserInput } from '@/types';

// ❌ Bad: Unorganized, mixed relative/absolute
import { formatDate } from '../../utils/date';
import { User } from '../../../types/user';
import axios from 'axios';
import React from 'react';
```

### Use Barrel Exports

```typescript
// ✅ Good: Barrel export (index.ts)
export { User } from './user';
export { Post } from './post';
export { Comment } from './comment';

// Then import:
import { User, Post, Comment } from '@/types';

// ❌ Bad: Direct imports
import { User } from '@/types/user';
import { Post } from '@/types/post';
import { Comment } from '@/types/comment';
```

## Declarations & Constants

### Const vs Let vs Var

```typescript
// ✅ Good: Prefer const
const MAX_RETRIES = 3;
const [count, setCount] = useState(0);

// ✅ Good: Use let only when reassignment needed
let retryCount = 0;
retryCount++;

// ❌ Bad: Never use var
var oldStyle = 'value';

// ❌ Bad: Unnecessary let
let user = getUser();
user = null; // Don't reassign, use different variable
```

### Enums vs Union Types

```typescript
// ✅ Good: Union types for simple enums
type UserRole = 'admin' | 'user' | 'guest';

// ✅ Good: Enums for more complex scenarios
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// ❌ Bad: Constants
const USER_ROLES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};
```

## Comments & Documentation

### JSDoc for Public APIs

```typescript
// ✅ Good: Documented public function
/**
 * Fetches a user by ID
 * @param id - The user's unique identifier
 * @returns Promise resolving to the user object
 * @throws Error if user not found or network fails
 */
export const getUser = async (id: string): Promise<User> => {
  // ...
};

// ❌ Bad: No documentation
export const getUser = async (id: string): Promise<User> => {
  // ...
};
```

### Inline Comments

```typescript
// ✅ Good: Explains why, not what
const discount = price * 0.85; // 15% discount for bulk orders

// ❌ Bad: Explains obvious code
const discount = price * 0.85; // multiply price by 0.85
```

## Testing

### Test Organization

```typescript
// ✅ Good: Clear test structure
describe('UserService', () => {
  describe('getUser', () => {
    it('should return user when found', async () => {
      // arrange
      const id = 'user-123';

      // act
      const user = await service.getUser(id);

      // assert
      expect(user.id).toBe(id);
    });

    it('should throw error when user not found', async () => {
      // arrange
      const id = 'invalid-id';

      // act & assert
      await expect(service.getUser(id)).rejects.toThrow();
    });
  });
});
```

## Performance

### Avoid N+1 Queries

```typescript
// ✅ Good: Single query with joins
const users = await User.find()
  .populate('posts')
  .populate('comments');

// ❌ Bad: N+1 queries
const users = await User.find();
for (const user of users) {
  user.posts = await Post.find({ userId: user.id });
}
```

### Memoization for Expensive Operations

```typescript
// ✅ Good: Memoized function
const getUsersWithPosts = memoize(
  async (ids: string[]): Promise<User[]> => {
    return db.query('SELECT * FROM users WHERE id IN (?)', [ids]);
  },
  { maxAge: 5 * 60 * 1000 } // 5 minutes
);
```

## Summary

Key principles:
- Strong type safety with strict compiler options
- Descriptive naming conventions
- Explicit return types
- Organized code structure
- Proper error handling
- Complete documentation
- Consistent formatting
