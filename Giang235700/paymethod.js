document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("transferModal");

    // Get the button that opens the modal
    var btn = document.getElementById("transfer-btn");

    // Get the <span> element that closes the modal
    var span = modal.querySelector(".close-btn"); // More specific selector

    // When the user clicks the button, open the modal 
    if (btn) {
        btn.onclick = function() {
            modal.style.display = "flex"; // Use flex to keep centering from CSS
        }
    }

    // When the user clicks on <span> (x), close the modal
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modal content, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
});