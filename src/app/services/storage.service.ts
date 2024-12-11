import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ICategory, ITask } from '../models/task.interface';

const DB_USERS = 'user-tasks';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  async initilizPlugin() {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.createTables();
    return true;
  }

  async createTables() {
    const category = `CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`;

    const task = `CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      category_id TEXT,
      FOREIGN KEY (category_id) REFERENCES category(id)
    );`;

    await this.db.execute(`PRAGMA foreign_keys = ON;`);
    await this.db.execute(category);
    await this.db.execute(task);
  }

  //CRUD Category

  async createCategory(category: ICategory) {
    const sql = `INSERT INTO category (name) VALUES ('${category.name}');`;
    const result = await this.db.run(sql);
    return result;
  }

  async updateCategory(id: number, name: string) {
    const sql = `UPDATE category SET name = '${name}' WHERE id = ${id}`;
    await this.db.run(sql);
  }

  async loadCategories() {
    const sql = `SELECT * FROM category;`;
    const result = await this.db.query(sql);
    return result.values || [];
  }

  async deleteCategory(id: number) {
    const sql = `DELETE FROM category WHERE id = ${id}`;
    await this.db.execute(sql);
  }

  //CRUD Task

  async createTask(task: Partial<ITask>) {
    const query = `
      INSERT INTO task (name, category_id)
      VALUES ('${task.name}', ${task.category_id})
    `;

    const result = await this.db.run(query);
    return result;
  }

  async updateTask(task: ITask) {
    const sql = `UPDATE task SET name = '${task.name}', completed = ${task.completed ? 1 : 0} WHERE id = ${task.id}`;
    await this.db.run(sql);
  }

  async markDone(task: Partial<ITask>) {
    const sql = `UPDATE task SET completed = 1 WHERE id = ${task.id}`;
    await this.db.run(sql);
  }

  async loadTasks() {
    const sql = `
      SELECT task.*, category.name as category_name
      FROM task
      LEFT JOIN category ON task.category_id = category.id;
    `;
    const result = await this.db.query(sql);
    return result.values || [];
  }

  async deleteTask(id: number) {
    const sql = `DELETE FROM task WHERE id = ${id}`;
    await this.db.execute(sql);
  }

  async isDbReady() {
    return !!this.db;
  }
}
