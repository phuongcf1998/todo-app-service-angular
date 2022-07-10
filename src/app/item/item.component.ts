import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Item } from '../model/Item';
import { ItemService } from '../service/item.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemsDefaults: Item[] = [];
  @Input() itemsCompleted: Item[] = [];
  @Output() pushCompleteItemRequest = new EventEmitter();
  @Output() pushDeleteItemRequest = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  classIconSuccess: string = 'icon-success';
  lineThrough: string = 'line-through';
  greenColor: string = '#22C55E';
  redColor: string = 'red';
  toastSw(iconType: any, message: string) {
    let toastMixin = Swal.mixin({
      toast: true,

      icon: iconType,

      title: 'General Title',

      position: 'top-right',

      showConfirmButton: false,

      timer: 3000,

      timerProgressBar: true,
    });

    toastMixin.fire({
      title: 'Result',

      html: message,
    });
  }

  deleteItem(item: Item): void {
    Swal.fire({
      html: `Do you want to delete <span style="color:${this.redColor}">${item.name}</span>  ?`,
      showDenyButton: true,

      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.toastSw(
          'error',

          `<span style="color:${this.redColor}">${item.name}</span> has been deleted`
        );
       setTimeout(() => {
        this.pushDeleteItemRequest.emit(item);
       },700)
      } else if (result.isDenied) {
      }
    });
  }

  pushCompleteItem(item: Item): void {
    Swal.fire({
      html: `Are you sure you want to finish <span style="color:${this.greenColor}">${item.name}</span> ?`,
      showDenyButton: true,
      icon: 'success',
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.toastSw(
          'success',

          `<span style="color:${this.greenColor}">${item.name}</span> has been finished`
        );
          setTimeout(() =>{
            this.pushCompleteItemRequest.emit(item);
          },700)
      } else if (result.isDenied) {
      }
    });
  }
}
