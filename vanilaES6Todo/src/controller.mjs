import {emptyItemQuery} from "./item.mjs";

export default class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;

        /* bind: 새로운 바인딩 함수를 만듬
        *  해당 함수를 "나중에" 이벤트에서 유용한 특정 컨텍스트로 호출 할 대 사용된다.
        * */
        view.bindAddItem(this.addItem.bind(this));
        view.bindRemoveItem(this.removeItem.bind(this));
        view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
        view.bindEditItemSave(this.editItemSave.bind(this));
        view.bindEditItemCancel(this.editItemCancel.bind(this));

        this._activeRoute = '';
        this._lastActiveRoute = null;
    }

    // 라우팅 주소에 렌더링 한다.
    // '','#/' '#/active,'#/completed'가 있음
    setView(raw) {
        const route = raw.replace(/^#\//,'');
        this._activeRoute = route;
        this._filter();
        this.view.updateFilterButtons(route);
    }

    addItem(title) {
        this.store.insert({
            id: Date.now(),
            title,
            completed:false
        },() => {
            this.view.clearNewTodo();
            this._filter(true);
        });
    }

    editItemSave(id, title) {
        if(title.length) {
            this.store.update({id,title}, () => {
               this.view.editItemDone(id,title);
            });
        } else{
            this.removeItem(id);
        }
    }

    editItemCancel(id) {
        this.store.find({id}, data => {
            const title = data[0].title;
            this.view.editItemDone(id, title);
        })
    }

    removeItem(id) {
        this.store.remove({id}, () => {
            this._filter();
            this.view.removeItem(id);
        });
    }

    removeCompletedItems() {
        this.store.remove({completed:true},this._filter.bind(this));
    }


    //현재 route를 기준으로 목록을 refresh한다.
    //force는 라우트에 상관없이 무조건 동작하게 할때 사용한다.
    _filter(force) {
        const route = this._activeRoute;
        if (force || this._lastActiveRoute !== '' || this._lastActiveRoute !== route) {
            this.store.find({
                '':emptyItemQuery,
                'active':{completed:false},
                'completed':{completed: true}
            }[route], this.view.showItems.bind(this.view));
        }

        this.store.count((total,active,completed) => {
           this.view.setItemsLeft(active);
           this.view.setClearCompletedButtonVisibility(completed);
           this.view.setCompleteAllCheckbox(completed === total);
           this.view.setMainVisibility(total);
        });

        this._lastActiveRoute = route;
    }
}