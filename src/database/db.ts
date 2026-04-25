import {open} from '@op-engineering/op-sqlite';
import {MoneyRecord} from '../types';

const db = open({name: 'moneybook.sqlite'});

export const initDB = () => {
  db.executeSync(`
    CREATE TABLE IF NOT EXISTS money_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
};

export const insertRecord = (name: string, amount: number): number => {
  const createdAt = Date.now();
  const result = db.executeSync(
    'INSERT INTO money_records (name, amount, created_at) VALUES (?, ?, ?)',
    [name, amount, createdAt],
  );
  return result.insertId || 0;
};

export const getAllRecords = (): MoneyRecord[] => {
  const result = db.executeSync('SELECT * FROM money_records ORDER BY created_at DESC');
  return (result.rows as unknown as MoneyRecord[]) || [];
};

export const getRecordsPaginated = (limit: number, offset: number): MoneyRecord[] => {
  const result = db.executeSync(
    'SELECT * FROM money_records ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return (result.rows as unknown as MoneyRecord[]) || [];
};

export const searchRecords = (keyword: string): MoneyRecord[] => {
  const searchTerm = `%${keyword}%`;
  const result = db.executeSync(
    'SELECT * FROM money_records WHERE name LIKE ? ORDER BY created_at DESC',
    [searchTerm],
  );
  return (result.rows as unknown as MoneyRecord[]) || [];
};

export const searchRecordsPaginated = (keyword: string, limit: number, offset: number): MoneyRecord[] => {
  const searchTerm = `%${keyword}%`;
  const result = db.executeSync(
    'SELECT * FROM money_records WHERE name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [searchTerm, limit, offset]
  );
  return (result.rows as unknown as MoneyRecord[]) || [];
};

export const getRecordById = (id: number): MoneyRecord | null => {
  const result = db.executeSync('SELECT * FROM money_records WHERE id = ?', [id]);
  const rows = (result.rows as unknown as MoneyRecord[]) || [];
  return rows.length > 0 ? rows[0] : null;
};

export const deleteRecord = (id: number): void => {
  db.executeSync('DELETE FROM money_records WHERE id = ?', [id]);
};

export const updateRecord = (id: number, name: string, amount: number): void => {
  db.executeSync('UPDATE money_records SET name = ?, amount = ? WHERE id = ?', [
    name,
    amount,
    id,
  ]);
};

export const bulkInsertRecords = async (records: {name: string; amount: number}[]): Promise<void> => {
  if (records.length === 0) return;

  await db.transaction(async tx => {
    const createdAt = Date.now();
    for (const record of records) {
      tx.execute(
        'INSERT INTO money_records (name, amount, created_at) VALUES (?, ?, ?)',
        [record.name, record.amount, createdAt]
      );
    }
  });
};
