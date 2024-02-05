import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

interface contSwitcher{
  show: boolean,
  unshow: boolean,
  focused: boolean,
  blured: boolean,
  data: any
}

@Component({
  selector: 'app-testdoc',
  templateUrl: './testdoc.component.html',
  styleUrl: './testdoc.component.css'
})
export class TestdocComponent implements OnInit{
  form!: FormGroup;
  containers: Array<any> = [{ 
    show: true,
    unshow: false,
    focused: true,
    blured: false,
    data: {
      form: this.form,
      color: "yellow",
      group: "client",
      title: "Дані позивача",
      items: [{
        class: "accordeon",
        group: "fullname",
        data: [{
          title: "ПІБ позивача",
          inputs: [{
            label: "В називному відмінку (хто?)",
            placeholder: "ПІБ",
            control: "origin"
          }]
        }]
      }]
    }
     /*
      data.form
      data.color
      data.group
      data.title
      ? data.index
      data.items []
          class: "accordeon" | input
          data[]
          group

          :accordeon:
              title
              inputs[] : input
                  data

          :input:
              label
              placeholder
              control
    */
  }];

  checked: boolean = false;
  blockingbyadd: boolean = false;
  blockcheck: boolean = false;
  inmore: boolean = false;
  canadd: boolean = true;
  currentLeft: number = 0;
  currentRight: number = 2;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      client: new FormGroup({

        fullname: new FormGroup({
          origin: new FormControl(""),
          bywhom: new FormControl("")
        }),
        adress: new FormGroup({
          register: new FormControl(""),
          index: new FormControl(""),
          city: new FormControl(""),
          street: new FormControl(""),
          building: new FormControl(""),
          apartment: new FormControl(""),
        }),
        contacts: new FormGroup({
          phone: new FormControl(""),
          email: new FormControl("", [Validators.email, Validators.required]),
        }),
        pasport: new FormGroup({
          year: new FormControl(""),
          code: new FormControl("")
        })
        
      }),
      secondPerson: new FormGroup({
        
        fullname: new FormGroup({
          origin: new FormControl(""),
          bywhom: new FormControl("")
        }),
        adress: new FormGroup({
          register: new FormControl(""),
          index: new FormControl(""),
          city: new FormControl(""),
          street: new FormControl(""),
          building: new FormControl(""),
          apartment: new FormControl(""),
        }),
        contacts: new FormGroup({
          phone: new FormControl(""),
          email: new FormControl("", [Validators.email, Validators.required]),
        }),
        pasport: new FormGroup({
          year: new FormControl(""),
          code: new FormControl("")
        })

      }),
      child: new FormGroup({

        is: new FormControl(""),
        add: new FormGroup({
          fullname: new FormGroup({
            origin: new FormControl(""),
            whom: new FormControl("")
          }),
          certificate: new FormGroup({
            department: new FormControl(""),
            city: new FormControl(""),
            year: new FormControl(""),
            actnote: new FormControl(""),
            series: new FormControl("")
          })
        })
      }),
      court: new FormGroup({
        name: new FormControl(""),
        adress: new FormControl(""),
        pay: new FormControl(""),
        year: new FormControl(""),
        pagenum: new FormControl("")
      }),
      marriageSert: new FormGroup({
        date: new FormControl(""),
        year: new FormControl(""),
        department: new FormControl(""),
        city: new FormControl(""),
        actnote: new FormControl(""),
        series: new FormControl("")
      }),
      marriage: new FormGroup({
        year: new FormControl(""),
        adress: new FormControl(""),
        date: new FormControl(""),
      })
    })
  }

  show(where: string){
    // .show показывает последний открытый контейнер
    // .unshow всегда три и они регулируют непосредственно видимость
    switch(where){
      case "next": 
        var lastshowed = 0, lastunshowed = 5;
        while(this.containers[lastshowed] ? this.containers[lastshowed].show : false) lastshowed++;
        lastshowed = lastshowed - 1;

        if (lastshowed>this.currentRight){

          this.containers[this.currentLeft].unshow = true;
          this.containers[this.currentRight+1].unshow = false;

          this.currentLeft = this.currentLeft + 1;
          this.currentRight = this.currentRight + 1;
        } 

        break;
      case "prev":

        if (this.currentLeft>0){

          this.containers[this.currentLeft-1].unshow = false;
          this.containers[this.currentRight].unshow = true;

          this.currentLeft = this.currentLeft - 1;
          this.currentRight = this.currentRight - 1;
        }
        
        break;
    }
  }

  submit(){
    if (this.form.valid){
      //console.log("form submited", this.form);
      const formData = {...this.form.value};
      //console.log(formData);
      this.form.reset();
    }
    
  }

  next(index: number){
    //console.log("clicked");
    //this.form?.get("child")?.reset();
    this.containers[index].focused = false;
    this.containers[index+1].blured = false;
    this.containers[index+1].focused = true;
    this.containers[index].unshow = true;
    if ( index + 3 <= this.containers.length - 1 ) {
      //console.log((index+3) <= this.containers.length - 1);
      //console.log(index);
      this.containers[index+3].show = true;
      this.containers[index+3].unshow = false;
    }
    this.currentLeft = this.currentLeft + 1;
    this.currentRight = this.currentRight + 1;
    //console.log(this.containers[index+3]);
  }

  add(){
    this.blockcheck = true;
    this.inmore = false;
    this.canadd = false;
    this.form?.get("child")?.get("add")?.reset();
  }

  more(){
    this.inmore = true;
    this.canadd = true;
  }

  check(){
    this.checked = !this.checked;
    this.inmore = true;
    this.canadd = true;
    // console.log("checked: "+this.checked);
    // console.log("is: "+this.form.get('child')?.get('is')?.invalid)
    var blocking = this.checked ? !this.form.get('child')?.get('add')?.invalid : this.form.get('child')?.invalid;
    //console.log("blocking: "+blocking);
    if (blocking){
      this.blockingbyadd = true;
    } else {
      this.blockingbyadd = false;
    }
    //console.log("child: "+this.form.get('child')?.invalid);
  }

}
