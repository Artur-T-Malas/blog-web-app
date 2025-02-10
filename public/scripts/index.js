const header = document.getElementsByTagName("nav")[0];
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
    sidebar.classList.toggle("show");
    let headerHeight = getComputedStyle(header).height;
    sidebar.style.top = headerHeight;
}
