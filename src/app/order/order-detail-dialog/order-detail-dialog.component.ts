import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaleOrderService } from 'src/core/services/SaleOrderService';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
  
})
export class OrderDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private saleOrderService: SaleOrderService
  ) {}
  close(): void {
    this.dialogRef.close();
  }

  exportBill(id: any) {
    this.saleOrderService.exportOrder(id).subscribe(
      (res) => {
        console.log("Xuất hóa đơn thành công:", res);
        this.close();
      },
      (err) => {
        console.error("Lỗi khi xuất hóa đơn:", err);
      }
    );
  }


}
