import { Component, OnInit } from '@angular/core';
import { TaxesService } from '../../service/taxes.service';

@Component({
  selector: 'app-taxes-views',
  templateUrl: './taxes-views.component.html',
  styleUrls: ['./taxes-views.component.scss'],
})
export class TaxesViewsComponent implements OnInit {
  constructor(private service: TaxesService) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;

  ngOnInit() {
    this.getAllTaxes();
  }

  getAllTaxes() {
    const list = {
      set: 0,
      limit: 10,
      status: 1,
    };
    // this.service.taxesList(list).subscribe(
    //   (res: any) => {
    //     console.log('assets/1', res)
    //     this.userActive = res.result;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.username &&
          data.username.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
  }
}
