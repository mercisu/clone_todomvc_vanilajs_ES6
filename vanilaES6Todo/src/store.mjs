import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from "./item.mjs";

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

    find(query, callback) {
        const todos = this.getLocalStorage();
        let k;
        callback(todos.filter(todo => {
            for(k in query) {
                if(query[k] !== todo[k]) {
                    return false;
                }
            }
            return true;

        }));
    }

    insert(item, callback) {
        const todos = this.getLocalStorage();
        todos.push(item);
        this.setLocalStorage(todos);
        if(callback) {
            callback();
        }
    }

    count(callback) {
        this.find(emptyItemQuery, data => {
           const total = data.length;
           let i = total;
           let completed = 0;

           while (i--) {
               completed += data[i].completed;
           }

           callback(total, total - completed, completed)

        });
    }


}