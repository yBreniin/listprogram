import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = "TODOs"
  showTable = false;
  showEdit = false;

  ngOnInit(): void {
  }


  openTable(){
    this.showTable = true
    this.showEdit = false
    this.changeZIndex(-1);
  }

  openEdit(){
    this.showEdit = true
    this.showTable = false
    this.changeZIndex(-1);
  }

  private changeZIndex(zIndex: number) {
    const element = document.getElementById('intro');
    if (element) {
      element.style.zIndex = zIndex.toString();
    }
  }
}
