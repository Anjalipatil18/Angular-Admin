import { Component, OnInit } from '@angular/core';
import { TaxesService } from '../../service/taxes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taxes-comments',
  templateUrl: './taxes-comments.component.html',
  styleUrls: ['./taxes-comments.component.scss'],
})
export class TaxesCommentsComponent implements OnInit {
  constructor(private service: TaxesService, private route: ActivatedRoute) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  commentId: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.commentId = params.id;
      this.getAllTaxes();
    });
  }

  getAllTaxes() {
    const list = {
      type: 'asset',
      id: this.commentId,
    };
    this.service.taxesCommentsList(list).subscribe(
      (res: any) => {
        console.log('comment/type/id', res);
        if (res.data && res.data.length > 0) {
          this.userActive = res.data[0].comments;
          res.data[0].comments.map(x => {
            x.firstName =
              x.commentedBy[0].firstName + ' ' + x.commentedBy[0].lastName;
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.firstName &&
          data.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1
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
