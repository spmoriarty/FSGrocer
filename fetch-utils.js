const SUPABASE_URL = 'https://xsjxkslcnzexkeuqopsq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzanhrc2xjbnpleGtldXFvcHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTI0MzIsImV4cCI6MTk2Nzg2ODQzMn0.6PW-I5jDnoqhgO6Egpvc5fEpprJ1jHfmAODRlCynp2I';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();
    
    if (!user) location.replace('../');
    return user;
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./grocer');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function createNewItem(item, qty) {
    const response = await client.from('grocery').insert({ item, qty });
    //const resp = await client.from('grocery').update({ purchased: !item.purchased }).match(purchased, purchased.id);

    if (response.data) {
        return response.data;
    } else {
        console.error(response.error);
    }
}

export async function fetchGrocery() {
    const response = await client.from('grocery').select('*');
    
    return response.data;

}

export async function removeItems(id) {
    const response = await client.from('grocery').delete().eq('user_id', id);
    if (response.data) {
        return response.data;
    } else {
        console.error(response.error);
    }
}

export async function togglePurchased(item) {
    console.log(item);
    const response = await client.from('grocery').update({ purchased: !item.purchased }).match({ id: item.id });
    
    return response.data;
}
