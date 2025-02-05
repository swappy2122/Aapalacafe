document.addEventListener('DOMContentLoaded', () => {
    const orderData = JSON.parse(localStorage.getItem('orders')) || {};
    const orderTable = document.getElementById('order-items');
    const totalBill = document.getElementById('total-bill');
    const customerNameElement = document.getElementById('customer-name');
    const tableNumberElement = document.getElementById('table-number');

    const { customerName, tableNumber, orders } = orderData;
    customerNameElement.textContent = `Name: ${customerName}`;
    tableNumberElement.textContent = `Table Number: ${tableNumber}`;
    
    let total = 0;

    orders.forEach(order => {
        const totalPrice = order.quantity * order.price;
        total += totalPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.item}</td>
            <td>${order.quantity}</td>
            <td>$${order.price.toFixed(2)}</td>
            <td>$${totalPrice.toFixed(2)}</td>
        `;
        orderTable.appendChild(row);
    });

    totalBill.textContent = `Total Bill: $${total.toFixed(2)}`;
});

function confirmOrder() {
    const orderData = JSON.parse(localStorage.getItem('orders')) || {};
    const { orders, customerName, tableNumber } = orderData;

    fetch('/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders, customerName, tableNumber }),
    })
    .then(response => response.json())
    .then(data => {
        const notification = document.getElementById('notification');
        notification.textContent = data.message;
        notification.style.display = 'block';
        localStorage.removeItem('orders');
    })
    .catch(error => {
        console.error('Error:', error);
        const notification = document.getElementById('notification');
        notification.textContent = 'Error placing order. Please try again.';
        notification.style.display = 'block';
    });
}
