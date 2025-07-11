import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, NgZone, OnInit, signal } from "@angular/core";
import { ItemListComponent } from "../../components/item-list/item-list.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface Sanh {
    maSanh: number;
    tenSanh: string;
    soLuongBanToiDa: number;
    donGiaBanToiThieu: number;
}

interface MonAn {
    maMonAn: number;
    tenMonAn: string;
    tenLoaiMonAn: string;
    donGia: number;
}

interface DichVu {
    maDichVu: number;
    tenDichVu: string;
    tenCongViec: string;
    donGia: number;
}

interface Ca {
    id: number;
    tenCa: string;
    gioBatDau: string;
    gioKetThuc: string;
}

interface CongViec {
    maCongViec: number;
    tenCongViec: string;
}

export type ItemDataMap = {
  hall: Sanh[];
  dish: MonAn[];
  service: DichVu[];
  shift: Ca[];
  job: CongViec[];
};

export type ItemID = keyof ItemDataMap;

export type Item<K extends ItemID = ItemID> = {
  id: K;
  title: string;
  icon: string;
  content: string;
  header: string[];
  data: ItemDataMap[K];
};

@Component ({
    selector: 'app-category',
    standalone: true,
    imports: [NgFor, ItemListComponent, NgIf],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
})



export class CategoryComponent implements OnInit{
    itemsName = [/* danh sách item như hiện tại */];
    selectedItem: any = null; // hoặc kiểu cụ thể nếu có


    onSelect(item: any) {
        this.selectedItem = item;
        console.log(item)
    }

    goBack() {
        this.selectedItem = null;
    }

    items = signal<Item[]>([
        {
            id: 'hall',
            title: 'Danh sách sảnh',
            icon: 'hall.png',
            content: 'Hiển thị danh sách của nhà hàng có thông'+
            ' tin: sảnh , loại sảnh, đơn giá tối thiểu,...',
            header: ['STT', 'Mã sảnh', 'Tên sảnh', 'Số lượng bàn tối đa', 'Đơn giá bàn tối thiểu'],
            data: []
        },
        {
            id: 'dish',
            title: 'Danh sách món ăn',
            icon: 'dish-food.png',
            content: 'Hiển thị danh sách món ăn của nhà hàng'+
            ' có thông tin: tên món ăn, đơn giá',
            header: ['STT', 'Mã món ăn', 'Tên món ăn', 'Đơn Giá', 'Loại Món Ăn'],
            data: []
        },
        {
            id: 'service',
            title: 'Danh sách dịch vụ',
            icon: 'customer-service.png',
            content: 'Hiển thị danh sách dịch vụ của nhà hàng'+
            ' cung cấp thông tin: tên địch vụ, đơn giá, ...',
            header: ['STT', 'Mã dịch vụ', 'Tên dịch vụ', 'Đơn giá', 'Tên Công Việc'],
            data: []
        },
        {
            id: 'shift',
            title: 'Danh sách ca',
            icon: 'shift.png',
            content: 'Hiển thị danh sách ca của nhà hàng cung'+
            ' cấp thông tin: tên ca, thời gian bắt đầu, ...',
            header: ['STT', 'Mã ca', 'Tên ca', 'Giờ bắt đầu', 'Giờ kết thúc'],
            data: []
        },
        {
            id: 'job',
            title: 'Danh sách công việc',
            icon: 'job.png',
            content: 'Hiển thị danh sách công việc của nhà hàng'+
            ' cung cấp thông tin: tên công việc, tên dịch vụ',
            header: ['STT', 'Mã công việc', 'Tên công việc'],
            data: []
        }

    ])

    constructor(private http: HttpClient) {};


    ngOnInit() {
        this.loadAllItems();
    }

    dataSources: { [K in ItemID]: string } = {
        hall: 'http://localhost:8081/api/sanh',
        dish: 'http://localhost:8081/api/monan',
        service: 'http://localhost:8081/api/dichvu',
        shift: 'http://localhost:8081/api/ca',
        job: 'http://localhost:8081/api/congviec'
    };

    customMappers: Partial<{
        [K in ItemID]: (data: any[]) => ItemDataMap[K];
    }> = {
        service: (data) => data.map(dv => ({
            maDichVu: dv.maDichVu,
            tenDichVu: dv.tenDichVu,
            donGia: dv.donGia,
            tenCongViec: dv.congViec?.tenCongViec || 'Không rõ'
        }))
    };

    loadAllItems(): void {
        (Object.keys(this.dataSources) as ItemID[]).forEach(id => {
            this.http.get<any[]>(this.dataSources[id]).subscribe((data) => {
            const mappedData = this.customMappers[id]?.(data) ?? data;

            this.items.update(oldItems =>
                oldItems.map(item =>
                item.id === id ? { ...item, data: mappedData } : item
                )
            );
            });
        });
    }

