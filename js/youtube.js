// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() { // 라이브러리가 자체적으로 이 함수를 찾는 것이므로 함수 이름을 절대 바꾸면 x
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', // 최초 재생할 유튜브 영상 ID // 소스코드복사도 가능하나 그것은 제어 x
    playerVars: {
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) { // 객체 데이터 내부에 함수 데이터 할당되어있는 속성 - 메서드
        // 영상이 준비되면 익명의 함수 실행
        event.target.mute() // target은 재생되고 있는 영상 // 음소거
      }
    }
  });
}