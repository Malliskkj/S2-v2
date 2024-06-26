document.addEventListener('DOMContentLoaded', () => {
    const cube = document.querySelector('.cube');
    const blackOverlay = document.getElementById('blackOverlay');
    let isDragging = false;
    let previousMouseX, previousMouseY;
    let rotationX = 0, rotationY = 0;
    let cubesCreated = false; // Variável para controlar se os cubos já foram criados

    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;
            rotationX += deltaY * 0.5;
            rotationY += deltaX * 0.5;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Função para criar cubos caindo com imagens locais
    function createFallingCube(imageUrls) {
        const fallingCube = document.createElement('div');
        fallingCube.className = 'falling-cube';
        fallingCube.style.left = Math.random() * 100 + 'vw';
        fallingCube.style.top = '-100px'; // Movendo para cima da tela inicialmente
        fallingCube.style.opacity = '0'; // Definindo opacidade inicial como zero
        fallingCube.style.animationDuration = Math.random() * 50 + 5 + 's'; // Ajuste de duração de animação
        fallingCube.style.animationDelay = Math.random() * 10 + 2 + 's'; // Ajuste de atraso de animação
        fallingCube.style.animationIterationCount = 'infinite';
        
        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        faces.forEach((face, index) => {
            const faceDiv = document.createElement('div');
            faceDiv.className = `falling-cube__face falling-cube__face--${face}`;
            if (face !== 'interior-front' && face !== 'interior-back' && face !== 'interior-right'
                && face !== 'interior-left' && face !== 'interior-top' && face !== 'interior-bottom') {
                const img = document.createElement('img');
                img.src = 'img/' + imageUrls[index]; // Caminho relativo para as imagens locais
                faceDiv.appendChild(img);
            }
            fallingCube.appendChild(faceDiv);
        });

        document.body.appendChild(fallingCube);

        // Aguarda um pequeno período para aplicar a classe que torna o cubo visível
        setTimeout(() => {
            fallingCube.style.opacity = '1';
        }, 100);
    }

    // Adiciona texto "CLIQUE AQUI" no cubo principal
    const mainCube = document.getElementById('mainCube');
    const frontFace = mainCube.querySelector('.cube__face--front');
    frontFace.textContent = 'CLIQUE AQUI';
    frontFace.style.backgroundColor = '#ff'; // Branco
    frontFace.style.color = '#b10000'; // Texto vermelho
    frontFace.style.display = 'flex';
    frontFace.style.alignItems = 'center';
    frontFace.style.justifyContent = 'center';
    frontFace.style.fontSize = '12px';
    frontFace.style.textTransform = 'uppercase';
    frontFace.style.fontFamily = 'moderniz';

    // Texto das outras faces
    const backFace = mainCube.querySelector('.cube__face--back');
    const rightFace = mainCube.querySelector('.cube__face--right');
    const leftFace = mainCube.querySelector('.cube__face--left');
    const topFace = mainCube.querySelector('.cube__face--top');
    const bottomFace = mainCube.querySelector('.cube__face--bottom');

    // Evento de clique no cubo principal
    mainCube.addEventListener('click', () => {
        if (!cubesCreated) {
            cubesCreated = true;
            // URLs das imagens para os cubos caindo (imagens locais)
            const imageUrls = [
                'frente.jpeg',
                'tras.jpeg',
                'esquerda.jpeg',
                'direita.jpg',
                'esqueda.jpg',
                'cima.jpg'
            ];
            // Adiciona cubos caindo com imagens
            for (let i = 0; i < 20; i++) { // Reduzi para 20 cubos inicialmente
                createFallingCube(imageUrls);
            }

            // Inicia a reprodução da música
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.play();

            // Estiliza todas as faces do cubo principal
            [frontFace, backFace, rightFace, leftFace, topFace, bottomFace].forEach(face => {
                face.style.backgroundColor = '#fff'; // Branco
                face.style.color = '#b10000'; // Texto vermelho
                face.style.display = 'flex';
                face.style.alignItems = 'center';
                face.style.justifyContent = 'center';
                face.style.fontSize = '12px';
                face.style.textTransform = 'uppercase';
                face.style.fontFamily = 'moderniz';
            });

            // Esconde o fundo preto com transição
            blackOverlay.classList.add('hidden');

            // Altera os textos das faces do cubo principal
            frontFace.textContent = 'Teu Olhar';
            backFace.textContent = '';
            rightFace.textContent = 'Teu Jeito';
            leftFace.textContent = 'Teu sorriso';
            topFace.textContent = 'Tu es Formosa';
            bottomFace.textContent = 'Tua alma tao Linda';
        }
    });
});
