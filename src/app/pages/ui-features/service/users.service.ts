import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  // get active users
  uploadImageToCloud(data, config): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', data);
    formData.append('upload_preset', config.upload_preset);
    console.log(config);
    // formData.append('fileKey', this.croppedImage, this.croppedImage.name);
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${config.cloud_name}/upload`,
      formData
    );
  }
}
