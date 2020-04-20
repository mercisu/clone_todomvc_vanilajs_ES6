import {emptyItemQuery} from "./item";

export default class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;

        view.bindAddItem(this.addItem.bind(this));

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