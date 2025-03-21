import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/core/services/ProductService';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: Router
  ) {
    this.productForm = this.fb.group({
      subCategoryId: [this.dataSubCate[0]?.subCategoryId, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      basePrice: ['', [Validators.required, Validators.min(0)]],
      mainImg: ['', [Validators.required, Validators.pattern('https?://.+')]],
      createDate: ['', Validators.required],
      warranty: ['', [Validators.required, Validators.min(1)]],
      screenSize: ['', Validators.required],
      screenResolution: ['', Validators.required],
      processor: ['', Validators.required],
      rearCamera: ['', Validators.required],
      frontCamera: ['', Validators.required],
      battery: ['', Validators.required],
      fastCharging: [false],
      water_resistance: [false],
      releaseDate: ['', Validators.required],
      os: ['', Validators.required],
      design: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      batteryType: ['', Validators.required],
      network: ['', Validators.required],
      sim: ['', Validators.required],
      wifi: ['', Validators.required],
      gps: [false],
      nfc: [false]
    });
  }

  productForm!: FormGroup;
  successMessage: string = '';
  dataCate: any[] = [];
  dataSubCate: any[] = [];
  id: number = 0;

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(response => {
        this.id = response.result.productId;
        this.productForm.reset(); 
        this.route.navigate([`/product/${this.id}`])
      }, error => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });
    } else {
      console.log('Form không hợp lệ!');
    }
  }

  getAllCate(){
    this.productService.getAllCate().subscribe(response => {
      this.dataCate = response.result;
      console.log(this.dataCate)
    })
  }

  changeCate(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategoryName = selectElement.value;
    this.getSubCateByCateId(selectedCategoryName)
  }

  getSubCateByCateId(id: string){
    this.productService.getSubCateByCateId(id).subscribe(response => {
      this.dataSubCate = response.result;
      console.log(this.dataSubCate)
    })
  }

  ngOnInit(): void {
    this.getAllCate();
    this.getSubCateByCateId("1")

   
  }

}
