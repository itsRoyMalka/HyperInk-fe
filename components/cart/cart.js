


$(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
   //cart hanlders
    $('#cart').load('components/cart/cart.html', function() {
        // Initialize an empty cart array


        // Event delegation for cart button and close button
        $(document).on('click', '.cart_icon.cart', function() {
            console.log("cart open")
            $('.bodydiv').toggleClass('active');
        });

        // Close cart on outside click
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.bodydiv').length && !$(e.target).closest('.cart_icon.cart').length) {
                $('.bodydiv').removeClass('active');
            }
        });

        // Close cart when clicking the "Close" button
        $(document).on('click', '.closeShopping', function() {
            $('.bodydiv').removeClass('active');
        });



        $('#total').on('click', function() {
            localStorage.setItem('cart', JSON.stringify(cart))

            window.location.href = 'checkout.html';
        });

    });

    $(document).on('click', '.add-to-cart-button', function() {
        const itemName = $(this).data('item-name');
        const itemPrice = $(this).data('item-price');
        const itemImage = $(this).data('item-image');
        const itemId = $(this).data('item-id');


        // Create a cart item object
        const cartItem = {
            itemId: itemId,
            name: itemName,
            price: parseFloat(itemPrice),
            image: itemImage,
            quantity: 1

        };

        cart.push(cartItem);

        updateCartDisplay(cart);
    });

    function updateCartDisplay(cartItems) {
        const listCardContainer = $('.ListCard');
        const totalContainer = $('.total');

        if (cartItems.length === 0) {
            listCardContainer.empty();
            totalContainer.text('0');
        } else {
            const cartList = $('<ul></ul>');
            let totalPrice = 0;

            // Loop through cart items and build the cart list
            cartItems.forEach(function(item) {

                const cartItemHtml = `
            <li>
              <img src="${item.image}" alt="${item.name}" class="item-image" style="max-width: 100px; max-height: 100px;">

                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-button" data-item-name="${item.name}" style="background-color: #007bff; color: #fff; padding: 5px 10px; border: none; cursor: pointer;">Remove</button>

            </li>
        `;
                cartList.append(cartItemHtml);

                // Calculate the total price
                totalPrice += item.price;
            });

            // Clear previous content and update the cart list and total price
            listCardContainer.empty().append(cartList);
            totalContainer.text(`$${totalPrice.toFixed(2)}`);
        }

        const cartIcon = $('.cart_icon.cart'); // Select the cart icon element
        const quantitySpan = cartIcon.find('.quantity'); // Select the quantity span within the cart icon

        if (cartItems.length === 0) {
            quantitySpan.text('0'); // Update the quantity to 0 when the cart is empty
        } else {
            const totalQuantity = cartItems.length; // Calculate the total quantity of items in the cart
            quantitySpan.text(totalQuantity); // Update the quantity span with the total quantity
        }
    }





    $(document).on('click', '.remove-button', function() {
        const itemNameToRemove = $(this).data('item-name'); // Get the item name to remove
        const updatedCart = cart.filter(item => item.name !== itemNameToRemove);
        cart = updatedCart;

        updateCartDisplay(cart);





    });





});

