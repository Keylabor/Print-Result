const coffee = document.getElementById("coffee");
const priceText = document.getElementById("price");
const totalText = document.getElementById("total");
const sizes = document.querySelectorAll('input[name="size"]');
const discountInput = document.getElementById("discount");
const quantityInput = document.getElementById("quantity");
const orderBtn = document.getElementById("order-btn");

let prices = {};

function updatePrice() {

    const selectedCoffee = coffee.value;
    const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
    const discountRate = parseFloat(discountInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;

    if (selectedSize === "small") {
        prices = {
            latte: 1.25, americano: 1.00, cappuccino: 1.50,
            matcha: 1.50, espresso: 1.75, chocolate: 2.00
        };
    }

    else if (selectedSize === "medium") {
        prices = {
            latte: 1.50, americano: 1.25, cappuccino: 1.75,
            matcha: 1.75, espresso: 2.00, chocolate: 2.25
        };
    }

    else if (selectedSize === "large") {
        prices = {
            latte: 1.75, americano: 1.50, cappuccino: 2.00,
            matcha: 2.00, espresso: 2.25, chocolate: 2.50
        };
    }

    else {
        prices = {};
    }

    if (selectedCoffee !== "none" && prices[selectedCoffee]) {
        priceText.textContent = "Base Price: $" + prices[selectedCoffee].toFixed(2);
    }

    else {
        priceText.textContent = "";
    }

    if (selectedCoffee !== "none" && selectedSize && prices[selectedCoffee] && quantity > 0) {

        let basePrice = prices[selectedCoffee];
        let total = basePrice * quantity;

        if (discountRate > 0) {
            total -= total * (discountRate / 100);
        }

        totalText.textContent = "Total Cost: $" + total.toFixed(2);
    }

    else {
        totalText.textContent = "";
    }
}

coffee.addEventListener("change", updatePrice);
sizes.forEach(radio => radio.addEventListener("change", updatePrice));
discountInput.addEventListener("input", updatePrice);
quantityInput.addEventListener("input", updatePrice);

orderBtn.addEventListener("click", function () {

    const selectedCoffee = coffee.value;
    const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
    const discountRate = parseFloat(discountInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    const refNo = document.getElementById("ref").value.trim();

    if (selectedCoffee !== "none" && selectedSize && prices[selectedCoffee] && quantity > 0 && refNo) {

        let basePrice = prices[selectedCoffee];
        let total = basePrice * quantity;

        if (discountRate > 0) {
            total -= total * (discountRate / 100);
        }

        const coffeeName =
            selectedCoffee.charAt(0).toUpperCase() + selectedCoffee.slice(1);

        const now = new Date();
        const dateTime = now.toLocaleString();

        document.getElementById("receipt-ref").textContent = "Reference # " + refNo;
        document.getElementById("receipt-coffee").textContent = "Coffee: " + coffeeName;
        document.getElementById("receipt-size").textContent = "Size: " + selectedSize;
        document.getElementById("receipt-quantity").textContent = "Quantity: " + quantity;
        document.getElementById("receipt-discount").textContent = "Discount: " + discountRate + "%";
        document.getElementById("receipt-total").textContent = "Total Cost: $" + total.toFixed(2);

        const receiptDate = document.getElementById("receipt-date");
        if (receiptDate) {
            receiptDate.textContent = "Date: " + dateTime;
        }

        document.getElementById("receipt").style.display = "block";

        resetForm();
    }

    else {
        alert("Please fill in Ref #, coffee, size, and quantity.");
    }
});

function resetForm() {

    coffee.value = "none";
    sizes.forEach(radio => radio.checked = false);
    discountInput.value = "";
    quantityInput.value = "";

    priceText.textContent = "";
    totalText.textContent = "";

    const refInput = document.getElementById("ref");
    if (refInput) refInput.value = "";
}

const printBtn = document.getElementById("print-btn");

if (printBtn) {
    printBtn.addEventListener("click", function () {
        window.print();
    });
}