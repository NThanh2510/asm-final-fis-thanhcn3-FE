import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/core/services/CamundaOrder';
import { SaleOrderService } from 'src/core/services/SaleOrderService';
import { TaskListService } from 'src/core/services/TaskListService';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import BpmnViewer from 'bpmn-js';
import { finalize, forkJoin, map } from 'rxjs';
import { LoadingService } from 'src/core/services/LoadingService';

@Component({
  selector: 'app-coupen-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  constructor(
    private taskListService: TaskListService,
    private orderService: OrderService,
    private salaOrderService: SaleOrderService,
    private dialog: MatDialog,
    private camundaOrderSerive: OrderService,
    private loadingService: LoadingService
  ) {}

  @ViewChild('canvas', { static: true })
  private canvas!: ElementRef;
  private viewer!: BpmnViewer;
  dataList: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  formattedDate: string = '';

  formatDate(date: string) {
    const parsedDate = new Date(date);
    
   
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
  
   
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    const seconds = String(parsedDate.getSeconds()).padStart(2, "0");
  
    this.formattedDate = `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
  }
  

  getDataList() {
    this.loadingService.sleepLoading(true); 
    this.taskListService.getTaskList()
      .pipe(finalize(() => this.loadingService.sleepLoading(false)))
      .subscribe({
        next: (dataList) => {
          this.dataList = dataList;
          this.dataList.forEach(item => {
                if (item.created) {
                  this.formatDate(item.created);
                  item.formattedDate = this.formattedDate;
                }
              });
          console.log("data: ", this.dataList);
        },
        error: (err) => {
          console.error('Lỗi khi tải dữ liệu:', err);
        }
      });
  }
  
      // this.taskListService.getTaskList().subscribe((request) => {
    //   this.dataList = request;
    //   console.log(this.dataList);
    //   this.dataList.forEach(item => {
    //     if (item.created) {
    //       this.formatDate(item.created);
    //       item.formattedDate = this.formattedDate;
    //     }
    //   });
    // });

  acceptTask(taskId: string, isApproved: boolean) {
    console.log(taskId);
    this.orderService.acceptTask(taskId, isApproved).subscribe(() => {
      this.getDataList();
    });
    
  }
  payTask(taskId: string, isPay: boolean) {
    console.log(taskId);
    this.orderService.payTask(taskId, isPay).subscribe(() => {
      this.getDataList();
    });
  }

  openDetail(processId: string) {
    console.log(processId);
    this.salaOrderService
      .getOrderByDetailByprocessId(processId)
      .subscribe((orderDetail) => {
        console.log(orderDetail);
        this.dialog.open(OrderDetailDialogComponent, {
          width: '600px',
          data: orderDetail.result,
        });
      });
  }

  openBpnm() {
    this.viewer = new BpmnViewer({ container: this.canvas.nativeElement });
    this.camundaOrderSerive.getBPMNXml()
    .subscribe(response => {
      if (response.bpmn20Xml) {
        this.loadDiagram(response.bpmn20Xml);
      }
      else {
        console.log("null");
      }
    })
  }

  private loadDiagram(xml: string) {
    this.viewer.importXML(xml)
      .then(() => {
        console.log('BPMN sơ đồ đã được tải!');
      })
      .catch(err => {
        console.error('Lỗi khi hiển thị sơ đồ BPMN:', err);
      });
  }

  ngOnInit(): void {
   this.getDataList()
    this.openBpnm();
  }
}
