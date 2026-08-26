# ttl-storage

A small, focused `localStorage` wrapper with proper TTL (time-to-live) support.

Does one job cleanly: store values that automatically expire.

## Install

```bash
npm install ttl-storage
```

Or just copy `index.js` into your project.

## Usage

```js
import Storage from 'ttl-storage';

const store = new Storage('myapp:');

// Store a value for 60 seconds
store.set('token', 'abc123', 60);

// Get it back
console.log(store.get('token')); // 'abc123'

// Check existence
console.log(store.has('token')); // true

// List keys
console.log(store.keys()); // ['token']

// How many active keys?
console.log(store.size); // 1

// After 60 seconds it returns null and cleans itself up
```

## API

| Method / Property | Description |
|-------------------|-------------|
| `set(key, value, ttl?)` | Store a value. `ttl` is in seconds. Omit for no expiry. |
| `get(key)` | Retrieve a value. Returns `null` if missing or expired. |
| `has(key)` | Check if a key exists and is not expired. |
| `remove(key)` | Delete a key. |
| `clear()` | Remove all keys that belong to this prefix. |
| `keys()` | List all non-expired keys for this prefix. |
| `size` | Number of non-expired keys under this prefix. |

## Why?

Most storage helpers either ignore expiry or make you manage timestamps yourself.  
This one does the boring part for you and stays out of the way.

## License

MIT
