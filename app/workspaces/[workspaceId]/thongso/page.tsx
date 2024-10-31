import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const dataTable = {
  "Thông số hồ chứa": [
    { id: 1, parameter: "Diện tích lưu vực", unit: "Km²", value: 13 },
    { id: 2, parameter: "MNLKT", unit: "m", value: 27.29 },
    { id: 3, parameter: "MNLTK", unit: "m", value: 27.21 },
    { id: 4, parameter: "MNDBT", unit: "m", value: 24.2 },
    { id: 5, parameter: "MNC", unit: "m", value: 20.2 },
    { id: 6, parameter: "Dung tích toàn bộ ứng với mực nước lũ thiết kế W", unit: "10^6m³", value: 2.24 },
    { id: 7, parameter: "Dung tích toàn bộ ứng với mực nước dâng bình thường Wbt", unit: "10^6m³", value: 1.15 },
    { id: 8, parameter: "Dung tích phòng lũ ứng với nước lũ thiết kế", unit: "10^6m³", value: 1.09 },
    { id: 9, parameter: "Dung tích hữu ích Whi", unit: "10^6m³", value: 0.91 },
    { id: 10, parameter: "Dung tích chết WC", unit: "10^6m³", value: 0.24 }
  ],
  "Đập đất": [
    { id: 1, parameter: "Cao trình đỉnh đập", unit: "m", value: 27.7 },
    { id: 2, parameter: "Chiều rộng đỉnh đập", unit: "m", value: 5 },
    { id: 3, parameter: "Chiều cao đập lớn nhất", unit: "m", value: 14.4 },
    { id: 4, parameter: "Chiều dài đỉnh đập", unit: "m", value: 381 },
    { id: 5, parameter: "Hệ số mái hạ lưu", unit: "", value: "2,75 + 3,00" },
    { id: 6, parameter: "Hệ số mái thượng lưu", unit: "", value: "3,00 + 3,25" }
  ],
  "Tràn xả lũ": [
    { id: 1, parameter: "Hình thức tràn", unit: "", value: "Tràn dọc, cửa van cung" },
    { id: 2, parameter: "Số khoang tràn", unit: "Khoang", value: 2 },
    { id: 3, parameter: "Chiều rộng mỗi khoang tràn", unit: "m", value: 5 },
    { id: 4, parameter: "Cao trình ngưỡng", unit: "m", value: 20.2 },
    { id: 5, parameter: "Mực nước gia cường thiết kế", unit: "m", value: 27.21 },
    { id: 6, parameter: "Cột nước tràn thiết kế P=1%", unit: "m", value: 7 },
    { id: 7, parameter: "Lưu lượng xả lũ thiết kế P=1%", unit: "m³/s", value: 117 },
    { id: 8, parameter: "Mực nước gia cường kiểm tra", unit: "m", value: 27.29 },
    { id: 9, parameter: "Cột nước tràn kiểm tra P=0.2%", unit: "m", value: 7.09 },
    { id: 10, parameter: "Lưu lượng xả lũ kiểm tra P=0.2%", unit: "m³/s", value: 175 },
    { id: 11, parameter: "Tiêu năng hạ lưu", unit: "", value: "Tiêu năng đáy" }
  ],
  "Cống lấy nước thủy lợi": [
    { id: 1, parameter: "Hình thức", unit: "", value: "Ống thép tròn bọc BTCT" },
    { id: 2, parameter: "Cao trình ngưỡng cống", unit: "m", value: 18.7 },
    { id: 3, parameter: "Lưu lượng thiết kế vận hành/dẫn dòng", unit: "m³/s", value: "0,25/3,00" },
    { id: 4, parameter: "Khẩu diện thân cống nx(bxh)", unit: "mm", value: 800 },
    { id: 5, parameter: "Chiều dài thân cống", unit: "m", value: 122 }
  ],
  "Hệ thống kênh": [
    { id: 1, parameter: "Chiều dài kênh chính Tây", unit: "m", value: 1205.37 },
    { id: 2, parameter: "Kết cấu", unit: "", value: "Kênh bê tông hình chữ nhật" },
    { id: 3, parameter: "Kích thước kênh đoạn từ K0 đến K0+500,62", unit: "m", value: "BxH=0,5x0,55" },
    { id: 4, parameter: "Kích thước kênh đoạn từ K0+500,62 đến K1+205,37", unit: "m", value: "BxH=0,3x0,35" },
    { id: 5, parameter: "Chiều dài kênh chính Đông", unit: "m", value: 825.07 },
    { id: 6, parameter: "Kích thước kênh chính Đông", unit: "m", value: "BxH=0,3x0,35" },
    { id: 7, parameter: "Chiều dài kênh NT1", unit: "m", value: 663.23 },
    { id: 8, parameter: "Kích thước kênh NT1", unit: "m", value: "BxH=0,5x0,55" },
    { id: 9, parameter: "Diện tích tưới hệ thống kênh Tây", unit: "Ha", value: 5.5 },
    { id: 10, parameter: "Diện tích tưới hệ thống kênh Đông", unit: "Ha", value: 14.5 },
    { id: 11, parameter: "Chiều dài tuyến kênh tiêu chỉnh trị", unit: "M", value: 1471.83 },
    { id: 12, parameter: "Bề rộng đáy kênh tiêu", unit: "m", value: "8÷10" },
    { id: 13, parameter: "Kết cấu kênh tiêu", unit: "", value: "Đất + đá lát" }
  ],
  "Đường tránh ngập lòng hồ": [
    { id: 1, parameter: "Chiều dài đường tránh ngập bên phải", unit: "m", value: 1095 },
    { id: 2, parameter: "Chiều dài đường tránh ngập bên trái", unit: "m", value: 660 },
    { id: 3, parameter: "Bề rộng mặt đường", unit: "m", value: 4 },
    { id: 4, parameter: "Kết cấu đường", unit: "", value: "Đất tự nhiên" },
    { id: 5, parameter: "Cống tiêu trên đường tránh ngập bên phải", unit: "Cái", value: 3 },
    { id: 6, parameter: "Cống tiêu trên đường tránh ngập bên trái", unit: "Cái", value: 3 }
  ],
  "Nhà quản lý": [
    { id: 1, parameter: "Kích thước", unit: "m", value: "12x15,9" },
    { id: 2, parameter: "Diện tích", unit: "m²", value: 190.8 },
    { id: 3, parameter: "Loại nhà", unit: "", value: "Cấp 4" }
  ],
  "Hệ thống điện": [
    { id: 1, parameter: "Trạm biến áp", unit: "", value: "22/0,23KV" },
    { id: 2, parameter: "Công suất trạm biến áp", unit: "kVA", value: 777 },
    { id: 3, parameter: "Đường dây điện 22KV", unit: "m", value: 1700 }
  ]
};


