// Toggle between Dine In and Take Away
document.addEventListener("DOMContentLoaded", () => {
    const dineIn = document.getElementById('dine-in');
    const takeAway = document.getElementById('take-away');
    const menu = document.getElementById("myLinks");
    const hamburger = document.querySelector(".hamburger-menu");
    
    dineIn.addEventListener('click', () => {
        dineIn.classList.add('active');
        takeAway.classList.remove('active');
    });

    takeAway.addEventListener('click', () => {
        takeAway.classList.add('active');
        dineIn.classList.remove('active');
    });
    
    // Ensure the hamburger menu does not auto-open on refresh
    menu.style.display = "none";
    hamburger.classList.remove("active");
});

function myFunction(x) {
    x.classList.toggle("change");
    let menu = document.getElementById("myLinks");
    let hamburger = document.querySelector(".hamburger-menu");
    let isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
    hamburger.classList.toggle("active", !isOpen);
}