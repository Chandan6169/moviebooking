const ticketImage = document.getElementById("ticket-image");
const overlay = document.getElementById("overlay");
const seatSelection = document.getElementById("seat-selection");
const bookButton = document.getElementById("book-button");
const ticketDetails = document.getElementById("ticket-details");
const quantityInput = document.getElementById("ticket-quantity");
const totalAmount = document.getElementById("total-amount");
const confirmButton = document.getElementById("confirm-button");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
let selectedSeats = [];

// Handle click on ticket image to show seat selection
ticketImage.addEventListener("click", function() {
  overlay.style.display = "block";
});

// Handle click on seat to select/deselect it
seatSelection.addEventListener("click", function(event) {
  if (event.target.classList.contains("seat")) {
    if (event.target.classList.contains("available")) {
      event.target.classList.remove("available");
      event.target.classList.add("selected");
      selectedSeats.push(event.target.id);
    } else {
      event.target.classList.remove("selected");
      event.target.classList.add("available");
      selectedSeats = selectedSeats.filter(seat => seat !== event.target.id);
    }
    updateTotalAmount();
  }
});

// Handle click on book button to show ticket details
bookButton.addEventListener("click", function() {
  if (selectedSeats.length > 0) {
    seatSelection.style.display = "none";
    ticketDetails.style.display = "block";
    updateTotalAmount();
  }
});

// Handle quantity input change to update total amount
quantityInput.addEventListener("change", function() {
  updateTotalAmount();
});

// Handle confirm button click to validate and submit booking
confirmButton.addEventListener("click", function() {
  if (nameInput.checkValidity() && emailInput.checkValidity()) {
    const name = nameInput.value;
    const email = emailInput.value;
    const quantity = parseInt(quantityInput.value);
    const amount = calculateTotalAmount(quantity);
    const seats = selectedSeats.join(", ");
    alert(`Thank you, ${name}! Your booking is confirmed.\nEmail: ${email}\nQuantity: ${quantity}\nSeats: ${seats}\nAmount: ${amount}rs`);
    location.reload();
  } else {
    alert("Please fill in all fields with valid values.");
  }
});

// Helper function to calculate the total amount based on the quantity and selected seats
function calculateTotalAmount(quantity) {
  const pricePerSeat = 150;
  return pricePerSeat * quantity * selectedSeats.length;
}

// Helper function to update the total amount in the UI
function updateTotalAmount() {
  const quantity = parseInt(quantityInput.value);
  const amount = calculateTotalAmount(quantity);
  totalAmount.textContent = `Total Amount: ${amount}rs`;
}
