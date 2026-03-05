import menuArray from "./data.js"

const orders = document.getElementById('orders')

const productList = menuArray.map(item => item.name)

document.addEventListener('click', function (e) {
    console.log(e.target.id)

    if (e.target.classList.contains('order-btn')) {
        handleOrderBtn(e.target.dataset)
        return
    }

    if (e.target.classList.contains('remove-btn')) {
        handleRemoveBtn(e.target.dataset)
        return
    }

    if (e.target.id === 'checkout-btn') {
        handleCheckoutBtn()
        return
    }

    if (e.target.id === 'pay-btn') {
        handlePayment()
        return
    }


})

render()

function render() {
    const ordersHTml = menuArray.map((item) => {
        return `
                <div class="orderItem" id=${item.id}>
                    <div class="orderImg">
                        <h1>${item.emoji}</h1>
                    </div>
                <div class="orderDetails">
                        <h2>${item.name}</h2>
                        <p>${item.ingredients.join(", ")}</p>
                        <h3>$${item.price}</h3>
                </div>
                    <button class="btn order-btn right" data-id=${item.id}>+</button>
                </div>
        `
    }).join("")

    orders.innerHTML = ordersHTml
}

function handleOrderBtn(dataset) {
    const selectedMeal = menuArray.find(item => item.id === Number(dataset.id))
    const { id, name, price } = selectedMeal
    const receiptEl = document.getElementById('receipt')

    const isProductAlredyOrdered = document.querySelectorAll(`[data-product="${name}"]`).length
    let productQuantity = 0

    if (!isProductAlredyOrdered) {
        productQuantity++

        const mealNameEl = document.createElement('h2')
        mealNameEl.textContent = name

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'remove'
        removeBtn.classList.add('btn', 'remove-btn')
        removeBtn.dataset.remove = name

        const priceEl = document.createElement('h2')
        priceEl.classList.add('right')
        priceEl.innerHTML = `<span class="quantity" id="${name}" data-product-id="${id}">${productQuantity}</span> $${price}`

        const newOrder = document.createElement('div')
        newOrder.className = 'newOrder'
        newOrder.dataset.product = name

        newOrder.append(mealNameEl)
        newOrder.append(removeBtn)
        newOrder.append(priceEl)

        receiptEl.appendChild(newOrder)
        receiptEl.classList.remove('hidden')

        renderTotalSection()
    } else {
        const quantitySpanEl = document.getElementById(name)
        productQuantity = Number(quantitySpanEl.textContent)
        productQuantity++
        quantitySpanEl.textContent = productQuantity
        renderTotalSection()
    }
}

function handleRemoveBtn(dataset) {
    const mealToRemove = dataset.remove
    const quantityEl = document.getElementById(mealToRemove)

    if (!quantityEl) return

    let quantity = Number(quantityEl.textContent)

    if (quantity > 1) {
        quantity--
        quantityEl.textContent = quantity
        renderTotalSection()
    } else if (quantity === 1) {
        const productEl = document.querySelector(`[data-product="${mealToRemove}"]`)
        if (productEl) {
            productEl.remove()
            clearProductListIfEmpty()
        }
    }
}

function clearProductListIfEmpty() {
    const newOrderElSize = document.getElementsByClassName('newOrder').length
    const totalEl = document.getElementById('total')
    const checkoutEl = document.getElementById('checkout')
    const receiptEl = document.getElementById('receipt')

    if (newOrderElSize === 0) {
        if (totalEl) totalEl.remove()
        if (checkoutEl) checkoutEl.remove()
        if (receiptEl) receiptEl.classList.add('hidden')
    }
}

function renderTotalSection() {
    let totalEl = document.getElementById('total')
    const main = document.getElementById('main')
    const quantityEl = document.getElementsByClassName('quantity')
    let sumEl = document.getElementById("sum")

    let totalSum = 0

    Array.from(quantityEl).forEach(element => {
        const product = menuArray.find(item => item.id === Number(element.dataset.productId))
        if (product) {
            const productPrice = product.price
            const productQuantity = Number(element.textContent)
            totalSum += productPrice * productQuantity
        }
    });

    if (!totalEl) {
        const totalHtml = `
        <div class="total" id="total">
            <h2>Total: <span class="right" id="sum">$${totalSum}</span></h2>    
        </div>
        <div class="checkout" id="checkout">
            <button class="btn checkout-btn" id="checkout-btn">Complete order</button>
        </div>
        `
        main.innerHTML += totalHtml
    } else if (sumEl) {
        sumEl.textContent = `$${totalSum}`
    }
}

function handleCheckoutBtn() {
    const dialog = document.getElementById('form-checkout');
    if (dialog) {
        dialog.showModal();
    }
}

function handlePayment() {
    const dialog = document.getElementById('form-checkout');
    const receipt = document.getElementById('receipt');
    const total = document.getElementById('total');
    const checkout = document.getElementById('checkout');
    const thanks = document.getElementById('thanks')
    const name = document.getElementById('name').value
    console.log(name)

    if (receipt) {
        const orderItems = receipt.querySelectorAll('.newOrder');
        orderItems.forEach(item => {
            item.remove();
        });
        receipt.classList.add('hidden');
    }

    if (total) {
        total.remove();
    }

    if (checkout) {

        checkout.remove();
    }

    if (dialog) {
        dialog.close();
    }

    thanks.textContent = `Thanks, ${name}! Your order is on it's way!`

    thanks.classList.add('show')

    setTimeout(function(){
        thanks.classList.remove('show')
    }, 3000)
}