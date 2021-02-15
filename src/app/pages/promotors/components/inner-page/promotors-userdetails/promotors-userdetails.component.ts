import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotorsService } from '../../service/promotors.service';

import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-promotors-userdetails',
  templateUrl: './promotors-userdetails.component.html',
  styleUrls: ['./promotors-userdetails.component.scss'],
})
export class PromotorsUserdetailsComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private service: PromotorsService,
    private elRef: ElementRef
  ) {}

  statusCode: any;
  assetId: any;
  listGroup: any;
  userDetails: any;
  carouselTileItems: any;
  defaultImage = '../assets/images/lazyLoad.png';
  lazyLoad: any;
  offset = 100;

  zoomBox = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.statusCode = params.sCode;
      this.assetId = params.id;
      this.getAssetList();
    });
  }

  getAssetList() {
    const list = {
      statusCode: this.statusCode,
      assetId: this.assetId,
    };
    this.service.assetGetList(list).subscribe(
      (res: any) => {
        console.log('asset - get', res);
        res.data[0].details.sort((a, b) => a.seqId - b.seqId);
        res.data[0].details.map(x => {
          x.attributes.sort((a, b) => a.seqId - b.seqId);
        });
        this.userDetails =
          res.data[0].userDetails && res.data[0].userDetails[0];
        this.listGroup = res.data[0];
        if (res.data[0].images && res.data[0].images.length > 0) {
          this.carouselTileItems = res.data[0].images;
          this.carouselTileItems[0].active = true;
          this.lazyLoad = this.carouselTileItems[0].imageLink;
        } else {
          this.listGroup.details.map(x => {
            x.attributes.map(y => {
              if (y.typeCode === 13) {
                this.carouselTileItems = y.value_13;
                this.carouselTileItems[0].active = true;
                this.lazyLoad = this.carouselTileItems[0].imageLink;
              }
            });
          });
        }
        const breadcrumb = { uTitle: this.listGroup.title.en };
        this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
      },
      error => {
        console.log(error);
      }
    );
  }

  carousalIndex(index: number) {
    this.carouselTileItems.map(x => {
      x.active = false;
    });
    this.carouselTileItems[index].active = true;
    this.lazyLoad = this.carouselTileItems[index].imageLink;
    // let myTag = this.elRef.nativeElement.querySelector('.ngxcarousel-items');
    // myTag.style.transform = "translate3d(-"+(index*100)+"%, 0, 0)"
  }
  imageZoom(imgID, resultID) {
    this.zoomBox = true;
    // console.log(imgID, resultID)
    let img;
    img = document.getElementById(imgID);
    const result = document.getElementById(resultID);
    /*create lens:*/
    const lens = document.createElement('DIV');
    lens.setAttribute('class', 'img-zoom-lens');
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = 'url("' + img.src + '")';
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    /*and also for touch screens:*/
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);
    function moveLens(e) {
      let pos;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /*set the position of the lens:*/
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      /*display what the lens "sees":*/
      result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
    }
    function getCursorPos(e) {
      let a;
      let x = 0;
      let y = 0;

      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x, y };
    }
  }
}
