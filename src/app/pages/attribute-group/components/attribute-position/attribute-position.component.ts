import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AttributeGroupService } from '../service/attribute-group.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attribute-position',
  templateUrl: './attribute-position.component.html',
  styleUrls: ['./attribute-position.component.scss'],
})
export class AttributePositionComponent implements OnInit {
  constructor(
    private service: AttributeGroupService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  attrId: any;
  userActiveData: any = [];
  userActive: any;
  columns: any;
  userActiveSearch: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.attrId = params.id;
      this.getEditattribute();
    });
  }

  getEditattribute() {
    this.service.attributesListEdit(this.attrId).subscribe(
      (res: any) => {
        console.log('attributes/id', res);
        res.result[0].attributes.sort((a, b) => a.seqId - b.seqId);
        this.userActive = res.result[0].attributes;
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
          data.attrName &&
          data.attrName.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
  }

  reOrder(id, status) {
    const list = {
      attrId: id,
      order: status,
      attrGroupId: this.attrId,
    };
    this.service.attributesReorderList(list).subscribe(
      (res: any) => {
        console.log('attributesGroupAttrChangeOrder/id', res);
        this.userActive = [];
        this.getEditattribute();
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    this.location.back();
  }
}
