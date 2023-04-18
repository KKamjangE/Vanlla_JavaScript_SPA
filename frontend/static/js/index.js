// async를 사용하는 이유는, 어떤 페이지에서는 렌더링 전에 서버 단 요청을 먼저 받아야하는 경우가 있기 때문
const router = async () => {
  // 각 route의 경로와 현재 페이지 확인용 콘솔
  const routes = [
    { path: "/", view: () => console.log("Viewing Dashboard") },
    { path: "/posts", view: () => console.log("Viewing Posts") },
    { path: "/settings", view: () => console.log("Viewing settings") },
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
      route: routes[0],
      isMatch: true,
    };
  }

  console.log(match.route.view());
};

document.addEventListener("DOMContentLoaded", () => {
  router();
});
