const searchEl = document.querySelector('.search'); // document는 html이라고 생각하면 됨
const searchInputEl = searchEl.querySelector('input'); // searchEl에서 input요소 찾음

searchEl.addEventListener('click', function () { // 서치요소 click하면 함수(핸들러) 실행
  searchInputEl.focus();
})

searchInputEl.addEventListener('focus', function () { // searchInput요소 focus되면 함수 실행
  searchEl.classList.add('focused'); // foucus 되면 검색요소에 focused라는 클래스 추가하겠다
  searchInputEl.setAttribute('placeholder', '통합검색'); // setAttribute는 요소에 html속성 지정
  // input요소에 입력할 힌트 부분 작성
})

searchInputEl.addEventListener('blur', function () { //focus 해제
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
})

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY); // window.scrollY로 화면이 몇 픽셀 지점에 있는지 확인가능
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간(초), 옵션(객체 데이터 많이 사용)); - 애니메이션 처리
    gsap.to(badgeEl, .6, {
      opacity: 0, // 0으로 점점 투명해, 이것만 하면 눈으로 보이게만 사라진 거고 실제 그 자리에 있음
      display: 'none' // 여기서는 문자 따움표 필요
    });
    // 버튼 보이기
    gsap.to(toTopEl, .2, { // gsap 안에 요소말고 선택자 써줘도 된다 gsap.to('#to-top',~) 가능
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100 // 오른쪽으로 100 이동
    });
  }
}, 300)); // 300ms, 0.3초 의미 - 0.3초 단위로 부하를 줘서 함수 우르르 실행되는 것 방지
// window는 브라우저 창이라고 생각 // lodash js library 통해 throttle이 실행되는 것
// .throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0 // scrolltoplugin 있어야지 쓸 수 있음, 화면 0px로 이동
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity : 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true, // 자동재생
  loop: true // 반복재생
});
new Swiper('.promotion .swiper', {
  // direction은 horizontal이 기본값이라 따로 명시x
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5초 의미
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide'); // hide 클래스 추가
  }else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) { // selector 선택자
  // 선택자만 넣어도 gsap이 요소 찾아줬으면
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1, // 무한 의미
      yoyo: true, // 한번 재생된 애니메이션 다시 뒤로 재생
      ease: Power1.easeInOut, // 좀 더 부드럽게 움직임 제어
      delay: random(0, delay) // 몇초 뒤 애니메이션 실행하겠다
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy'); // 스크롤하면서 섹션들이 화면에 보이는지를 라이브러리 도움 받아 감시
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // scene-특정한 요소 감시하는 옵션을 지정해주는 메서드
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소 지정
      triggerHook: .8 // 내가 감시하려는 요소가 0.8 뷰포트 지점 넘어서면 trigger
    })
    .setClassToggle(spyEl, 'show') // setClassToggle-어떤 클래스 넣었다 뺐다 제어 // 0.8에 걸리면 바로 show 추가
    .addTo(new ScrollMagic.Controller());
});


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 현재년도의 정보가 숫자데이터로 반환