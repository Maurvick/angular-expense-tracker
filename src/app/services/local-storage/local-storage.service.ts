import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  // defaultValue could be only a string otherwise it will throw an error
  getItem<T>(key: string, defaultValue: string): T {
    return JSON.parse(localStorage.getItem(key) ?? defaultValue);
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
