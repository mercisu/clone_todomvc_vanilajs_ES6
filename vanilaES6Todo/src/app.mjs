import Controller from './controller.mjs';
import {$on} from './helpers.mjs';
import Template from "./template.mjs";
import Store from './store.mjs';
import View from './view.mjs';

const store = new Store('todos-vanilla-es6');

const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);
const setView = () => controller.setView(document.location.hash);
//화살표 함수로 간략 하게 함수 선언 할 수 있다.

// 해시방식으로 뷰를 그린다.
$on(window, 'load', setView);
$on(window, 'hashchange', setView);

/*
해시 방식으로 구현
URL 이 동일한 상태에서 hash가 변경되면  URI 만 바뀌므로 서버에 어떤 요청도 하지 않는다.
다시 말하면, hash 가 변경되어도 요청이 보내 지지 않으므로 페이지의 새로고침이 발생하지 않는다.
브라우저는 서버에 어떠한 요청도 하지 않는다.
ajax요청은 url이 변경시키지 않으므로 history관리가 되지 않음
하지만 hash 방식은 논리적 URL이 존재하므로 history관리가 가능함.
단점은 uri에 불필요한 #이들어간다는 것. 해시뱅(hash-bang)이라고 부름

더 나아가 PJAX방식이 있음
hash방식의 단점은 SEO이슈이다. 네비게이션이 클릭되면 path가 추가된 URI가 서버로 요청된다.
내비게이션 클릭 이벤트를 케치하고 preventDefault를 이용하여 서버로의 요청을 방지한다.
이때 pushState 메소드를 이용하여 주소창의 URL을 변경하고 URL을 history entry로 추가하지만 요청은 하지 않는다.
*/
