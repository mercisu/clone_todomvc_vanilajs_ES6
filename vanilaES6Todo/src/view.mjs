
import {qs,$on} from './helpers.mjs';
import {$delegate} from "./helpers";

export default class View {
    constructor(template) {
        this.template = template;
        this.$todoList = qs('.todo-list');
        this.$todoItemCounter = qs('todo-count');
        this.$clearCompleted = qs('.clear-completed');
        this.$main = qs('.main');
        this.$toggleAll = qs('.toggle-all');
        this.$newTodo = qs('.new-todo');

        $delegate(this.$todoList, 'li label', 'dblclick', ({target}) => {
           this.editItem(target);
        });
    }

    showItems(items) {
        this.$todoList.innerHTML = this.template.itemList(items);
    }
    //현재 라우트 상태를 보고 필터링 버튼을 변경한다.
    updateFilterButtons(route) {
        qs('.filters .selected').className = '';
        qs(`.filters [href="#/${route}"]`).className = 'selected';
    }

    bindAddItem(handler) {

        //destructuring-objects-as-function-parameters-in-es6
        // ({target}) 파라미터가 object로 전달 될때 target이라는 이름의 프로퍼티가 있어야함을 의미
        $on(this.$newTodo, 'change', ({target}) => {
            console.log(target)
            const title = target.value.trim();
            if(title) {
                handler(title);
            }
        })
    }
}