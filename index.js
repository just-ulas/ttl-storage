class Storage {
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  set(key, val, ttl = null) {
    const item = {
      val: val,
      exp: ttl ? Date.now() + ttl * 1000 : null
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

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

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

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
}

export default Storage;
