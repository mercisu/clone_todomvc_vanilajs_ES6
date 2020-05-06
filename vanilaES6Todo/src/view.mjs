import {ItemList} from "./item.mjs";
import {qs,$on, $delegate} from './helpers.mjs';
import Template from "./template.mjs";

const _itemId = element => parseInt(element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id, 10);
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
export default class View {
    constructor(template) {
        this.template = template;
        this.$todoList = qs('.todo-list');
        this.$todoItemCounter = qs('.todo-count');
        this.$clearCompleted = qs('.clear-completed');
        this.$main = qs('.main');
        this.$toggleAll = qs('.toggle-all');
        this.$newTodo = qs('.new-todo');

        $delegate(this.$todoList, 'li label', 'dblclick', ({target}) => {
           this.editItem(target);
        });
    }

    editItem(target) {

        const listItem = target.parentElement.parentElement;
        listItem.classList.add('editing');

        const input = document.createElement('input');
        input.className = 'edit';

        input.value = target.innerText;
        listItem.appendChild(input);
        input.focus();
    }

    editItemDone(id, title) {
        const listItem = qs(`[data-id="${id}"`);
        const input = qs('input.edit', listItem);
        listItem.removeChild(input);

        listItem.classList.remove('editing');
        qs('label', listItem).textContent = title;
    }

    showItems(items) {
        this.$todoList.innerHTML = this.template.itemList(items);
    }

    removeItem(id) {
        const elem = qs(`[data-id="${id}"]`);
        if(elem) {
            this.$todoList.removeChild(elem);
        }
    }

    setItemsLeft(itemsLeft) {
        this.$todoItemCounter.innerHTML = this.template.itemCounter(itemsLeft);
    }

    setClearCompletedButtonVisibility(visible) {
        this.$clearCompleted.style.display = !!visible ? 'block' :'none';
    }

    setMainVisibility(visible) {
        this.$main.style.display = !!visible ? 'block': 'none';
    }

    setCompleteAllCheckbox(checked) {
        this.$toggleAll.checked = !!checked;
    }

    //현재 라우트 상태를 보고 필터링 버튼을 변경한다.
    updateFilterButtons(route) {
        qs('.filters .selected').className = '';
        qs(`.filters [href="#/${route}"]`).className = 'selected';
    }

    clearNewTodo() {
        this.$newTodo.value = '';
    }

    setItemComplete(id, completed) {
        const listItem = qs(`[data-id="${id}"`);

        if(!listItem) {
            return;
        }
        listItem.className = completed ? 'completed':'';
        qs('input',listItem).checked = completed;
    }

    bindAddItem(handler) {

        //destructuring-objects-as-function-parameters-in-es6
        // ({target}) 파라미터가 object로 전달 될때 target이라는 이름의 프로퍼티가 있어야함을 의미

        //change event triggers when the element has finished changing.
        $on(this.$newTodo, 'change', ({target}) => {
            const title = target.value.trim();
            if(title) {
                handler(title);
            }
        })
    }

    bindRemoveCompleted(handler) {
        $on(this.$clearCompleted, 'click', handler);
    }

    bindRemoveItem(handler) {
        $delegate(this.$todoList, '.destroy', 'click', ({target}) => {
           handler(_itemId(target));
        });
    }

    bindEditItemSave(handler) {
        $delegate(this.$todoList,'li .edit', 'blur',({target}) => {
            if(!target.dataset.iscanceled) {
                handler(_itemId(target), target.value.trim());
            }
        },true);

        $delegate(this.$todoList, 'li .edit', 'keypress', ({target, keyCode}) =>{
            if (keyCode === ENTER_KEY) {
                target.blur();
            }
        })
    }

    bindEditItemCancel(handler) {
        $delegate(this.$todoList, 'li .edit', 'keyup', ({target, keyCode}) => {
            if (keyCode === ESCAPE_KEY) {
                target.dataset.iscanceled = true;
                target.blur();

                handler(_itemId(target));
            }
        })
    }

    bindToggleAll(handler) {
        $on(this.$toggleAll,'click', ({target}) => {
           handler(target.checked);
        });
    }

    bindToggleItem(handler) {
        $delegate(this.$todoList, '.toggle', 'click', ({target}) => {
            handler(_itemId(target), target.checked);
        })
    }
}