    handlers: Record<ItemID, (data: any) => Observable<any>> = {
        hall: (data: Sanh) => this.http.post('http://localhost:8081/api/sanh', data),
        dish: (data: MonAn) => this.http.post('http://localhost:8081/api/monan', data),
        service: (data: DichVu) => this.http.post('http://localhost:8081/api/dichvu', data),
        shift: (data: Ca) => this.http.post('http://localhost:8081/api/ca', data),
        job: (data: CongViec) => this.http.post('http://localhost:8081/api/congviec', data),
    };

    insertStatus = signal<'idle' | 'success' | 'fail'>('idle');
    updateStatus = signal<'idle' | 'success' | 'fail'>('idle');

    handleInsert(event: { key: string; data: any }) {
        const validKeys: ItemID[] = ['hall', 'dish', 'service', 'shift', 'job'];
        console.log('key, id, data: ', event.key, event.data)

        if (validKeys.includes(event.key as ItemID)) {
            const handler = this.handlers[event.key as ItemID];

            handler(event.data).subscribe({
                next: () => {
                    alert('Thêm thành công!');
                    this.insertStatus.set('success');
                    this.loadAllItems();
                    this.selectedItem = this.items().find(item => item.id === event.key) ?? null;
                    console.log('selectedItem: ', this.selectedItem)
                },
                error: () => {
                    alert('Thêm thất bại!');
                    this.insertStatus.set('fail');
                }
            });
        }
    }

    deleteHandlers: Record<ItemID, (id: number) => Observable<any>> = {
        hall: (id: number) => this.http.delete(`http://localhost:8081/api/sanh/${id}`),
        dish: (id: number) => this.http.delete(`http://localhost:8081/api/monan/${id}`),
        service: (id: number) => this.http.delete(`http://localhost:8081/api/dichvu/${id}`),
        shift: (id: number) => this.http.delete(`http://localhost:8081/api/ca/${id}`),
        job: (id: number) => this.http.delete(`http://localhost:8081/api/congviec/${id}`)
    };
    

    handleDelete(event: { key: string; id: number }) {
        const itemId = event.key as ItemID;
        const deleteFn = this.deleteHandlers[itemId];

        if (deleteFn) {
            if (confirm('Bạn có chắc chắn muốn xoá không?')) {
                deleteFn(event.id).subscribe({
                    next: (res) => {
                        console.log('Response:', res);
                        alert('Xoá thành công!');
                        this.refreshSelectedItemData();
                    },
                    error: (err) => {
                        console.error('Lỗi khi xoá:', err);
                        alert('Xoá thất bại!');
                    }
                });

            }
        }
    }

    updateHandlers: Record<ItemID, (id: number, data: any) => Observable<any>> = {
        hall: (id: number, data: any) => this.http.put(`http://localhost:8081/api/sanh/${id}`, data),
        dish: (id: number, data: any) => this.http.put(`http://localhost:8081/api/monan/${id}`, data),
        service: (id: number, data: any) => this.http.put(`http://localhost:8081/api/dichvu/${id}`, data),
        shift: (id: number, data: any) => this.http.put(`http://localhost:8081/api/ca/${id}`, data),
        job: (id: number, data: any) => this.http.put(`http://localhost:8081/api/congviec/${id}`, data)
    };

    handleUpdate(event: { key: string; id: number; data: any }) {
        console.log('key, id, data: ', event.key, event.id, event.data)
        const itemId = event.key as ItemID;
        const updateFn = this.updateHandlers[itemId];

        if (updateFn) {
            if (confirm('Bạn có muốn cập nhật thông tin này không?')) {
                updateFn(event.id, event.data).subscribe({
                    next: (res) => {
                        console.log('Update response:', res);
                        alert('Cập nhật thành công!');
                        this.updateStatus.set('success');
                        this.refreshSelectedItemData();
                    },
                    error: (err) => {
                        console.error('Lỗi khi cập nhật:', err);
                        alert('Cập nhật thất bại!');
                        this.updateStatus.set('fail');
                    }
                });
            }
        }
    }



    

    refreshSelectedItemData() {
        if (!this.selectedItem) return;
        const itemId = this.selectedItem.id as ItemID;

        const url = this.dataSources[itemId];
        this.http.get<any[]>(url).subscribe(data => {
            const mappedData = this.customMappers[itemId]?.(data) ?? data;

            this.items.update(oldItems =>
            oldItems.map(item =>
                item.id === itemId ? { ...item, data: mappedData } : item
            )
            );

            this.selectedItem = this.items().find(item => item.id === itemId) ?? null;
        });
    }


}