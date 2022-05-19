import { checkAuth, logout, createNewItem, fetchGrocery } from '../fetch-utils.js';
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
    const resp = await createNewItem(grocery);
    console.log(resp);
});

async function onLoad() {
    const data = await fetchGrocery();
    for (let grocery of data) {
        const grocerList = renderGroceries(grocery);
        grocerList.append(grocerList);
    }
    
}

onLoad();


