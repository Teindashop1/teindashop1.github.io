function showOrderFormModal(event, productName, productPrice, productImage) {
    event.preventDefault();
    const modal = document.getElementById('order-form-modal');
    modal.style.display = 'flex';
    const orderForm = document.getElementById('orderForm');
    orderForm.dataset.productName = productName;
    orderForm.dataset.productPrice = productPrice;
    orderForm.dataset.productImage = productImage;
}

function closeOrderFormModal(event) {
    const modal = document.getElementById('order-form-modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-form-modal');
    modal.style.display = 'none';
});

document.getElementById('orderForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const wilaya = document.getElementById('wilaya').value;
    const quantity = document.getElementById('quantity').value;

    if (phoneNumber.length < 9 || phoneNumber.length > 12) {
        alert('رقم الهاتف يجب أن يكون بين 9 و 12 رقمًا.');
        return;
    }

    const productName = this.dataset.productName;
    const productPrice = this.dataset.productPrice;
    const productImage = `${window.location.origin}/${this.dataset.productImage}`;

    const botToken = '7630332118:AAEwIdw0MM6bSOxIJ9mPoUOTl0NMt_Ww610';
    const chatId = '-1002648929489';
    const message = `
📦 *طلب جديد*:
👤 *الاسم الأول:* ${firstName}
👥 *اللقب:* ${secondName}
📞 *رقم الهاتف:* ${phoneNumber}
📍 *الولاية:* ${wilaya}
🔢 *الكمية:* ${quantity}

🛒 *تفاصيل المنتج*:
🧢 *الاسم:* ${productName}
💰 *السعر:* ${productPrice}
🖼️ *الصورة:* [عرض الصورة](${productImage})
    `;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
        });
        alert('تم إرسال الطلب بنجاح!');
        closeOrderFormModal();
    } catch (error) {
        alert('حدث خطأ أثناء إرسال الطلب.');
        console.error(error);
    }
});

function showImageFullscreenModal(event, imageSrc) {
    event.preventDefault();
    const modal = document.getElementById('image-fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeImageFullscreenModal(event) {
    const modal = document.getElementById('image-fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = "";
    modal.style.display = 'none';
}
