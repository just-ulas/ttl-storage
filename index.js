/**
 * Simple localStorage wrapper with TTL support.
 * Values expire automatically after the given number of seconds.
 */
class Storage {
  /**
   * @param {string} [prefix=''] - Prefix added to every key to avoid collisions
   */
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  /**
   * Store a value.
   * @param {string} key
   * @param {*} val
   * @param {number|null} [ttl=null] - Time to live in seconds. null = never expires
   */
  set(key, val, ttl = null) {
    const item = {
      val: val,
      exp: ttl ? Date.now() + ttl * 1000 : null
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  /**
   * Retrieve a value. Returns null if missing or expired.
   * @param {string} key
   * @returns {*|null}
   */
  get(key) {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;

    try {
      const data = JSON.parse(raw);
      if (data.exp && Date.now() > data.exp) {
        this.remove(key);
        return null;
      }
      return data.val;
    } catch (e) {
      return null;
    }
  }

  /**
   * Check whether a key exists and is not expired.
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete a key.
   * @param {string} key
   */
  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * Remove every key that belongs to this prefix.
   */
  clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Return all non-expired keys for this prefix.
   * @returns {string[]}
   */
  keys() {
    const result = [];
    Object.keys(localStorage).forEach((fullKey) => {
      if (!fullKey.startsWith(this.prefix)) return;
      const key = fullKey.slice(this.prefix.length);
      if (this.get(key) !== null) {
        result.push(key);
      }
    });
    return result;
  }

  /**
   * Number of non-expired keys currently stored under this prefix.
   * @returns {number}
   */
  get size() {
    return this.keys().length;
  }
}

export default Storage;
