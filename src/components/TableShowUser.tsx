import { useState } from "react";
import useUser from "../hooks/useUser";

function TableShowUser() {
  const { userAll } = useUser()!;
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(userAll.length / rowsPerPage);

  const hdlPageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = userAll.slice(startIndex, startIndex + rowsPerPage);

  const hdlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // รีเซ็ตหน้าปัจจุบันกลับไปที่หน้าแรกเมื่อเปลี่ยนจำนวนแถวต่อหน้า
  };

  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รูปภาพ</th>
            <th>คำหน้าชื่อ</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เบอร์มือถือ</th>
            <th>เลขบัตรประชาชน</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((el: any) => (
            <tr className="text-center">
              <td>{el.user_id}</td>
              <td>
                <img
                  className="max-w-[100px] rounded-md"
                  src={el.user_image}
                  alt="profile"
                />
              </td>
              <td>{el.user_nameprefix}</td>
              <td>{el.user_firstname}</td>
              <td>{el.user_lastname}</td>
              <td>{el.user_phone}</td>
              <td>{el.user_identity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2 items-center">
            <p>จำนวนที่แสดง</p>
            <select className="rounded-md border px-4 py-1" name="rowsPerPage" onChange={hdlChange}>
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value={userAll.length}>ทั้งหมด</option>
            </select>
        </div>
        <div className="flex items-center justify-end gap-5">
          <button
            className="bg-pink-600 px-4 py-1 rounded-md text-white font-bold hover:bg-pink-500 scale-100 disabled:opacity-70 disabled:hover:bg-pink-600 disabled:scale-100 active:scale-95"
            onClick={() => hdlPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <span>
            หนัาที่ {currentPage} ทั้งหมด {totalPages} หนัา
          </span>
          <button
            className="bg-pink-600 px-4 py-1 rounded-md text-white font-bold hover:bg-pink-500 scale-100 disabled:opacity-70 disabled:hover:bg-pink-600 disabled:scale-100 active:scale-95"
            onClick={() => hdlPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableShowUser;
