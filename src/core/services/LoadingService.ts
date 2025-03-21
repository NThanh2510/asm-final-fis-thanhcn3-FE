import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})

export class LoadingService{
    constructor(private spinner: NgxSpinnerService) { }

    sleep(milliseconds: number): Promise<void> {
      this.spinner.show();
      return new Promise(resolve => {
        setTimeout(() => {
          this.spinner.hide();
          resolve();
        }, milliseconds);
      });
    }

    sleepLoading(load: boolean){
      if (load) {
        this.showLoading(); 
      } else {
        this.hideLoading(); 
      }
    }

    showLoading(): void {
      this.spinner.show();
    }
  
    hideLoading(): void {
      this.spinner.hide();
    }
}