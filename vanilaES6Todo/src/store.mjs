import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from "./item";

export default class Store {
    constructor(name, callback) {

        const localStorage = window.localStorage;

        let liveTodos;

        this.getLocalStorage = () => {
            return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
        }

        this.setLocalStorage = (todos) => {
            localStorage.setItem(name, JSON.stringify(liveTodos = todos));
        }

        if(callback) {
            callback();
        }
    }

}