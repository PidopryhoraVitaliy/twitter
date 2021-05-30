export default class Api {

    constructor() {
        this._apiBase = 'http://127.0.0.1:3065';
    }

    async getResource(url) {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`cannot get ${url} status ${res.status}`);
        }
        return await res.json();
    }

    async setResource(url, body) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    getTodos() {
        return this.getResource(`${this._apiBase}/todos`);
    }

    createTodo(label) {
        const body = {
            "label": label,
            "important": false,
            "like": false,
            "isCompleted": false
        };
        return this.setResource(`${this._apiBase}/todos`, body);
    }

}