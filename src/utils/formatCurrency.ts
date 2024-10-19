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
