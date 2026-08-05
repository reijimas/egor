// ===== 画像データ =====
// season や画像を増やすときは、この配列を編集するだけでOK。
//   name  : picture フォルダ内のフォルダ名（パス生成に使用）
//   label : 画面に表示する文字（自由。例 "2024 SS"）
// パスは picture/{name}/{image} で自動生成されます。
const seasons = [
  { name: "season2", label: "SEASON 2", images: ["1.jpg", "2.jpg", "3.jpg"] },
  { name: "season1", label: "SEASON 1", images: ["1.jpg", "2.jpg"] },
];

// ===== ここから下は基本的に触らなくてOK =====
const root = document.getElementById("archive");

// ページ先頭のセクションリンク一覧を生成 ---
const nav = document.createElement("nav");
nav.className = "archive-nav";
 
seasons.forEach((season) => {
  const link = document.createElement("a");
  link.className = "archive-nav-link";
  link.href = `#${season.name}`;   // 対応するセクションへ飛ぶ
  link.textContent = season.label;
  nav.appendChild(link);
});
 
root.appendChild(nav);
 
// --- 各 season のカルーセルを生成 ---
seasons.forEach((season) => {
  const carousel = document.createElement("section");
  carousel.className = "carousel";
  carousel.id = season.name;              // ← リンクの飛び先（アンカー）
  carousel.dataset.season = season.name;

  // 表示用ラベル（写真の上の余白に出る）
  const label = document.createElement("span");
  label.className = "carousel-label";
  label.textContent = season.label;

  const prev = document.createElement("button");
  prev.className = "carousel-prev";
  prev.type = "button";

  const next = document.createElement("button");
  next.className = "carousel-next";
  next.type = "button";

  const track = document.createElement("div");
  track.className = "carousel-track";

  season.images.forEach((file) => {
    const item = document.createElement("div");
    item.className = "carousel-item";

    const img = document.createElement("img");
    img.src = `picture/${season.name}/${file}`;
    img.alt = "";
    img.loading = "lazy";

    item.appendChild(img);
    track.appendChild(item);
  });

  // 今どの画像を表示しているかを算出（トラックの幅で割る）
  const currentIndex = () =>
    Math.round(track.scrollLeft / track.clientWidth);

  const lastIndex = () => season.images.length - 1;

  const goTo = (index) => {
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  // 矢印: 端まで来たらループ
  prev.addEventListener("click", () => {
    const i = currentIndex();
    goTo(i <= 0 ? lastIndex() : i - 1);
  });
  next.addEventListener("click", () => {
    const i = currentIndex();
    goTo(i >= lastIndex() ? 0 : i + 1);
  });

  // ラベルはトラックの外（上）に置く → 写真と重ならない
  carousel.appendChild(label);

  // 矢印とトラックは重ねたいのでラッパーにまとめる
  const viewport = document.createElement("div");
  viewport.className = "carousel-viewport";
  viewport.appendChild(prev);
  viewport.appendChild(track);
  viewport.appendChild(next);

  carousel.appendChild(viewport);
  root.appendChild(carousel);
});
