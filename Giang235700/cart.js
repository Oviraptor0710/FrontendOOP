document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('.product-check');
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const increaseButtons = document.querySelectorAll('.increase-quantity');
  const decreaseButtons = document.querySelectorAll('.decrease-quantity');
  const totalPriceEl = document.getElementById('total-price');
  const selectedItemsCountEl = document.getElementById('selected-items-count');

  function formatPrice(price) {
    // Định dạng số thành dạng tiền VNĐ, ví dụ 28000000 -> "28.000.000₫"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
  }

  function updateCartSummary() {
    let total = 0;
    let selectedCount = 0;

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        selectedCount++;
        const quantity = parseInt(quantityInputs[index].value) || 0;
        const price = parseFloat(checkbox.dataset.price);
        total += quantity * price;
      }
    });

    totalPriceEl.textContent = formatPrice(total);
    selectedItemsCountEl.textContent = `(Chọn ${selectedCount} sản phẩm)`;
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateCartSummary);
  });

  quantityInputs.forEach((input, index) => {
  input.addEventListener('change', () => {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 0) {
      input.value = 0;  // cho phép 0 luôn
    }
    updateCartSummary();
  });
});

decreaseButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInputs[index].value) || 0;
    if (currentValue > 0) {
      quantityInputs[index].value = currentValue - 1;
      updateCartSummary();
    }
  });
});


  increaseButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      let currentValue = parseInt(quantityInputs[index].value) || 1;
      quantityInputs[index].value = currentValue + 1;
      updateCartSummary();
    });
  });

  

  // Xử lý xóa sản phẩm
  const removeButtons = document.querySelectorAll('.remove-product');
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productItem = btn.closest('.product-item');
      if (productItem) {
        productItem.remove();
        // Cập nhật lại các mảng phần tử (checkboxes, inputs, buttons) sau khi xóa
        // Vì DOM đã thay đổi, cần lấy lại
        // Đơn giản reload lại trang hoặc viết lại hàm cập nhật mảng.
        // Ở đây mình chọn reload lại trang cho nhanh:
        updateElementsAndSummary();
      }
    });
  });

  function updateElementsAndSummary() {
    // Cập nhật lại các biến khi DOM thay đổi (sau khi xóa sản phẩm)
    // Lấy lại các phần tử mới
    checkboxes = document.querySelectorAll('.product-check');
    quantityInputs = document.querySelectorAll('.quantity-input');
    increaseButtons = document.querySelectorAll('.increase-quantity');
    decreaseButtons = document.querySelectorAll('.decrease-quantity');
    // Gán lại các sự kiện như trên
    // Để code ngắn hơn bạn có thể reload trang hoặc tạo lại event listeners

    // Nhưng ở đây mình reload trang để cho đơn giản:
    // location.reload();

    // Hoặc bạn có thể lập trình lại nếu muốn

    updateCartSummary();
  }

  // Khởi tạo lần đầu
  updateCartSummary();
});
