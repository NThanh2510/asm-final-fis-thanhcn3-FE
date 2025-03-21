import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { LoadingService } from 'src/core/services/LoadingService';
import { ProductService } from 'src/core/services/ProductService';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private loadingSerive: LoadingService
  ) { }

  dataList: any[] = [];
  dataListByCategory: any[] = [];
  dataListBySubCategory: any[] = [];
  allProducts: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  dataCategoryName: any[] = [];
  dataSubCategoryName: any[] = [];
  AllSubCategoryName: any[] = [];
  checkSearch: boolean = false;

  // getProducts() {
  //   this.productService.getProducts().subscribe((response) => {
  //     this.allProducts = response.result;
  //     this.dataList = this.allProducts
  //     this.dataListByCategory = this.allProducts;
  //     const uniqueCategories = new Set(
  //       response.result.map((item: any) => item.categoryName)
  //     );
  //     this.dataCategoryName = Array.from(uniqueCategories);
  //     const subUniqueCategories = new Set(
  //       response.result.map((item: any) => item.subCategoryName)
  //     );
  //     this.AllSubCategoryName = Array.from(subUniqueCategories);
  //     this.dataSubCategoryName = this.AllSubCategoryName;
  //     console.log(this.dataCategoryName);
  //   });
  // }

  submitDetail(id: number) {
    this.router.navigate([`/product/${id}`]);
  }

  filterProductsByCategory(event: Event): void {
    this.loadingSerive.sleepLoading(true)
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategoryName = selectElement.value;
    if (!selectedCategoryName) {
      this.checkSearch = false;
      this.dataListByCategory = this.allProducts;
    } else {
      
      this.dataListByCategory = this.allProducts.filter(
        (product) => product.categoryName === selectedCategoryName
      );
      this.dataList = this.dataListByCategory
      this.checkSearch = true;
    }
    this.setSubCategoriesByProducts();
    this.loadingSerive.sleepLoading(false)
    // this.sleep()
  }

  setSubCategoriesByProducts(): void {
    const subCategoryNames = this.dataListByCategory.map(
      (product) => product.subCategoryName
    );
    this.dataSubCategoryName = [...new Set(subCategoryNames)];
    console.log(this.dataSubCategoryName);
  }

  filterSubProductsByCategory(event: Event): void {
    this.loadingSerive.sleepLoading(true)
    const selectElementSub = event.target as HTMLSelectElement;
    const selectedSubCategoryName = selectElementSub.value;
    if (!selectedSubCategoryName) {
      this.dataList = this.dataListByCategory;
    } else {
      this.dataListBySubCategory = this.dataListByCategory.filter(
        (product) => product.subCategoryName === selectedSubCategoryName
      );
      this.dataList = this.dataListBySubCategory
      console.log(this.dataList)
    }

    this.loadingSerive.sleepLoading(false)
  }

  // sleep() {
  //   this.loadingSerive.sleep(200)
  // }



  ngOnInit(): void {
    this.loadingSerive.sleepLoading(true);
    forkJoin({
      products: this.productService.getProducts()
    }).pipe(
      finalize(() => {
        this.loadingSerive.sleepLoading(false);
      })
    ).subscribe({
      next: ({ products }) => {
        this.allProducts = products.result;
        this.dataList = this.allProducts;
        this.dataListByCategory = this.allProducts;
        const uniqueCategories = new Set(
          products.result.map((item: any) => item.categoryName)
        );
        this.dataCategoryName = Array.from(uniqueCategories);
        const subUniqueCategories = new Set(
          products.result.map((item: any) => item.subCategoryName)
        );
        this.AllSubCategoryName = Array.from(subUniqueCategories);
        this.dataSubCategoryName = this.AllSubCategoryName;
        console.log(this.dataCategoryName);
      }
    })


    // this.getProducts();
    // this.sleep()
  }
}
