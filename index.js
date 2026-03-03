import menuArray from "./data.js"

const orders = document.getElementById('orders')

const productList = menuArray.map(item => item.name)

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('order-btn')) {
        handleOrderBtn(e.target.dataset)
        return
    } 

    if(e.target.classList.contains('remove-btn')) {
        handleRemoveBtn(e.target.dataset)
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
                    <button class="order-btn right" data-id=${item.id}>+</button>
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
        removeBtn.classList.add('remove-btn')
        removeBtn.dataset.remove = name

        const priceEl = document.createElement('h2')
        priceEl.classList.add('right')
        priceEl.innerHTML = `<span class="quantity" id=${name}>${productQuantity}</span> $${price}`

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
    }
}

function handleRemoveBtn(dataset) {
    const mealToRemove = dataset.remove
    const quantityEl = document.getElementById(mealToRemove)
    let quantity = Number(quantityEl.textContent)

    console.log("Quantity: ", quantity)

    if (quantity > 1) {
        quantity--
        quantityEl.textContent = quantity
    } else if (quantity == 1) {
        const productEl = document.querySelectorAll(`[data-product=${mealToRemove}]`)[0]
        productEl.remove()
        clearProductListIfEmpty()
    }

    function clearProductListIfEmpty() {
        const newOrderElSize = document.getElementsByClassName('newOrder').length
        const totalEl = document.getElementById('total')

        if (newOrderElSize === 0) {
            totalEl.remove()
            document.getElementById('receipt').classList.add('hidden')
        }
    }

}

function renderTotalSection() {
    const totalEl = document.getElementById('total')
    const main = document.getElementById('main')

    if (!totalEl) {
        const totalHtml = `
        <div class="total" id="total">
            <h2>Total: <span class="right">$12</span></h2>
        </div>
        `

        main.innerHTML += totalHtml
    }
}
