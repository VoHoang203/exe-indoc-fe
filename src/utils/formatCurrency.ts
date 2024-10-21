export const formatCurrency = (amount: number | undefined | null): string => {
  // Kiểm tra nếu amount không tồn tại hoặc không phải là số
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0'; // Hoặc trả về một chuỗi thay thế khác
  }

  // Sử dụng phương thức toLocaleString để định dạng
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString); // Chuyển từ chuỗi ISO sang đối tượng Date

  const day: string = String(date.getUTCDate()).padStart(2, '0'); // Định dạng ngày
  const month: string = String(date.getUTCMonth() + 1).padStart(2, '0'); // Định dạng tháng
  const year: number = date.getUTCFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về chuỗi với định dạng dd/mm/yyyy
}