import {ItemList} from "./item";
import {escapeForHTML} from './helpers';

export default class Template {

    itemList(items) {
        return items.reduce((a, item) => a + `
<li data-id="${item.id}"${item.completed ? ' class="completed"' : ''}>
    <div class="view">
        <input class="toggle" type="checkbox" ${item.completed? 'checked' : ''}>
        <label>${escapeForHTML(item.title)}</label>
        <button class="destory"></button>
    </div>
</li>`,'');
    }

}

/*
 Template literals
 백틱 문자열을 사용한다.
 여러줄 걸쳐 문자열 작성 가능하고 템플릿 리터럴내의 모든 white-space는 있는 그대로 적용된다.

 ${} 문자열 인터폴레이션을 사용하여 표현식을 강제로 타입 변환한다.

 */