import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-role',
  templateUrl: './dialog-role.component.html',
  styleUrls: ['./dialog-role.component.scss'],
})
export class DialogRoleComponent implements OnInit {
  constructor(protected ref: NbDialogRef<DialogRoleComponent>) {}
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  role = '';
  userContactMasked = false;
  pageTitle: any;

  pageRead: any;
  pageWrite: any;
  pageEdit: any;
  pageDelete: any;

  pagesMenu = [
    {
      title: 'App Text Settings',
      read: '0',
      write: '0',
      edit: '0',
      delete: '0',
    },
    { title: 'App Config', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Cities', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Brands & Models', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Colors', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Logs', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Admin Users', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Users', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Attributes', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Attribute Group', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Asset Types', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Ads', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Promoters', read: '0', write: '0', edit: '0', delete: '0' },
    {
      title: 'Seller Attribute',
      read: '0',
      write: '0',
      edit: '0',
      delete: '0',
    },
    { title: 'Seller', read: '0', write: '0', edit: '0', delete: '0' },
    { title: 'Taxes', read: '0', write: '0', edit: '0', delete: '0' },
  ];

  ngOnInit() {
    const temp = { ...this.content.access };
    console.log('temp', temp, this.content.access);
    console.log(
      temp,
      temp.AdminUsers[0],
      temp.AppTextSettings[0],
      temp.Logs[0]
    );

    let readTemp = true;
    let writeTemp = true;
    let editTemp = true;
    let deleteTemp = true;
    for (const key in this.content.access) {
      if (this.content.access.hasOwnProperty(key)) {
        if (readTemp && this.content.access[key][0] === 1) {
          this.pageRead = 1;
        } else {
          this.pageRead = 0;
          readTemp = false;
        }
        if (writeTemp && this.content.access[key][1] === 1) {
          this.pageWrite = 1;
        } else {
          this.pageWrite = 0;
          writeTemp = false;
        }
        if (editTemp && this.content.access[key][2] === 1) {
          this.pageEdit = 1;
        } else {
          this.pageEdit = 0;
          editTemp = false;
        }
        if (deleteTemp && this.content.access[key][3] === 1) {
          this.pageDelete = 1;
        } else {
          this.pageDelete = 0;
          deleteTemp = false;
        }
      }
    }

    const accessed = [];
    if (this.content) {
      this.userContactMasked = this.content.userContactMasked;
      this.role = this.content.role;
      const data = this.content.access;
      // for(const access in data){
      for (const access of Object.keys(data)) {
        accessed.push({
          title: access,
          read: data[access].charAt(0),
          write: data[access].charAt(1),
          edit: data[access].charAt(2),
          delete: data[access].charAt(3),
        });
      }
      this.pagesMenu = accessed;
    }
  }

  reportCheckbox(event, title) {
    this.pagesMenu.map(x => {
      x[title] = event.target.checked ? '1' : '0';
    });
  }

  pageCheckbox(event, index, title) {
    this.pagesMenu[index][title] = event.target.checked ? '1' : '0';
    let readTemp = true;
    let writeTemp = true;
    let editTemp = true;
    let deleteTemp = true;
    if (this.pagesMenu[index][title] === '1') {
      for (const key in this.pagesMenu) {
        if (this.pagesMenu.hasOwnProperty(key)) {
          if (readTemp && this.pagesMenu[key].read === '1') {
            this.pageRead = 1;
          } else {
            this.pageRead = 0;
            readTemp = false;
          }
          if (writeTemp && this.pagesMenu[key].write === '1') {
            this.pageWrite = 1;
          } else {
            this.pageWrite = 0;
            writeTemp = false;
          }
          if (editTemp && this.pagesMenu[key].edit === '1') {
            this.pageEdit = 1;
          } else {
            this.pageEdit = 0;
            editTemp = false;
          }
          if (deleteTemp && this.pagesMenu[key].delete === '1') {
            this.pageDelete = 1;
          } else {
            this.pageDelete = 0;
            deleteTemp = false;
          }
        }
      }
    } else {
      switch (title) {
        case 'read':
          this.pageRead = 0;
          break;
        case 'write':
          this.pageWrite = 0;
          break;
        case 'edit':
          this.pageEdit = 0;
          break;
        case 'delete':
          this.pageDelete = 0;
          break;
      }
    }
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    const menuList = {};
    this.pagesMenu.map(x => {
      menuList[x.title] = x.read + '' + x.write + '' + x.edit + '' + x.delete;
    });
    const list = {
      _id: this.content ? this.content._id : false,
      role: this.role,
      userContactMasked: this.userContactMasked,
      access: menuList,
    };
    if (!list._id) {
      delete list._id;
    }
    this.ref.close(list);
  }
}