export default function ThongSo() {
  return (
    <Card>
      <CardHeader className="uppercase text-center">
        <CardTitle>Tổng hợp thông số chủ yếu</CardTitle>
        <CardDescription>Công trình hồ đắc lộc- tỉnh khánh hòa</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ScrollArea className="w-[1550px] h-[650px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">TT</TableHead>
                <TableHead>THÔNG SỐ</TableHead>
                <TableHead>ĐƠN VỊ</TableHead>
                <TableHead className="text-center">TRỊ SỐ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">I</TableCell>
                <TableCell className="font-medium">Thông số hồ chứa</TableCell>
              </TableRow>
              {dataTable["Thông số hồ chứa"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">II</TableCell>
                <TableCell className="font-medium">Đập đất</TableCell>
              </TableRow>
              {dataTable["Đập đất"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">III</TableCell>
                <TableCell className="font-medium">Tràn xả lũ</TableCell>
              </TableRow>
              {dataTable["Tràn xả lũ"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">IV</TableCell>
                <TableCell className="font-medium">Cống lấy nước thủy lợi</TableCell>
              </TableRow>
              {dataTable["Cống lấy nước thủy lợi"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">V</TableCell>
                <TableCell className="font-medium">Hệ thống kênh</TableCell>
              </TableRow>
              {dataTable["Hệ thống kênh"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">VI</TableCell>
                <TableCell className="font-medium">Đường tránh ngập lòng hồ</TableCell>
              </TableRow>
              {dataTable["Đường tránh ngập lòng hồ"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">VII</TableCell>
                <TableCell className="font-medium">Nhà quản lý</TableCell>
              </TableRow>
              {dataTable["Nhà quản lý"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">VIII</TableCell>
                <TableCell className="font-medium">Hệ thống điện</TableCell>
              </TableRow>
              {dataTable["Hệ thống điện"].map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.parameter}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell className="text-center">{data.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card >
  )
}
