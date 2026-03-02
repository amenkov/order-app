import menuArray from "./data.js"

const orders = document.getElementById('orders')

document.addEventListener('click', function(e){
    
    if(e.target.classList.contains('order-btn')) {
        handleOrderBtn(e.target.dataset)
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

    const {name, price} = selectedMeal

    const mealNameEl = document.createElement('h2')
    mealNameEl.textContent = name

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'remove'
    removeBtn.classList.add('remove')

    const priceEl = document.createElement('h2')
    priceEl.textContent = `$${price}`
    priceEl.classList.add('right')

    const receiptEl = document.getElementById('receipt')
    const newOrder = document.createElement('div')
    newOrder.className = 'newOrder'

    newOrder.append(mealNameEl)
    newOrder.append(removeBtn)
    newOrder.append(priceEl)

    receiptEl.appendChild(newOrder)

    receiptEl.classList.remove('hidden')
}
