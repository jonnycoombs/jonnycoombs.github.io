document.getElementById('container').addEventListener('click', function(event) {
    const flower = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    flower.classList.add('flower');
    flower.setAttribute('viewBox', '0 0 100 100');
    flower.setAttribute('width', '50');
    flower.setAttribute('height', '50');
    flower.innerHTML = `
        <circle cx="50" cy="50" r="10" fill="yellow" />
        <path d="M50 10 L40 30 L60 30 Z" fill="pink" />
        <path d="M50 90 L40 70 L60 70 Z" fill="pink" />
        <path d="M10 50 L30 40 L30 60 Z" fill="pink" />
        <path d="M90 50 L70 40 L70 60 Z" fill="pink" />
    `;
    flower.style.left = `${event.clientX - 25}px`;
    flower.style.top = `${event.clientY - 25}px`;
    document.getElementById('container').appendChild(flower);

    // Remove the flower after the animation is done
    setTimeout(() => {
        flower.remove();
    }, 2000);
});