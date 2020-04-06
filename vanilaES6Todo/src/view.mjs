
import {qs,$on} from './helpers.mjs';

export default class View {
    constructor(template) {
        this.template = template;
    }

    //현재 라우트 상태를 보고 필터링 버튼을 변경한다.
    updateFilterButtons(route) {
        qs('.filters .selected').className = '';
        qs(`.filters [href="#/${route}"]`).className = 'selected';
    }
}