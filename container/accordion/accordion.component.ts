import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputtextComponent } from "../inputtext/inputtext.component";

interface accorStyles{
  max: string,
  overflow: string,
  rotate: string
}

@Component({
    selector: 'app-accordion',
    standalone: true,
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.css',
    imports: [CommonModule, InputtextComponent]
})
export class AccordionComponent {
  @Input() data: any = null;
  show: boolean = false;
  max: string = "0px";
  overflow: string = "hidden";
  rotate: string = "rotate(0deg)";

  accordeon(){
    this.show = ! this.show;
    if (this.show){
      this.max = "none";
      this.overflow = "visible";
      this.rotate = "rotate(180deg)";
    } else {
      this.max = "0px";
      this.overflow = "hidden";
      this.rotate = "rotate(0deg)";
    }

  }

}
