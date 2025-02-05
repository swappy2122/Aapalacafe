function placeOrder() {
    const menuItems = document.querySelectorAll('.menu-item');
    const orders = [];
    let total = 0;

    menuItems.forEach(item => {
        const quantityInput = item.querySelector('.quantity');
        const quantity = parseInt(quantityInput.value);
        const itemName = quantityInput.dataset.name;
        const itemPrice = parseFloat(quantityInput.dataset.price);

        if (quantity > 0) {
            const itemTotal = quantity * itemPrice;
            total += itemTotal;
            orders.push({ item: itemName, quantity, price: itemPrice, total: itemTotal });
        }
    });

    const customerName = document.getElementById('customer-name').value;
    const tableNumber = document.getElementById('table-number').value;

    if (orders.length > 0 && customerName && tableNumber) {
        const orderDetails = { orders, total, customerName, tableNumber };
        localStorage.setItem('orders', JSON.stringify(orderDetails));
        window.location.href = 'summary.html';
    } else {
        alert('Please fill out your name, table number, and select at least one item.');
    }
}
