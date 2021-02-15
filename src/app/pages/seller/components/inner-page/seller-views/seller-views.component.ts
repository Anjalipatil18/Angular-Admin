import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../service/seller.service';

@Component({
  selector: 'app-seller-views',
  templateUrl: './seller-views.component.html',
  styleUrls: ['./seller-views.component.scss'],
})
export class SellerViewsComponent implements OnInit {
  constructor(private service: SellerService) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;

  ngOnInit() {
    this.getAllSeller();
  }

  getAllSeller() {
    const list = {
      set: 0,
      limit: 10,
      status: 1,
    };
    // this.service.sellerList(list).subscribe(
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
