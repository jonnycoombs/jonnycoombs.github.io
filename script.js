function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById('container').addEventListener('click', function(event) {
    const flower = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    flower.classList.add('flower');
    flower.setAttribute('viewBox', '0 0 100 100');
    flower.setAttribute('width', '150');
    flower.setAttribute('height', '150');

    const petalColor = getRandomColor();
    const centerColor = getRandomColor();

    flower.innerHTML = `
        <circle cx="50" cy="50" r="10" fill="${centerColor}" />
        <path d="M50 10 L40 30 L60 30 Z" fill="${petalColor}" />
        <path d="M50 90 L40 70 L60 70 Z" fill="${petalColor}" />
        <path d="M10 50 L30 40 L30 60 Z" fill="${petalColor}" />
        <path d="M90 50 L70 40 L70 60 Z" fill="${petalColor}" />
    `;
    flower.style.left = `${event.clientX - 50}px`;
    flower.style.top = `${event.clientY - 50}px`;
    document.getElementById('container').appendChild(flower);
});