// Particle Achtergrond
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Klokfunctionaliteit
setInterval(() => {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const ampm = document.getElementById('ampm');
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    const dotH = document.querySelector('.h_dot');
    const dotM = document.querySelector('.m_dot');
    const dotS = document.querySelector('.s_dot');

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ap = h >= 12 ? 'NM' : 'VM';

    if (h > 12) h = h - 12;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    hours.innerHTML = h + '<span>Uren</span>';
    minutes.innerHTML = m + '<span>Minuten</span>';
    seconds.innerHTML = s + '<span>Seconden</span>';
    ampm.innerHTML = ap;

    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    dotH.style.transform = `rotate(${h * 30}deg)`;
    dotM.style.transform = `rotate(${m * 6}deg)`;
    dotS.style.transform = `rotate(${s * 6}deg)`;

    // Micro-interactie bij secondewissel
    if (s === 0) {
        document.querySelectorAll('.circle').forEach(circle => {
            circle.style.transform = 'scale(1.03)';
            setTimeout(() => circle.style.transform = 'scale(1)', 300);
        });
    }
}, 1000);

// Klikfeedback
document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', () => {
        circle.style.transform = 'scale(0.95)';
        setTimeout(() => circle.style.transform = 'scale(1)', 200);
    });
});  