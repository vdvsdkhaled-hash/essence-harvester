// الوصول إلى عناصر HTML
const pointsDisplay = document.getElementById('points-display');
const clickableOrb = document.getElementById('clickable-orb');
const upgradeClickBtn = document.getElementById('upgrade-click-btn');
const clickUpgradeCostSpan = document.getElementById('click-upgrade-cost');
const upgradeAutoBtn = document.getElementById('upgrade-auto-btn');
const autoUpgradeCostSpan = document.getElementById('auto-upgrade-cost');

// متغيرات اللعبة
let points = 0;
let pointsPerClick = 1;
let clickUpgradeCost = 10;
let autoHarvesters = 0;
let autoUpgradeCost = 100;

// --- حفظ وتحميل التقدم ---
function saveGame() {
    const gameState = {
        points: points,
        pointsPerClick: pointsPerClick,
        clickUpgradeCost: clickUpgradeCost,
        autoHarvesters: autoHarvesters,
        autoUpgradeCost: autoUpgradeCost
    };
    localStorage.setItem('essenceHarvesterSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = JSON.parse(localStorage.getItem('essenceHarvesterSave'));
    if (savedState) {
        points = savedState.points;
        pointsPerClick = savedState.pointsPerClick;
        clickUpgradeCost = savedState.clickUpgradeCost;
        autoHarvesters = savedState.autoHarvesters;
        autoUpgradeCost = savedState.autoUpgradeCost;
    }
    updateDisplay();
}

// --- وظائف اللعبة الأساسية ---
function updateDisplay() {
    pointsDisplay.textContent = Math.floor(points);
    clickUpgradeCostSpan.textContent = clickUpgradeCost;
    autoUpgradeCostSpan.textContent = autoUpgradeCost;
}

// عند النقر على الجرم السماوي
clickableOrb.addEventListener('click', () => {
    points += pointsPerClick;
    updateDisplay();
});

// عند شراء تطوير للنقرة
upgradeClickBtn.addEventListener('click', () => {
    if (points >= clickUpgradeCost) {
        points -= clickUpgradeCost;
        pointsPerClick += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateDisplay();
    }
});

// عند شراء حاصد آلي
upgradeAutoBtn.addEventListener('click', () => {
    if (points >= autoUpgradeCost) {
        points -= autoUpgradeCost;
        autoHarvesters += 1;
        autoUpgradeCost = Math.floor(autoUpgradeCost * 2);
        updateDisplay();
    }
});

// --- الحلقة الآلية للعبة ---
setInterval(() => {
    points += autoHarvesters * 0.5; // كل حاصد يعطي نصف نقطة في الثانية
    updateDisplay();
    saveGame(); // حفظ تلقائي كل ثانية
}, 1000);

// بدء اللعبة بتحميل التقدم المحفوظ
window.onload = loadGame;

// إخبار تيليجرام بأن التطبيق جاهز
Telegram.WebApp.ready();