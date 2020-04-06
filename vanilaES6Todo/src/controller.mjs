export default class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;

        this._activeRoute = '';
        this._lastActiveRoute = null;
    }

    // 라우팅 주소에 따라 뷰를 렌더링한다.
    setView(raw) {
        const route = raw.replace(/^#\//,'');
        this._activeRoute = route;
        this._filter();
        this.view.updateFilterButtons(route);
    }


}