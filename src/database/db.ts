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

export const searchRecords = (keyword: string): MoneyRecord[] => {
  const searchTerm = `%${keyword}%`;
  const result = db.executeSync(
    'SELECT * FROM money_records WHERE name LIKE ? ORDER BY created_at DESC',
    [searchTerm],
  );
  return (result.rows as unknown as MoneyRecord[]) || [];
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
