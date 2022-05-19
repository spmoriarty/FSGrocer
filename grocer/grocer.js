import { checkAuth, logout, createNewItem } from '../fetch-utils.js';
import { renderGroceries } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const subButton = document.getElementById('addButton');
const remButton = document.getElementById('resetButton');
const grocerList = document.getElementById('list');


logoutButton.addEventListener('click', () => {
    logout();
});

subButton.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(grocerList);
    const newItem = { item: data.get('item-text'), qty: data.get('qty-text'),
    };
    const resp = await createNewItem(newItem);
    console.log(resp);
});


