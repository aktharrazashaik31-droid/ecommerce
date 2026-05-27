const productsContainer =
document.getElementById(
'products-container'
);

const featuredContainer =
document.getElementById(
'featured-products'
);

const cartContainer =
document.getElementById(
'cart-container'
);

const totalPrice =
document.getElementById(
'total-price'
);

const searchInput =
document.getElementById(
'search-input'
);


let cart = JSON.parse(
localStorage.getItem('cart')
) || [];


// SAVE CART

function saveCart(){

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
}


// DISPLAY PRODUCTS

function displayProducts(data, container){

    if(!container) return;

    container.innerHTML = '';

    data.forEach(product => {

        const card =
        document.createElement('div');

        card.className =
        'product-card';

        card.innerHTML = `

            <img src="${product.image}">

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button
                onclick="addToCart(${product.id})"
                >
                    Add To Cart
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// ADD TO CART

function addToCart(id){

    const product =
    products.find(p => p.id === id);

    cart.push(product);

    saveCart();

    alert('Product Added To Cart');
}


// DISPLAY CART

function displayCart(){

    if(!cartContainer) return;

    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item,index) => {

        total += item.price;

        const div =
        document.createElement('div');

        div.className =
        'cart-item';

        div.innerHTML = `

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

            </div>

            <button
            onclick="removeCart(${index})"
            >
                Remove
            </button>

        `;

        cartContainer.appendChild(div);

    });

    totalPrice.innerText =
    `Total: ₹${total}`;
}


// REMOVE CART ITEM

function removeCart(index){

    cart.splice(index,1);

    saveCart();

    displayCart();
}


// SEARCH PRODUCTS

if(searchInput){

    searchInput.addEventListener(
    'input',
    (e) => {

        const value =
        e.target.value.toLowerCase();

        const filtered =
        products.filter(product =>

        product.name
        .toLowerCase()
        .includes(value)

        );

        displayProducts(
            filtered,
            productsContainer
        );

    });

}


// INITIAL LOAD

displayProducts(
products,
productsContainer
);

displayProducts(
products.slice(0,2),
featuredContainer
);

displayCart();