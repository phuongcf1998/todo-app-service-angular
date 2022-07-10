import { Injectable } from '@angular/core';
import { Item } from '../model/Item';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}
  itemsDefaults: Item[] = [];
  itemsCompleted: Item[] = [];

  getItemsDefaults(): Item[] {
    return this.itemsDefaults;
  }
  getItemsCompleted(): Item[] {
    return this.itemsCompleted;
  }

  addItemDefault(itemDefaults: Item): void {
    this.itemsDefaults.push(itemDefaults);
  }
  addItemCompleted(itemCompleted: Item): void {
    this.itemsCompleted.push(itemCompleted);
  }
  removeItemDefaults(itemDefaults: Item): void {
    const index = this.itemsDefaults.indexOf(itemDefaults);
    
    
    this.itemsDefaults.splice(index, 1);
    console.log(this.itemsDefaults);
  }
  removeItemCompleted(itemCompleted: Item): void {
    const index = this.itemsCompleted.indexOf(itemCompleted);
    this.itemsCompleted.splice(index, 1);
  }
  sortItems(items: Item[]): void {
    items.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }
  checkItemIsDuplicate(item: Item): boolean {
    let isDuplicate = false;

    this.itemsDefaults.forEach((element) => {
      if (element.name.trim().toLowerCase() === item.name.toLowerCase()) {
        isDuplicate = true;
      }
    });
    this.itemsCompleted.forEach((element) => {
      if (element.name.trim().toLowerCase() === item.name.toLowerCase()) {
        isDuplicate = true;
      }
    });

    return isDuplicate;
  }
}
