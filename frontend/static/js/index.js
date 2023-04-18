import Dashboard from "../views/Dashboard.js";
import Posts from "../views/Posts.js";
import Settings from "../views/Settings.js";
import NotFound from "../views/NotFound.js";

// 페이지 전환 함수
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// async를 사용하는 이유는, 어떤 페이지에서는 렌더링 전에 서버 단 요청을 먼저 받아야하는 경우가 있기 때문
const router = async () => {
  // 각 route의 경로와 현재 페이지 확인용 콘솔
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
    { path: "/404", view: NotFound },
  ];

  // 현재 route와 현재 페이지 경로가 일치하는지 테스트
  const routeMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = routeMatches.find((routeMatche) => routeMatche.isMatch);

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }

  // 활성화된 view 가져오기
  const view = new match.route.view();

  // #app element에 활성화된 view의 HTML 삽입
  document.querySelector("#app").innerHTML = await view.getHtml();
};

// 뒤로가기나 새로고침했을 때 router도 그 페이지에 맞게 동작
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // 클릭 이벤트 발생 시 해당 target이 "data-link" attribute가 있다면 페이지 이동 함수 실행
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
