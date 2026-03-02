import menuArray from "./data"

const orders = document.getElementById('orders')

console.log("!!!!!!!!!!!!!!!!!!!!")

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
                    <button class="order-btn">+</button>
                </div>
        `
    }).join("")
    
    orders.innerHTML = ordersHTml

}
