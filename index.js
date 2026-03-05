import menuArray from "./data.js"

const orders = document.getElementById('orders')

const productList = menuArray.map(item => item.name)

document.addEventListener('click', function (e) {

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

    const isProductAlredyOrdered = document.querySelectorAll(`[data-product=${name}]`).length
    let productQuantity = 0

    if (!isProductAlredyOrdered) {
        productQuantity++

        const mealNameEl = document.createElement('h2')
        mealNameEl.textContent = name

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'remove'
        removeBtn.classList.add('btn','remove-btn')
        removeBtn.dataset.remove = name

        const priceEl = document.createElement('h2')
        priceEl.classList.add('right')
        priceEl.innerHTML = `<span class="quantity" id=${name} data-product-id=${id}>${productQuantity}</span> $${price}`

        const newOrder = document.createElement('div')
        newOrder.className = 'newOrder'
        newOrder.id = 'newOrder'
        newOrder.dataset.product = name

        newOrder.append(mealNameEl)
        newOrder.append(removeBtn)

        newOrder.append(priceEl)

        receiptEl.appendChild(newOrder)

        receiptEl.classList.remove('hidden')

        renderTotalSection()

    } else {
        const quantitySpanEl = document.getElementById(`${name}`)
        productQuantity = Number(quantitySpanEl.textContent)
        productQuantity++

        quantitySpanEl.textContent = productQuantity
        renderTotalSection()
    }
}

function handleRemoveBtn(dataset) {
    const mealToRemove = dataset.remove
    const quantityEl = document.getElementById(mealToRemove)

    let quantity = Number(quantityEl.textContent)

    if (quantity > 1) {
        quantity--
        quantityEl.textContent = quantity
        renderTotalSection()
    } else if (quantity == 1) {
        const productEl = document.querySelectorAll(`[data-product=${mealToRemove}]`)[0]
        productEl.remove()
        clearProductListIfEmpty()
    }

}

function clearProductListIfEmpty() {
    const newOrderElSize = document.getElementsByClassName('newOrder').length
    const totalEl = document.getElementById('total')
    const checkoutEl = document.getElementById('checkout')

    if (newOrderElSize === 0) {
        totalEl.remove()
        checkoutEl.remove()
        document.getElementById('receipt').classList.add('hidden')
    }
}

function renderTotalSection() {
    const totalEl = document.getElementById('total')
    const main = document.getElementById('main')
    const quantityEl = document.getElementsByClassName('quantity')
    const sumEl = document.getElementById("sum")

    let totalSum = 0

    Array.from(quantityEl).forEach(element => {
        const productPrice = menuArray.find(item => item.id === Number(element.dataset.productId)).price
        const productQuantity = Number(element.textContent)

        totalSum += productPrice * productQuantity
    });

    if (!totalEl) {
        const totalHtml = `
        <div class="total" id="total">
            <h2>Total: <span class="right" id="sum">$${totalSum}</span></h2>    
        </div>
        <div class="checkout" id="checkout">
        <button class="btn checkout-btn" id="checkout-btn">Complete order</btn>
        </div>
        `

        main.innerHTML += totalHtml
    } else {
        sumEl.textContent = `$${totalSum}`
    }
}

function handleCheckoutBtn() {
    const formEl = document.getElementById('form-checkout')
    formEl.classList.remove('hidden')
}
