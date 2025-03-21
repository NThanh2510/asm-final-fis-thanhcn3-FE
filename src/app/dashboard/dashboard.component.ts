import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/core/services/ReportService';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SaleOrderService } from 'src/core/services/SaleOrderService';
import { LoadingService } from 'src/core/services/LoadingService';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private saleOrderService: SaleOrderService,
    private loadingService: LoadingService
  ) {
    const today = new Date();
    const startDate = this.startDate = this.getDateOffset(today, -1);
    const endDate = this.endDate = this.getDateOffset(today, +1);
  }

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  revenueInDay: number = 0;
  countOrdersInDay: number = 0;
  countCustomers: number = 0;
  isMessageVisible: boolean = false;
  animatedRevenue: number = 0;
  animatedCountOrdersInDay: number = 0;
  animatedCountCustomers: number = 0;
  dataCountProductCategoryByDate: any[] = [];
  dataListOrder: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';
  filteredOrders: any[] = [...this.dataListOrder];
  
  isSearchActive: boolean = false;


  pieChartLabels: string[][] = [];
  pieChartDatasets = [
    {
      data: [] as number[],
    },
  ];
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartLegend = true;
  pieChartPlugins = [];
  //chart bar
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        data: Array(12).fill(0),
        label: 'Doanh thu',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(46, 98, 220)',
        borderWidth: 1,
      },
    ],
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            let value = context.raw;
            if (typeof value === 'number') {
              return ` ${(value / 1_000_000).toFixed(1)} Triệu`;
            }
            return 'N/A';
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Ẩn lưới trục X
      },
      y: {
        ticks: {
          callback: (value) => value.toLocaleString('en-US') + '', // Hiển thị số có dấu phẩy
        },
      },
    },
    animation: {
      duration: 1000, // Animation 1 giây
    },
  };
  ngAfterViewInit() {
    if (this.chart?.chart?.ctx) {
      const ctx = this.chart.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgb(0, 229, 255)'); // Màu đậm
      gradient.addColorStop(1, 'rgba(0, 132, 255, 0.2)'); // Màu nhạt
      this.barChartData.datasets[0].backgroundColor = gradient;
      this.chart.update();
    }
  }

  startDate: string;
  endDate: string;

  getDateOffset(date: Date, offset: number): string {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);
    return newDate.toISOString().split('T')[0];
  }

  animateValue(property: string, targetValue: number) {
    let step = Math.ceil(targetValue / 100);
    let counter = 0;
    let interval = setInterval(() => {
      counter += step;
      if (counter >= targetValue) {
        (this as any)[property] = targetValue;
        clearInterval(interval);
      } else {
        (this as any)[property] = counter;
      }
    }, 10);
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredOrders = this.dataListOrder.filter((order) =>
        order.nameUser.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredOrders = [...this.dataListOrder];
    }
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    forkJoin({
      productCategories: this.reportService.getCountProductCategoryByDate(this.startDate, this.endDate),
      revenue: this.reportService.getRevenueInDay(this.startDate, this.endDate),
      customers: this.reportService.getCountCustomers(),
      orders: this.saleOrderService.getAllOrder(),
      monthlyRevenue: this.reportService.getMonthlyRevenue(),
    }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
        this.isMessageVisible = true;
      })
    ).subscribe({
      next: ({ productCategories, revenue, customers, orders, monthlyRevenue }) => {
        this.dataCountProductCategoryByDate = productCategories.result;
        this.pieChartLabels = this.dataCountProductCategoryByDate.map(item => item.name);
        this.pieChartDatasets[0].data = this.dataCountProductCategoryByDate.map(item => item.count);

        this.revenueInDay = revenue.result[0]?.totalRevenue || 0;
        this.countOrdersInDay = revenue.result[0]?.countOrders || 0;
        this.animateValue('animatedRevenue', this.revenueInDay);
        this.animateValue('animatedCountOrdersInDay', this.countOrdersInDay);

        this.countCustomers = customers.result?.countUser || 0;
        this.animateValue('animatedCountCustomers', this.countCustomers);

        this.dataListOrder = orders.result || [];

        const monthSales = Array(12).fill(0);
        monthlyRevenue.result.forEach((item: any) => {
          monthSales[item.monthly - 1] = item.revenue;
        });
        this.barChartData.datasets[0].data = monthSales;
      },
      error: (err) => {
        console.error('Lỗi khi tải dữ liệu:', err);
      }
    });
  }
}
