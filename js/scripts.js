let currentPage = ""; // Variable global para rastrear la página actual

function handleClick(page, link) {
  if (currentPage === page) {
    return; // No recargar si la página ya está activa
  }

  cargarContenido(page);
  currentPage = page; // Actualizar la página actual
  
  // Cerrar sidebar en móviles después de seleccionar una página
  if (window.innerWidth < 992) {
    toggleMobileSidebar();
  }
}

function toggleSubmenu(link, page) {
  const parentItem = link.parentElement;
  const submenu = parentItem.querySelector(".nav-main-submenu");

  if (submenu) {
    parentItem.classList.toggle("open"); // Desplegar/contraer menú
  }

  if (currentPage !== page) {
    cargarContenido(page); // Cargar contenido dinámico si no está ya activo
    currentPage = page; // Actualizar página actual
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const pageContainer = document.getElementById('page-container');
  
  sidebar.classList.toggle('sidebar-visible');
  pageContainer.classList.toggle('sidebar-o-xs');
}

// Listener para cerrar el sidebar al hacer clic fuera
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const pageContainer = document.getElementById('page-container');
  const sidebarToggleBtn = document.querySelector('.mobile-menu-toggle');
  
  if (window.innerWidth < 992 && 
      sidebar.classList.contains('sidebar-visible') && 
      !sidebar.contains(event.target) && 
      !sidebarToggleBtn.contains(event.target)) {
    sidebar.classList.remove('sidebar-visible');
    pageContainer.classList.remove('sidebar-o-xs');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  cargarContenido("index.html"); // Página inicial
  currentPage = "index.html"; // Marcarla como activa
});

function cargarContenido(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("contenido-dinamico").innerHTML = html;
    })
    .catch((error) =>
      console.error("Error al cargar el contenido:", error)
    );
}
