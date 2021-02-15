import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';

@Injectable({
  providedIn: 'root',
})
export class AttributeGroupService {
  constructor(private http: HttpClient) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  attributesListEdit(id) {
    return this.http.get(`${Url}attributesGroup/?attributeGroupId=` + id);
  }

  attributesList(data) {
    return this.http.get(
      `${Url}attributes/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status
    );
  }

  attributeGroupList(data) {
    return this.http.get(
      `${Url}attributesGroup/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status +
        '&searchedKey=' +
        data.searchedKey
    );
  }

  deleteAttributes(data) {
    return this.http.patch(`${Url}deleteAttributeGroup/`, data);
  }

  /**
   * @param  data whole data which we need to send to banckend api
   * @param  id for checking the which api we need to call
   * @returns update the data or post data in database
   *
   */
  addAtrribute(data, id) {
    if (id !== '1') {
      data.id = id;
      console.log(data);
      return this.http.patch(`${Url}updateAttributesGroup/`, data);
    } else {
      return this.http.post(`${Url}addAttributesGroup/`, data);
    }
  }

  attributesReorderList(data) {
    return this.http.get(
      `${Url}attributesGroupAttrChangeOrder/?attrId=` +
        data.attrId +
        '&order=' +
        data.order +
        '&attrGroupId=' +
        data.attrGroupId
    );
  }
}
