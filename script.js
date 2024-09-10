window.addEventListener("DOMContentLoaded", () => {
  startRotate();
  drawRouletteWheel(lists);
  START();
});

let count = 0;
let answer = 0;
let timer;

const lists = [
  9,
  28,
  0,
  2,
  14,
  35,
  23,
  4,
  16,
  33,
  21,
  6,
  18,
  31,
  19,
  8,
  12,
  29,
  25,
  10,
  27,
  "00",
  1,
  13,
  36,
  24,
  3,
  15,
  34,
  22,
  5,
  17,
  32,
  20,
  7,
  11,
  30,
  26,
];

const startRotate = () => {
  const roulette = document.getElementById("circle-wrap");
  const reg = count % 360;
  roulette.style.rotate = reg + "deg";
  count = count * 0.98;
  if (count < 0.3) {
    finish();
  }
  timer = requestAnimationFrame(startRotate);
};

const START = () => {
  const result = document.getElementById("result");
  result.classList.remove("show");
  count = 99999;

  const roulette = document.getElementById("circle");
  const randomNumber = randomInt();
  console.log(randomNumber);

  roulette.style.rotate =
    ((180 - 180 / 38 + randomNumber * (-360 / 38)) % 360) + "deg";
  answer = randomNumber;
  startRotate();
};

const randomInt = () => {
  return Math.floor(Math.random() * 38);
};

const finish = () => {
  const result = document.getElementById("result");
  result.innerText = lists[answer];
  result.classList.add("show");
};

function drawRouletteWheel(lists) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10; // 余白を持たせるための半径調整
  const numberOfSlices = lists.length;
  const sliceAngle = (2 * Math.PI) / numberOfSlices;

  // ルーレットの各セクターを描画
  for (let i = 0; i < numberOfSlices; i++) {
    // 色を交互に赤と白に設定
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fillStyle =
      lists[i] == "00" || lists[i] == 0
        ? "green"
        : i % 2 === 0
        ? "red"
        : "black";
    ctx.fill();

    // 境界線を描画
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // テキストを描画
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((i + 0.5) * sliceAngle); // セクターの中心に合わせて回転

    // 文字を内向きにするために回転
    ctx.rotate(Math.PI);

    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Arial"; // フォントサイズを大きくする
    ctx.fillText(lists[i], -(radius - 40), 10); // テキストをセクターの内側に描画
    ctx.restore();
  }

  // 中心円を描画
  ctx.beginPath();
  ctx.arc(centerX, centerY, 400, 0, 2 * Math.PI);
  ctx.fillStyle = "brown";
  ctx.fill();
}
