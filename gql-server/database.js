const uuid = require('uuid/v4');

class Table {
  constructor(name, initialData = []) {
    this.name = name;
    this._rows = new Map();

    if (Array.isArray(initialData) === true) {
      initialData.forEach(d => {
        const key = (d.key || uuid());
        this._rows.set(key, Object.assign({}, d, { key }));
      });
    }
  }

  /**
   * 
   * @param {object} data 
   */
  insert(data) {
    if (typeof data !== 'object' || data === null) {
      throw new Error('[Database] cannot insert null or undefined');
    }

    const key = uuid();
    this._rows.set(key, Object.assign({}, data, { key }));
    return this._rows.get(key);
  }

  /**
   * 
   * @param {string} key 
   * @param {object} data 
   */
  update(key, data) {
    if (key === data.key && this._rows.has(key) === true) {
      this._rows.set(key, Object.assign({}, this._rows.get(key), data));
      return this._rows.get(key);
    }
  }

  /**
   * 
   * @param {string} key 
   */
  delete(key) {
    if (this._rows.has(key) === true) {
      this._rows.delete(key);
    }
  }

  /**
   * 
   * @param {object} filters 
   */
  select(filters = {}) {
    console.log(`[Database] select function has fired on table "${this.name}":`);
    const f = (typeof filters !== 'object' || filters === null ? {} : filters);
    console.log(f);

    if (typeof f.key === 'string' && f.key !== '') {
      return this._rows.get(f.key);
    }
    else {
      const fs = Object.keys(f);
      return [...this._rows.values()].filter(r => {
        if (fs.length < 1) {
          console.log('[Database] selecting by key');
          return true;
        }
        else {
          console.log(`[Database] selecting by filter`);
          return fs.every(fl => {
            const eq = f[fl] === r[fl];
            console.log(`"${f[fl]}" === "${r[fl]}" returned ${eq}`);
            return eq;
          });
        }
      });
    }
  }

  count() {
    return this._rows.size;
  }
}

module.exports = class Database {
  constructor(dataset = {}) {
    if (typeof dataset !== 'object' || dataset === null) {
      dataset = {};
    }

    this._tables = new Map();
    Object.keys(dataset).forEach(k => this.createTable(k, dataset[k]));
  }

  /**
   * 
   * @param {string} table 
   * @param {object} dataSet 
   * @returns {Table}
   */
  createTable(table, dataSet = {}) {
    if (this._tables.has(table) !== false) {
      throw new Error(`[Database] Cannot create table "${table}".  This table already exists.`);
    }

    this._tables.set(table, new Table(table, dataSet));
    return this._tables.get(table);
  }

  /**
   * 
   * @param {string} table 
   * @returns {Table}
   */
  from(table) {
    if (this._tables.has(table) !== true) {
      throw new Error(`[Database] The table "${table}" does not exist.`)
    }

    return this._tables.get(table);
  }
}