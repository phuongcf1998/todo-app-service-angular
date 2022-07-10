import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Status } from '../model/Status';
import { ItemService } from '../service/item.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}
  @ViewChild('inputItem', { static: true }) inputItem!: ElementRef;
  add_item(newItemName: string) {
    if (newItemName === '') {
      Swal.fire({
        title: '',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(' Input must not be blank !!!', '', 'error');
        } else if (result.isDenied) {
        }
      });
    } else {
      let itemInput = {
        id: Date.now(),
        name: newItemName,
        status: Status.Default,
      };

      if (!this.itemService.checkItemIsDuplicate(itemInput)) {
        this.itemService.addItemDefault(itemInput);
        this.itemService.sortItems(this.itemService.getItemsDefaults());
        this.inputItem.nativeElement.value = '';
      } else {
        Swal.fire({
          title: '',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Item name is duplicate', '', 'error');
          } else if (result.isDenied) {
          }
        });
      }
    }
  }
}
