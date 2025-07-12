import { NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'node:console';
import { EntryType } from 'node:perf_hooks';
import { Observable } from 'rxjs';

interface CongViec {
  maCongViec: number;
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

interface CongViecCanChoTiecCuoi {
  maCongViec: number;
  tenCongViec: string;
  soLuongDichVu: number;
}

interface CongViecDaChon {
  maCongViec: number;
  tenCongViec: string;
  soLuongDichVu: number;
  phanCong: number;
}

interface TiecCuoi {
  maSanh: number;
  maTiecCuoi: number;
  ngayDaiTiec: string;
  tenCa: string;
  soLuongBan: number;
  tinhTrangPhanCong: boolean;
}

@Component({
  selector: 'app-assign-staff',
  imports: [NgFor, FormsModule],
  templateUrl: './assign-staff.component.html',
  styleUrl: './assign-staff.component.css'
})
export class AssignStaffComponent implements OnInit{
  @Input() wedding: any;

  selectedJob: number = 1;

  onCheckboxChange(isChecked: boolean, key: number, jobId: number) {
    console.log("wedding: ", this.wedding);
    const newStaff = this.filterNhanVien.find(item => item.maNhanVien === key);
    const listNhanVienDaChon = this.nhanViens.find(item => item.maNhanVien === key);
    if (newStaff) {
      newStaff.check = isChecked;
      
    }
    if (listNhanVienDaChon)
      listNhanVienDaChon.check = isChecked;
    
    var count = this.filterNhanVien.filter(item =>item.check).length;
    const congViec = this.CongViecsDaChon.find(item => item.maCongViec === Number(jobId));
    if (congViec) {
      congViec.phanCong = count;
    }
    console.log("Dữ liệu công việc đã chọn: ", congViec);

  }

  constructor(private router: Router, private http: HttpClient) {}
  @Output() backChooseParty = new EventEmitter<void>();

  onBackChooseParty() {
    console.log('Go Back');
    this.backChooseParty.emit();
  }

  congViecs: CongViec[] = [];
  nhanViens: NhanVien[] = [];
  filterNhanVien: NhanVien[] = [];
  CongViecsCanThiet: CongViecCanChoTiecCuoi[] = [];
  CongViecsDaChon: CongViecDaChon[] = [];

  ngOnInit(): void {
    this.loadCongViecs();
    this.loadNhanViens();
    this.loadCongViecsCanThiet();
  }

  loadCongViecsCanThiet(): void {
    if (this.wedding.maTiecCuoi != 0) {
      this.http.get<any[]>(`http://localhost:8081/api/chitietdichvu/thongke/congviec/${this.wedding.maTiecCuoi}`).subscribe({
        next: (data) => {
          this.CongViecsCanThiet = data;
          this.CongViecsDaChon = data.map(cv => ({...cv, phanCong: 0}))
          console.log('Dữ liệu công việc cần thiết:', data);
        },
        error: (err) => {
          console.error('Lỗi khi lấy công việc cần thiết:', err);
        }
      });
    }
  }

  loadCongViecs(): void {
    this.http.get<any[]>('http://localhost:8081/api/congviec').subscribe({
      next: (data) => {
        this.congViecs = data
        console.log('Dữ liệu công việc:', this.congViecs);
      },
      error: (err) => {
        console.error('Lỗi khi lấy công việc:', err);
      }
    });
  }

  loadNhanViens(): void {
    this.http.get<any[]>('http://localhost:8081/api/nhanvien/chua-phan-cong').subscribe({
      next: (data) => {
        this.nhanViens = data.map(cv => ({ ...cv, phanCong: false }));
        this.filterNhanVien = this.nhanViens.filter(nv => nv.maCongViec === +this.selectedJob);
        console.log('Dữ liệu toàn bộ nv:', this.nhanViens);
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

  @Output() onBackStep1 = new EventEmitter<void>();

  comfirmAssign() {
    const isConfirmed = window.confirm('Bạn có chắc muốn xác nhận và lưu thông tin phân công không?');
    if (isConfirmed) {
      this.saveDataAndGoHome();
    }
  }

  saveDataAndGoHome() {
    console.log('Go Home');
    this.saveAssignInfo();
    window.alert('Lưu thông tin phân công thành công');
    this.onBackStep1.emit();
  }

  saveAssignInfo() {
    const selectedNhanVien = this.nhanViens.filter(nv => nv.check).map(nv => nv.maNhanVien);

    if (this.wedding.maTiecCuoi != 0 && selectedNhanVien)
      selectedNhanVien.forEach(maNhanVien => {
        const params = new HttpParams()
          .set('maNhanVien', maNhanVien)
          .set('maTiecCuoi', this.wedding.maTiecCuoi);
        this.http.post('http://localhost:8081/api/phancong', null, { params }).subscribe();
      });
  }

}
