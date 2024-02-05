import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from "./accordion/accordion.component";
import { InputtextComponent } from "./inputtext/inputtext.component";
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';


interface accorStyles{
  max: string,
  overflow: string,
  rotate: string
}

interface accor{
  show: boolean,
  now: accorStyles,
  border: string
}


@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [CommonModule, AccordionComponent, InputtextComponent]
})
export class ContainerComponent {
  @Input() data: any = null;
  @Output() next = new EventEmitter<string>();

  borderDefault: string = "linear-gradient(to right, #ffffff00, #ddd 12.5%, #ddd 87.5%, #ffffff00 100%)";
  borderTrue: string = "linear-gradient(to right, #ffffff00, #beffa5 12.5%, #beffa5 87.5%, #ffffff00 100%)";
  borderFalse: string = "linear-gradient(to right, #ffffff00, rgb(223, 137, 137) 12.5%, rgb(223, 137, 137) 87.5%, #ffffff00 100%)";
  acordFalse: accorStyles = {max: "0px", overflow: "hidden", rotate: "rotate(0deg)"};
  acordTrue: accorStyles = {max: "none", overflow: "visible", rotate: "rotate(180deg)"};
  
  accords: Array<accor> = [
      {show: false, now: this.acordFalse, border: this.borderDefault},
      {show: false, now: this.acordFalse, border: this.borderDefault},
      {show: false, now: this.acordFalse, border: this.borderDefault},
      {show: false, now: this.acordFalse, border: this.borderDefault}
    ];

  constructor(){
    
  }

  goNext() {
    this.next.emit(this.data.index);
  }

  bording(subform: any, index: number): string{
    var bord = this.accords[index].border;
    // var subuntouched = () => {
    //   this.form.get('child')?.touched
    // }
    // console.log("status");
    // console.log(subform.touched);
    if (!subform.touched) {
      this.accords[index].border = this.borderDefault;
    } else if (subform.invalid) {
      this.accords[index].border = this.borderFalse;
    } else if (subform.valid) {
      this.accords[index].border = this.borderTrue;
    }
    return bord;
  }

}
