import { Component, OnInit } from '@angular/core';
import { Item } from '../model/Item';
import { Status } from '../model/Status';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  itemsDefaults: Item[] = [];
  itemsCompleted: Item[] = [];

  constructor(private itemService: ItemService) {}

  getAllItems(): void {
    this.itemsDefaults = this.itemService.getItemsDefaults();
    this.itemsCompleted = this.itemService.getItemsCompleted();
  }

  ngOnInit(): void {
    this.getAllItems();
  }
  handleCompletedItemRequest(item: Item): void {
    this.itemService.removeItemDefaults(item);
    let itemCompleted = { ...item, status: Status.Completed };
    this.itemService.addItemCompleted(itemCompleted);
    this.itemService.sortItems(this.itemService.getItemsCompleted());
    this.getAllItems();
  }
  handleDeleteItemRequest(item: Item): void {
    item.status === Status.Completed ? this.itemService.removeItemCompleted(item) : this.itemService.removeItemDefaults(item);
    this.getAllItems();
  }
}
