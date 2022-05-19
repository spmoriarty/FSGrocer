import { checkAuth, logout, createNewItem, fetchGrocery, removeItems } from '../fetch-utils.js';
import { renderGroceries } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
//const subButton = document.getElementById('addButton');
const remButton = document.getElementById('resetButton');
const groceryForm = document.getElementById('list');
const groceryList = document.getElementById('listItems');

logoutButton.addEventListener('click', () => {
    logout();
});

groceryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(groceryForm);
    const newItem = { item: data.get('item-text'), qty: data.get('qty-text'),
    };
    const resp = await createNewItem(newItem.item, newItem.qty);
    console.log(resp);
    onLoad();
});

async function onLoad() {
    groceryList.textContent = '';
    const data = await fetchGrocery();
    for (let grocery of data) {
        const grocerList = renderGroceries(grocery);
        groceryList.append(grocerList);
    }
    
}

remButton.addEventListener('click', () => {
    const user = checkAuth();
    
    removeItems(user.id);
    onLoad();
    // const data = await fetchGrocery();
    // for (let grocery of data) {
    //     const grocerList = renderGroceries(grocery);
    //     grocerList.append(grocerList);
    // }
});

onLoad();


