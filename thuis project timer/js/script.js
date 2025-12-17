// Deeltjesachtergrond
const canvas = document.getElementById('deeltjes');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const deeltjes = [];
for (let i = 0; i < 80; i++) {
    deeltjes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        grootte: Math.random() * 3 + 1,
        snelheidX: Math.random() * 0.5 - 0.25,
        snelheidY: Math.random() * 0.5 - 0.25,
        kleur: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
    });
}

function animeerDeeltjes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deeltjes.forEach(p => {
        p.x += p.snelheidX;
        p.y += p.snelheidY;
        if (p.x < 0 || p.x > canvas.width) p.snelheidX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.snelheidY *= -1;
        
        ctx.fillStyle = p.kleur;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.grootte, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animeerDeeltjes);
}
animeerDeeltjes();

// Timerfunctionaliteit
setInterval(() => {
    const urenEl = document.getElementById('uren');
    const minutenEl = document.getElementById('minuten');
    const secondenEl = document.getElementById('seconden');
    const aanduidingEl = document.getElementById('aanduiding');
    const uuCirkel = document.getElementById('uu_cirkel');
    const mmCirkel = document.getElementById('mm_cirkel');
    const ssCirkel = document.getElementById('ss_cirkel');
    const puntUur = document.querySelector('.punt_uur');
    const puntMinuut = document.querySelector('.punt_minuut');
    const puntSeconde = document.querySelector('.punt_seconde');

    const now = new Date();
    const uurGetal = now.getHours();
    const minuutGetal = now.getMinutes();
    const secondeGetal = now.getSeconds();
    const periode = uurGetal >= 12 ? 'NM' : 'VM';

    let uurWeergave = uurGetal;
    if (uurWeergave > 12) uurWeergave = uurWeergave - 12;
    const uurStr = uurWeergave < 10 ? '0' + uurWeergave : '' + uurWeergave;
    const minuutStr = minuutGetal < 10 ? '0' + minuutGetal : '' + minuutGetal;
    const secondeStr = secondeGetal < 10 ? '0' + secondeGetal : '' + secondeGetal;

    urenEl.innerHTML = uurStr + '<span>Uren</span>';
    minutenEl.innerHTML = minuutStr + '<span>Minuten</span>';
    secondenEl.innerHTML = secondeStr + '<span>Seconden</span>';
    aanduidingEl.innerHTML = periode;

    uuCirkel.style.strokeDashoffset = 440 - (440 * uurWeergave) / 12;
    mmCirkel.style.strokeDashoffset = 440 - (440 * minuutGetal) / 60;
    ssCirkel.style.strokeDashoffset = 440 - (440 * secondeGetal) / 60;

    puntUur.style.transform = `rotate(${uurWeergave * 30}deg)`;
    puntMinuut.style.transform = `rotate(${minuutGetal * 6}deg)`;
    puntSeconde.style.transform = `rotate(${secondeGetal * 6}deg)`;

    // Micro-interactie bij secondewissel
    if (secondeGetal === 0) {
        document.querySelectorAll('.circle').forEach(circle => {
            circle.style.transform = 'scale(1.03)';
            setTimeout(() => circle.style.transform = 'scale(1)', 300);
        });
    }
}, 1000);

// feeedback bij het klikken 
document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', () => {
        circle.style.transform = 'scale(0.95)';
        setTimeout(() => circle.style.transform = 'scale(1)', 200);
    });
});