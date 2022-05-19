


export function renderGroceries(grocery) {

    

    const div = document.createElement('div');
    div.classList.add('added');


    // const a = document.createElement('a');
    // a.href = post.contact;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = grocery.item;


    const span = document.createElement('span');
    span.textContent = grocery.qty;

    
    div.append(nameSpan, span);
    return div;
}