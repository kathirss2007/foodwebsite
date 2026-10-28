
/* ================================================= */
/* LOGIN */
/* ================================================= */

function login(){

    let username =
        document.getElementById(
            "username"
        ).value;

    let password =
        document.getElementById(
            "password"
        ).value;


    if(username === "" || password === ""){

        document.getElementById(
            "loginMessage"
        ).innerText =
        "Please enter username and password.";

        return;
    }


    /*
       Demo login:
       Any username and password will work.
    */

    document.getElementById(
        "loginPage"
    ).style.display = "none";


    document.getElementById(
        "mainPage"
    ).style.display = "block";

}



/* LOGOUT */

function logout(){

    document.getElementById(
        "mainPage"
    ).style.display = "none";


    document.getElementById(
        "loginPage"
    ).style.display = "flex";


    document.getElementById(
        "username"
    ).value = "bite";

    document.getElementById(
        "password"
    ).value = "1234";

}



/* ================================================= */
/* FOOD DATA */
/* ================================================= */

const foods = [

    {
        id:1,
        name:"Chicken Biryani",
        price:180,
        icon:"🍗",
        available:true
    },

    {
        id:2,
        name:"Cheese Pizza",
        price:220,
        icon:"🍕",
        available:true
    },

    {
        id:3,
        name:"Veg Burger",
        price:120,
        icon:"🍔",
        available:true
    },

    {
        id:4,
        name:"Masala Dosa",
        price:80,
        icon:"🥞",
        available:true
    },

    {
        id:5,
        name:"Veg Fried Rice",
        price:140,
        icon:"🍚",
        available:false
    },

    {
        id:6,
        name:"French Fries",
        price:90,
        icon:"🍟",
        available:true
    },

    {
        id:7,
        name:"Fresh Juice",
        price:70,
        icon:"🥤",
        available:true
    },

    {
        id:8,
        name:"Ice Cream",
        price:100,
        icon:"🍨",
        available:false
    }

];


let cart = [];



/* DISPLAY FOOD */

function displayFood(list){

    let foodList =
        document.getElementById(
            "foodList"
        );

    foodList.innerHTML = "";


    list.forEach(food => {

        foodList.innerHTML += `

        <div class="food-card">

            <div class="food-image">

                ${food.icon}

            </div>


            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>


                <div class="price">
                    ₹${food.price}
                </div>


                <div class="${
                    food.available
                    ? "available"
                    : "unavailable"
                }">

                    ${
                        food.available
                        ? "● Available"
                        : "● Not Available"
                    }

                </div>


                <button
                    class="add-btn"

                    ${
                        food.available
                        ? ""
                        : "disabled"
                    }

                    onclick="
                        addToCart(${food.id})
                    ">

                    ${
                        food.available
                        ? "Add to Cart"
                        : "Not Available"
                    }

                </button>

            </div>

        </div>

        `;

    });

}



/* SEARCH */

function searchFood(){

    let search =
        document.getElementById(
            "searchBox"
        ).value.toLowerCase();


    let result =
        foods.filter(food =>
            food.name
            .toLowerCase()
            .includes(search)
        );


    displayFood(result);

}



/* ADD TO CART */

function addToCart(id){

    let food =
        foods.find(
            item => item.id === id
        );


    let existing =
        cart.find(
            item => item.id === id
        );


    if(existing){

        existing.qty++;

    }

    else{

        cart.push({

            ...food,

            qty:1

        });

    }


    updateCart();

}



/* UPDATE CART */

function updateCart(){

    let cartItems =
        document.getElementById(
            "cartItems"
        );


    let count = 0;

    let total = 0;


    cartItems.innerHTML = "";


    cart.forEach(item => {

        count += item.qty;

        total +=
            item.price * item.qty;


        cartItems.innerHTML += `

        <div class="cart-item">

            <span>

                ${item.icon}
                ${item.name}

                <br>

                ₹${item.price}

            </span>


            <span class="qty">

                <button
                    onclick="
                    changeQty(
                        ${item.id},
                        -1
                    )">

                    −

                </button>


                ${item.qty}


                <button
                    onclick="
                    changeQty(
                        ${item.id},
                        1
                    )">

                    +

                </button>

            </span>


            <strong>

                ₹${item.price * item.qty}

            </strong>

        </div>

        `;

    });


    document.getElementById(
        "cartCount"
    ).innerText = count;


    document.getElementById(
        "totalPrice"
    ).innerText = total;

}



/* QUANTITY */

function changeQty(id,value){

    let item =
        cart.find(
            item => item.id === id
        );


    if(!item) return;


    item.qty += value;


    if(item.qty <= 0){

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    updateCart();

}



/* SHOW CART */

function showCart(){

    let cartBox =
        document.getElementById(
            "cartBox"
        );


    cartBox.style.display = "block";


    updateCart();


    cartBox.scrollIntoView({
        behavior:"smooth"
    });

}



/* PLACE ORDER */

function placeOrder(){

    if(cart.length === 0){

        document.getElementById(
            "message"
        ).innerText =
        "❌ Your cart is empty.";

        return;

    }


    let payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if(!payment){

        document.getElementById(
            "message"
        ).innerText =
        "❌ Please select a payment method.";

        return;

    }


    document.getElementById(
        "message"
    ).innerText =
    "✅ Order placed successfully using "
    + payment.value
    + "!";


    cart = [];

    updateCart();

}



/* START */

displayFood(foods);

updateCart();
