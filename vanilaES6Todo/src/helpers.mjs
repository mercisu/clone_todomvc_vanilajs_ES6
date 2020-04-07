/*
이벤트 위임 함수 이다.
target : 이벤트 위임한 상위 element
selector : 이벤트 대상
type: 이벤트 종류

이벤트가 발생시 타겟과 선언한 target들 목록 중에서 일치하는 것이 있으면
handler에 target 컨텍스트와 이벤트 객체를 전달한다.
위 동작을 taget 이벤트 리스너 등록한다.
* */

export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElement = target.querySelectorAll(selector);
        let i = potentialElement.length;

        while(i--) {
            if(potentialElement[i] === targetElement) {
                handler.call(targetElement,event);
                //call 함수는 첫번째 파라미터는 handler에 호출되는 this값 context를 넘긴다.
                //call은 메소드를 작성하면 새객체를 위한 메소드를 재작성할 필요없이 다른 객체에 상속 할 수 있다.
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}


export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
    //capture 는 하위로 이벤트를 전달하는것 기본은 false
}

/*
&amp, &lt와 같은 특수문자를 HTML Entity 엔티티라고 부른다.
<div> < menu</div> menu 앞특수 문자를 표현하기 위한것
&문자를 Html &amp로 변환하는 행위를 Escape(이스케이프) 한다고 함.
 */
export const escapeForHTML = s => s.replace(/&</g, c => c ==='&'?'&amp;' : '&lt;');