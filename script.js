    let lastScrollTop = 0;
const header = document.querySelector('header');
let isScrollingDown = false;
let hideTimeout;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Detecta a direção do scroll
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Rolando para baixo
        isScrollingDown = true;
        
        // Calcula a opacidade baseada na posição do scroll
        const scrollDistance = currentScroll - 50;
        const maxScrollForFade = 200; // Distância máxima para fade completo
        const opacity = Math.max(0, 1 - (scrollDistance / maxScrollForFade));
        
        header.style.opacity = opacity;
        
        // Se a opacidade chegar a 0, esconde completamente o header
        if (opacity <= 0) {
            header.style.transform = 'translateY(-100%)';
        }
        
    } else if (currentScroll < lastScrollTop || currentScroll <= 100) {
        // Rolando para cima ou no topo da página
        isScrollingDown = false;
        
        // Mostra o header novamente
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll;
});

// Efeito suave de transição
header.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// Carrossel de Projetos
let currentProjectIndex = 0;
const projectSlides = document.querySelectorAll('.project-slide');
const totalProjects = projectSlides.length;

function showProject(index) {
    // Remove classe active de todos os slides
    projectSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Adiciona classe active ao slide atual
    projectSlides[index].classList.add('active');
}

function changeProject(direction) {
    currentProjectIndex += direction;
    
    // Loop infinito
    if (currentProjectIndex >= totalProjects) {
        currentProjectIndex = 0;
    } else if (currentProjectIndex < 0) {
        currentProjectIndex = totalProjects - 1;
    }
    
    showProject(currentProjectIndex);
}

// Navegação suave para seções
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links que começam com #
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calcula a posição considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - -50; // 50px de margem extra

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o dropdown se estiver aberto (para melhor UX)
                const dropdown = document.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.blur();
                }
            }
        });
    });
    
    // Adiciona funcionalidade para fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.blur();
        }
    });
});


