import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'node:console';
import { Observable } from 'rxjs';

interface CongViec {
  id: number;
  tenCongViec: string;
}

interface NhanVien {
  maNhanVien: number;
  tenNhanVien: string;
  gioiTinh: string;
  loaiNhanVien: string;
  sdt: string;
  maCongViec: number;
  maTiecCuoi: number;
  check: boolean;
}

interface DichVuSuDung {
  id: {
    maDichVu: number,
    maTiecCuoi: number,
  },
  soLuong: number,
  donGiaDichVu: number,
  thanhTien: number,
}

@Component({
  selector: 'app-assign-staff',
  imports: [NgFor, FormsModule],
  templateUrl: './assign-staff.component.html',
  styleUrl: './assign-staff.component.css'
})
export class AssignStaffComponent implements OnInit{
  @Input() data: any = null;
  wedding = {
    date: '26/06/2025',
    time: '11:00:00',
    id: 'TC0001',
    idHall: 'SN0001',
  };

  services = [
    {name: 'Dịch vụ MC', count: 1},
    {name: 'Dịch vụ phục vụ', count: 5},
    {name: 'Dịch vụ trang trí', count: 1},
    {name: 'Dịch vụ đứng sảnh', count: 1},
    {name: 'Dịch vụ MC', count: 1},
    {name: 'Dịch vụ phục vụ', count: 5},
    {name: 'Dịch vụ trang trí', count: 1},
    {name: 'Dịch vụ đứng sảnh', count: 1},
    {name: 'Dịch vụ MC', count: 1},
    {name: 'Dịch vụ phục vụ', count: 5},
    {name: 'Dịch vụ trang trí', count: 1},
    {name: 'Dịch vụ đứng sảnh', count: 1},
    {name: 'Dịch vụ MC', count: 1},
    {name: 'Dịch vụ phục vụ', count: 5},
    {name: 'Dịch vụ trang trí', count: 1},
    {name: 'Dịch vụ đứng sảnh', count: 1},
    {name: 'Dịch vụ MC', count: 1},
    {name: 'Dịch vụ phục vụ', count: 5},
    {name: 'Dịch vụ trang trí', count: 1},
    {name: 'Dịch vụ đứng sảnh', count: 1},

  ]

  jobs = [
    'Đứng sảnh', 'MC', 'Phục vụ', 'Trang trí'
  ];


  staffs = [
    {
      id: 'NV0001', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0002', 
      name: 'Ng thanh cong', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: true,
      job: 'Đứng sảnh',
    },
    {
      id: 'NV0003', 
      name: 'Ng Hoai My', 
      sex: 'nu', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0004', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: true,
      job: 'MC',
    },{
      id: 'NV0005', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0006', 
      name: 'Ng thanh cong', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0007', 
      name: 'Ng Hoai My', 
      sex: 'nu', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0008', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0009', 
      name: 'Ng thanh cong', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0010', 
      name: 'Ng Hoai My', 
      sex: 'nu', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0011', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0012', 
      name: 'Ng thanh cong', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0013', 
      name: 'Ng Hoai My', 
      sex: 'nu', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    },
    {
      id: 'NV0014', 
      name: 'le tan thhuan', 
      sex: 'nam', 
      type: 'Thời vụ',
      phone: '0914059332',
      checked: false,
      job: '',
    }

  ]

  // Xử lý dữ liệu bảng
  selectedJob: number = 1;

  // get filteredStaffs() {
  //   return this.staffs.filter(item => item.job === '' || item.job === this.selectedJob);
  // }

  get filteredJob() {
    return [...new Set((this.staffs.filter(item => item.job)).map(item => item.job))]
  }

  countStaffByRole(role: string) {
    return this.staffs.filter(item => item.job === role).length;
  }


  onCheckboxChange(isChecked: boolean, key: number) {
    if(isChecked) {
      var newStaff = this.filterNhanVien.find(item => item.maNhanVien === key)
    }
    else {
      var newStaff = this.filterNhanVien.find(item => item.maNhanVien === key)
      if (newStaff) {
        newStaff.check = true;
      }
    }
  }

  // Xử lý btn
  constructor(private router: Router, private http: HttpClient) {}
  @Output() backChooseParty = new EventEmitter<void>();

  onBackChooseParty() {
    console.log('Go Back');
    this.backChooseParty.emit();
  }

  onHome() {
    console.log('Go Home');
    console.log(this.data);
    this.router.navigate(['/home']);
  }
  // Xử lý data Cong Viec

  congViecs: CongViec[] = [];
  nhanViens: NhanVien[] = [];
  filterNhanVien: NhanVien[] = [];
  dichVuSuDungs: DichVuSuDung[] = [];

  ngOnInit(): void {
    this.loadCongViecs();
    this.loadNhanViens();
  }

  loadCongViecs(): void {
    this.http.get<any[]>('http://localhost:8081/api/congviec').subscribe({
      next: (data) => {
        this.congViecs = data.map(cv => ({ ...cv, check: false }));
        console.log('Dữ liệu công việc:', data);
      },
      error: (err) => {
        console.error('Lỗi khi lấy công việc:', err);
      }
    });
  }

  loadNhanViens(): void {
    this.http.get<any[]>('http://localhost:8081/api/nhanvien/chua-phan-cong').subscribe({
      next: (data) => {
        this.nhanViens = data;
        console.log('Dữ liệu nhân viên chưa phân công:', data);
        this.filterNhanVien = this.nhanViens.filter(nv => nv.maCongViec === +this.selectedJob);
        console.log("load du lieu da loc",this.filterNhanVien)
      },
      error: (err) => {
        console.error('Lỗi khi lấy nhân viên:', err);
      }
    });
  }

  onSelectedJobChange() {
    this.filterNhanVien = this.nhanViens.filter(nv => nv.maCongViec === +this.selectedJob);
    console.log("Dữ liệu nhân viên theo nghề: ", this.selectedJob, this.filterNhanVien);
  }
}
