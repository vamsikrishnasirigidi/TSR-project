import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CheckBoxComponent {
  @Input() class = "";
  @Input() error = "";
  @Input() value :any=null;
  @Input() disabled = false;
  @Input() label:string = null;
  @Input() itemId: number;
  @Input() checked: boolean;
  @Output() onChangeHappened = new EventEmitter<any>();
  onChangeEvent(checked: boolean){
    this.onChangeHappened.emit(checked)
  }

}
