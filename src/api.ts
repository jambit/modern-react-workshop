import { Todo } from './redux/todos/reducer';

export const DEFAULT_TOKEN = 'asdakjdsl2983lasdk';

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve(undefined), time));
}

function readItems(): Todo[] {
    const itemsData = localStorage.getItem('items');
    return itemsData ? JSON.parse(itemsData) : [];
}

function setItems(items: Todo[]) {
    localStorage.setItem('items', JSON.stringify(items));
}

function validateToken(token: string) {
    if (token !== DEFAULT_TOKEN) throw new Error('wrong token');
}

export const api = {
    async getTodos(token: string) {
        await sleep(100);
        validateToken(token);
        return readItems();
    },
    async addTodo(token: string, label: string) {
        await sleep(1000);
        validateToken(token);
        const nextId = localStorage.getItem('nextId');
        const id = nextId ? parseInt(nextId) : 1;
        localStorage.setItem('nextId', (id + 1).toString());
        const item: Todo = {
            id,
            label,
            checked: false,
        };
        setItems([...readItems(), item]);
        return item;
    },
    async setTodoChecked(token: string, id: number, checked: boolean) {
        await sleep(200);
        validateToken(token);
        setItems(
            readItems().map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        checked,
                    };
                }
                return item;
            })
        );
    },
    async removeTodo(token: string, id: number) {
        await sleep(500);
        validateToken(token);
        setItems(readItems().filter((item) => item.id !== id));
    },
};
