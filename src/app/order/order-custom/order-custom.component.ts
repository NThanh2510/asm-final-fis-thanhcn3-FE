import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/core/services/CamundaOrder';
import { SaleOrderService } from 'src/core/services/SaleOrderService';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/core/services/LoadingService';

@Component({
  selector: 'app-coupen-custom',
  templateUrl: './order-custom.component.html',
  styleUrls: ['./order-custom.component.scss'],
})
export class OrderCustomComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private salaOrderService: SaleOrderService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  dataList: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  isMessageVisible: boolean = false

  getListData() {
    this.orderService.orderList().subscribe((response) => {
      this.dataList = response.result;
      console.log(this.dataList);
    });
  }

  getListDataByUserId(kcid: string) {
    this.salaOrderService.getOrderByUser(kcid).subscribe((response) => {
      this.dataList = response.result;
      console.log(this.dataList);
    });
  }

  get filteredDataList() {
    return this.dataList.filter(
      (item) => item.status !== 'CANCEL' && item.status !== 'PENDING'
    );
  }

  openDetail(orderId: number) {
    console.log(orderId);
    this.salaOrderService
      .getOrderByDetailByOrderId(orderId)
      .subscribe((orderDetail) => {
        console.log(orderDetail);
        this.dialog.open(OrderDetailDialogComponent, {
          width: '600px',
          data: orderDetail.result,
        });
      });
  }
  async sleep() {
    await this.loadingService.sleep(400);
    this.isMessageVisible = true;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const kcid: string = params['kcid'];
      if (kcid) {
        this.getListDataByUserId(kcid);
      } else {
        this.getListData();
      }
    });
    this.sleep();
  }
}

