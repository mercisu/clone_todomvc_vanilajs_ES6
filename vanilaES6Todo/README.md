알게 된것들

import
다른 모듈에서 내보낸 바인딩을 가져올 때 사용
가져온 모듈은 무조건 엄격 모드

하나의 모듈에서 하나의 객체만 내보낼때 Default Export 사용

참고
//모듈
https://velog.io/@widian/%EC%9B%B9%EC%97%90%EC%84%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

//모듈과 클래식 스크립트의 차이점

클래식 스크립트는 기본적으로 HTML파서를 지연시킴
모듈은 기본적으로 defer되기 때문에 스크립트 다운로드와 parsing
모듈은 기본적으로 defer되기 때문에 스크립트 다운로드와 parsing 병행?

static import는 모든 모듈이 다운로드가 된다음 실행됨.


//item.js의 역할
다른 모듈에서 사용할 변수를 선언한다
export를 이용

//store.mjs
사용자가 입력한 데이터를 로컬스토리지에 저장하고 읽어온다.