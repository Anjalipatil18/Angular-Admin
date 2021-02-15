import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: string;
  @Input() ok: string;
  @Input() cancelT: string;

  @Input() reason: boolean;

  @Input() language: boolean;

  lang = '';
  langCode = '';
  reasons = '';

  constructor(protected ref: NbDialogRef<DialogContentComponent>) {}

  config = {
    displayKey: 'language', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  ngOnInit() {}

  langSelect() {
    // console.log(this.lang);
    const languageCode = 'languageCode';
    this.langCode = this.lang[languageCode];
  }

  cancel() {
    this.ref.close();
  }

  submit(val: any) {
    if (this.language) {
      this.ref.close(val.languageCode);
    } else {
      this.ref.close(val);
    }
  }
}
