document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-bg');
    const prevButton = document.querySelector('.arrow.prev');
    const nextButton = document.querySelector('.arrow.next');
    const dotsContainer = document.querySelector('.dots');

    // 1. Array de Imagens do Carrossel (Substitua pelos caminhos reais das suas fotos)
    const images = [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop", // Imagem 1
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Imagem 2
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop", // Imagem 3
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2010&auto=format&fit=crop"  // Imagem 4
    ];

    let currentIndex = 0;
    let slideInterval;

    // 2. Geração dinâmica dos pontos de navegação (dots)
    dotsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetInterval();
        });
        
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // 3. Função para atualizar a imagem e o ponto ativo
    function updateCarousel() {
        // Efeito fade-out suave
        heroImage.style.opacity = 0;
        
        // Altera a imagem durante o transbordo do fade e aplica fade-in
        setTimeout(() => {
            heroImage.src = images[currentIndex];
            heroImage.style.opacity = 1;
        }, 400);

        // Atualiza a classe ativa nos pontos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // 4. Funções de controle manual (Setas)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        resetInterval();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
        resetInterval();
    }

    // 5. Reinicialização do temporizador automático do carrossel
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Passagem automática a cada 5 segundos
    }

    // Ouvintes de eventos para as setas de navegação
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Inicialização do carrossel automático
    resetInterval();
});
