import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/core/services/CamundaOrder';

@Component({
  selector: 'app-coupen-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit{

  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  coupenCreateForm!: FormGroup;
  taskId = 'e01b1b27-f02a-11ef-8789-088fc31a2cf6';

  ngOnInit(): void {
    this.coupenCreateForm = this.fb.group({
      username: ['', [Validators.required]],  // Username là trường bắt buộc
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]  // Age là trường bắt buộc và phải là số
    });
  }


  // onSubmit(): void {
  //   if (this.coupenCreateForm.valid) {

  //     const variables = {
  //       username: this.coupenCreateForm.value.username,
  //       age: this.coupenCreateForm.value.age
  //     };

  //     // Gửi dữ liệu lên Camunda để hoàn thành task
  //     this.voucherService.completeTask(this.taskId, variables).subscribe(
  //       (response) => {
  //         console.log('Task completed', response);
  //       },
  //       (error) => {
  //         console.error('Error completing task', error);
  //       }
  //     );
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }
}
