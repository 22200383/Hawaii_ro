const tripForm = document.querySelector('#tripForm');
const budgetResult = document.querySelector('#budgetResult');

tripForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const startDate = new Date(document.querySelector('#startDate').value);
  const endDate = new Date(document.querySelector('#endDate').value);
  const people = Number(document.querySelector('#people').value);
  const style = document.querySelector('#style').value;

  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((endDate - startDate) / oneDay) + 1;

  if (days <= 0 || people <= 0) {
    budgetResult.textContent = '날짜와 인원수를 다시 확인해주세요.';
    return;
  }

  const priceTable = {
    budget: 220000,
    standard: 330000,
    premium: 520000
  };

  const flightPerPerson = 950000;
  const dailyCost = priceTable[style];
  const total = (flightPerPerson * people) + (dailyCost * days * people);

  budgetResult.innerHTML = `
    <p>총 여행 기간: ${days}일</p>
    <p>예상 총 경비: ${total.toLocaleString()}원</p>
    <p>1인 예상 경비: ${Math.round(total / people).toLocaleString()}원</p>
  `;
});

const canvas = document.querySelector('#koreaChart');
const ctx = canvas.getContext('2d');

const chartData = [27023, 31686];
const chartLabels = ['2025년 1~2월', '2026년 1~2월'];
const maxValue = 36000;
const barWidth = 70;
const baseY = 150;

ctx.font = '13px Pretendard';
ctx.fillStyle = '#1f2f2f';
ctx.fillText('한국발 하와이 방문객 수', 20, 20);

chartData.forEach(function (value, index) {
  const x = 70 + index * 130;
  const barHeight = (value / maxValue) * 100;
  const y = baseY - barHeight;

  ctx.fillStyle = index === 0 ? '#9ddada' : '#008B8B';
  ctx.fillRect(x, y, barWidth, barHeight);

  ctx.fillStyle = '#1f2f2f';
  ctx.fillText(value.toLocaleString() + '명', x - 4, y - 8);
  ctx.fillText(chartLabels[index], x - 18, 170);
});


const islandInfo = document.querySelector('#islandInfo');
const mapPins = document.querySelectorAll('.map-pin');

const islandData = {
  kauai: {
    label: 'Kauai',
    title: '자연과 초록빛 풍경이 아름다운 카우아이',
    text: '카우아이는 조용하고 자연적인 분위기가 강한 섬입니다. 와이메아 캐니언, 나팔리 코스트처럼 웅장한 자연 경관을 보고 싶은 여행자에게 잘 맞습니다.',
    link: 'places.html'
  },
  oahu: {
    label: 'Oahu',
    title: '호놀룰루가 있는 오아후 섬',
    text: '오아후는 하와이 여행의 시작점으로, 와이키키 해변과 다이아몬드 헤드, 쇼핑 거리, 다양한 음식 문화를 한 번에 즐길 수 있는 대표 섬입니다.',
    link: 'places.html'
  },
  maui: {
    label: 'Maui',
    title: '휴양과 드라이브 여행에 좋은 마우이',
    text: '마우이는 리조트 휴양, 해변 산책, 로드 투 하나 드라이브로 유명합니다. 여유로운 분위기 속에서 자연과 액티비티를 함께 즐기기 좋습니다.',
    link: 'activities.html'
  },
  bigisland: {
    label: 'Big Island',
    title: '화산과 별빛을 볼 수 있는 하와이섬',
    text: '하와이섬은 빅아일랜드라고도 불리며, 화산 국립공원과 마우나케아 별 관측처럼 다른 섬과 차별화된 자연 경험을 제공합니다.',
    link: 'places.html'
  }
};

function showIslandInfo(islandName) {
  const island = islandData[islandName];

  islandInfo.innerHTML = `
    <span class="island-label">${island.label}</span>
    <h3>${island.title}</h3>
    <p>${island.text}</p>
    <a href="${island.link}">관련 페이지에서 더 보기 →</a>
  `;

  mapPins.forEach(function (pin) {
    pin.classList.remove('active');
  });

  document.querySelector(`[data-island="${islandName}"]`).classList.add('active');
}

mapPins.forEach(function (pin) {
  pin.addEventListener('click', function () {
    showIslandInfo(pin.dataset.island);
  });
});

showIslandInfo('oahu');
