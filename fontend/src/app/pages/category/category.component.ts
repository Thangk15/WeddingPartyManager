import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ItemListComponent } from "../../components/item-list/item-list.component";

@Component ({
    selector: 'app-category',
    standalone: true,
    imports: [NgFor, ItemListComponent, NgIf],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
})

export class CategoryComponent {
    itemsName = [/* danh sách item như hiện tại */];
    selectedItem: any = null; // hoặc kiểu cụ thể nếu có


    onSelect(item: any) {
        this.selectedItem = item;
        console.log(item)
    }

    goBack() {
        this.selectedItem = null;
    }
    items = [
        {
            id: 'hall',
            title: 'Danh sách sảnh',
            icon: 'hall.png',
            content: 'Hiển thị danh sách của nhà hàng có thông'+
            ' tin: sảnh , loại sảnh, đơn giá tối thiểu,...',
            header: ['STT', 'Mã sảnh', 'Tên sảnh', 'Số lượng bàn tối đa', 'Đơn giá bàn tối thiểu'],
            data: [
                {
                    id: 'SN0001',
                    name: 'Cung điện ánh sáng',
                    maxTableQuantity: 50,
                    minTablePrice: 4000000
                },
                {
                    id: 'SN0002',
                    name: 'Rừng nguyên sinh',
                    maxTableQuantity: 70,
                    minTablePrice: 4000000
                },
                {
                    id: 'SN0003',
                    name: 'Sảnh đường hồi ức',
                    maxTableQuantity: 90,
                    minTablePrice: 4000000
                },
                {
                    id: 'SN0004',
                    name: 'Cung điện hoàng gia',
                    maxTableQuantity: 60,
                    minTablePrice: 4000000
                },
                {
                    id: 'SN0005',
                    name: 'Thảo nguyên nguyên sơ',
                    maxTableQuantity: 80,
                    minTablePrice: 4000000
                },
            ]
        },
        // {
        //     id: 'hall-type',
        //     title: 'Danh sách loại sảnh',
        //     icon: 'hall.png',
        //     content: 'Hiển thị danh sách loại sảnh của nhà hàng'+
        //     ' có thông tin: tên loại sảnh, đơn giá tối thiểu, ...',
        //     header: ['STT', 'Mã sảnh', 'Tên sảnh', 'Số lượng bàn tối đa', 'Đơn giá bàn tối thiểu'],
        //     data: [
        //         {
        //             id: 'SN0001',
        //             name: 'Cung điện ánh sáng',
        //             maxTableQuantity: 50,
        //             minTablePrice: 4000000
        //         },
        //         {
        //             id: 'SN0002',
        //             name: 'Rừng nguyên sinh',
        //             maxTableQuantity: 70,
        //             minTablePrice: 4000000
        //         },
        //         {
        //             id: 'SN0003',
        //             name: 'Sảnh đường hồi ức',
        //             maxTableQuantity: 90,
        //             minTablePrice: 4000000
        //         },
        //         {
        //             id: 'SN0004',
        //             name: 'Cung điện hoàng gia',
        //             maxTableQuantity: 60,
        //             minTablePrice: 4000000
        //         },
        //         {
        //             id: 'SN0005',
        //             name: 'Thảo nguyên nguyên sơ',
        //             maxTableQuantity: 80,
        //             minTablePrice: 4000000
        //         },
        //     ]
        // },
        {
            id: 'dish',
            title: 'Danh sách món ăn',
            icon: 'dish-food.png',
            content: 'Hiển thị danh sách món ăn của nhà hàng'+
            ' có thông tin: tên món ăn, đơn giá',
            header: ['STT', 'Mã món ăn', 'Tên món ăn', 'Loại món ăn', 'Đơn giá'],
            data: [
                {
                id: 'MA0001',
                name: 'Tôm chiên HongKong',
                type: 'Món chính',
                price: 400000,
                },
                {
                id: 'MA0002',
                name: 'Gà quay HongKong',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0003',
                name: 'Chả 4 mùa',
                type: 'Khai vị',
                price: 300000,
                },
                {
                id: 'MA0004',
                name: 'Chả thành hôn',
                type: 'Khai vị',
                price: 300000,
                },
                {
                id: 'MA0005',
                name: 'Súp hạt sen',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0006',
                name: 'Bánh bao thịt tứ xuyên',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0007',
                name: 'Lẩu hải sản',
                type: 'Món chính',
                price: 400000,
                },
                {
                id: 'MA0008',
                name: 'Chè đậu biếc',
                type: 'Tráng miệng',
                price: 200000,
                },
                {
                id: 'MA0009',
                name: 'Bánh đông sương 4 mùa',
                type: 'Tráng miệng',
                price: 300000,
                },
                {
                id: 'MA0010',
                name: 'Gà Tần',
                type: 'Món chính',
                price: 500000,
                },
                {
                id: 'MA0011',
                name: 'Gỏi bò',
                type: 'Món chính',
                price: 500000,
                },
                {
                id: 'MA0012',
                name: 'Tôm chiên HongKong',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0013',
                name: 'Tôm chiên HongKong',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0014',
                name: 'Tôm chiên HongKong',
                type: 'Món chính',
                price: 300000,
                },
                {
                id: 'MA0015',
                name: 'Tôm chiên HongKong',
                type: 'Món chính',
                price: 300000,
                },
            ]
        },
        {
            id: 'service',
            title: 'Danh sách dịch vụ',
            icon: 'customer-service.png',
            content: 'Hiển thị danh sách dịch vụ của nhà hàng'+
            ' cung cấp thông tin: tên địch vụ, đơn giá, ...',
            header: ['STT', 'Mã dịch vụ', 'Tên dịch vụ', 'Đơn giá'],
            data: [
            {
            id: 'DV0001',
            name: 'Dịch vụ trang trí',
            price: 2000000,
            },
            {
            id: 'DV0002',
            name: 'Dịch vụ phục vụ',
            price: 2000000,
            },
            {
            id: 'DV0003',
            name: 'Dịch vụ đứng sảnh',
            price: 2000000,
            },
            {
            id: 'DV0004',
            name: 'Dịch vụ MC',
            price: 2000000,
            },
            {
            id: 'DV0005',
            name: 'Dịch vụ phục vụ',
            price: 2000000,
            },
            {
            id: 'DV0006',
            name: 'Dịch vụ đứng sảnh',
            price: 2000000,
            },
            {
            id: 'DV0007',
            name: 'Dịch vụ MC',
            price: 2000000,
            },
            {
            id: 'DV0008',
            name: 'Dịch vụ phục vụ',
            price: 2000000,
            },
            {
            id: 'DV0009',
            name: 'Dịch vụ đứng sảnh',
            price: 2000000,
            },
            {
            id: 'DV0010',
            name: 'Dịch vụ MC',
            price: 2000000,
            },
            {
            id: 'DV0011',
            name: 'Dịch vụ phục vụ',
            price: 2000000,
            },
            {
            id: 'DV0012',
            name: 'Dịch vụ đứng sảnh',
            price: 2000000,
            },
            {
            id: 'DV0013',
            name: 'Dịch vụ MC',
            price: 2000000,
            },
            {
            id: 'DV0014',
            name: 'Dịch vụ phục vụ',
            price: 2000000,
            },
            {
            id: 'DV0015',
            name: 'Dịch vụ đứng sảnh',
            price: 2000000,
            },
            {
            id: 'DV0016',
            name: 'Dịch vụ MC',
            price: 2000000,
            },
            ]
        },
        {
            id: 'shift',
            title: 'Danh sách ca',
            icon: 'shift.png',
            content: 'Hiển thị danh sách ca của nhà hàng cung'+
            ' cấp thông tin: tên ca, thời gian bắt đầu, ...',
            header: ['STT', 'Mã ca', 'Tên ca', 'Giờ bắt đầu', 'Giờ kết thúc'],
            data: [
                {
                    id: 'CA0001',
                    name: 'Sáng',
                    startTime: '7:00 AM',
                    endTime: '10:00 AM'
                },
                {
                    id: 'CA0002',
                    name: 'Trưa',
                    startTime: '11:00 AM',
                    endTime: '2:00 PM'
                },
                {
                    id: 'CA0003',
                    name: 'Tối',
                    startTime: '6:00 PM',
                    endTime: '9:00 PM'
                }
            ]
        },{
            id: 'job',
            title: 'Danh sách công việc',
            icon: 'job.png',
            content: 'Hiển thị danh sách công việc của nhà hàng'+
            ' cung cấp thông tin: tên công việc, tên dịch vụ',
            header: ['STT', 'Mã công việc', 'Tên công việc', 'Mã dịch vụ', 'Tên công việc'],
            data: [
                {
                    id: 'CV0001',
                    name: 'Đứng sảnh',
                    serviceId: 'DV0001',
                    serviceName: 'Đứng sảnh đón tiếp'
                },
                {
                    id: 'CV0002',
                    name: 'Phục vụ',
                    serviceId: 'DV0002',
                    serviceName: 'Đứng phục vụ bàn'
                },
                {
                    id: 'SN0003',
                    name: 'MC',
                    serviceId: 'DV0002',
                    serviceName: 'Dịch vụ MC'
                },
            ]
        }
    ]
}