import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'node:console';

@Component({
  selector: 'app-assign-staff',
  imports: [NgFor, FormsModule],
  templateUrl: './assign-staff.component.html',
  styleUrl: './assign-staff.component.css'
})
export class AssignStaffComponent {
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
  selectedJob: string = 'Đứng sảnh';

  get filteredStaffs() {
    return this.staffs.filter(item => item.job === '' || item.job === this.selectedJob);
  }

  get filteredJob() {
    return [...new Set((this.staffs.filter(item => item.job)).map(item => item.job))]
  }

  countStaffByRole(role: string) {

    
    return this.staffs.filter(item => item.job === role).length;
  }


  onCheckboxChange(isChecked: boolean, key: string, role: string) {
    if(isChecked) {
      var newStaff = this.staffs.find(item => item.id === key)
      if (newStaff) {
        newStaff.job = role;
      }
    }
    else {
      var newStaff = this.staffs.find(item => item.id === key)
      if (newStaff) {
        newStaff.job = '';
      }
    }
  }

  // Xử lý btn
  constructor(private router: Router) {}
  @Output() backChooseParty = new EventEmitter<void>();

  onBackChooseParty() {
    console.log('Go Back');
    this.backChooseParty.emit();
  }

  onHome() {
    console.log('Go Home');
    this.router.navigate(['/home']);
  }
}
