import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/core/services/ProductService';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ){}

  dataList: any = [];
  productId: number = 0
  isAddFormVisible: boolean = false;
  optionForm!: FormGroup;

  getDetailProduct(id: number){
    this.productService.getOptionsByProduct(id).subscribe(response =>{
      this.dataList = response.result;
    })
  }
  toggleAddProductForm(): void {
    this.isAddFormVisible = !this.isAddFormVisible;
  }
  onSubmit(): void {  
    if (this.optionForm.valid) {
      // console.log('Sản phẩm đã được lưu:', this.optionForm.valid);
      this.productService.addOption(this.optionForm.value).subscribe( response =>{
        console.log(response);
      })
      window.location.reload()
      this.isAddFormVisible = false;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']
      this.getDetailProduct(this.productId)
    });
    this.optionForm = this.fb.group({
      color: ['', Validators.required],
      colorPriceAdjustment: ['', Validators.required],
      storageRam: ['', Validators.required],
      storageRamPriceAdjustment: ['', Validators.required],
      quantity: ['', Validators.required],
      productId: [this.productId]
      
    });
  }
 
}
