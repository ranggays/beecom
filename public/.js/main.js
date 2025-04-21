const btn = document.querySelector('.get-posts-btn');

async function getFetch(){
    const res = await fetch('http://localhost:3000/api/posts');
    return await res.json();   
}

async function postFetch(name){
    const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name : name
        })
    });
    const data = await res.json();
    console.log(data);
}

async function delFetch(id){
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            
        })
    })
    const data = await res.json();
    console.log(data);
}

async function updateFetch(id, name){
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name : name
        })
    })
    const data = await res.json();
    console.log(data);
}

btn.addEventListener('click', async() => {
    const data = await getFetch();
    console.log(data);

    const output = document.querySelector('.output')
    let body = '';
    data.forEach((post) => {
        body += `
            <br>
            <span>${post.id}</span>
            <span>${post.name}</span>
            <div class="update-post"></div>
            <button class="upd-btn" data-update-id="${post.id}" data-update-name="${post.name}">Update</button>
            <button class="dlt-btn" data-delete-id="${post.id}">Delete</button>
            <br>
        `
    });
    output.innerHTML = body;

    document.querySelectorAll('.dlt-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const delButton = button.dataset.deleteId;
            delFetch(delButton);
        })
    })

    
    document.querySelectorAll('.upd-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const updButton = button.dataset.updateName;
            const updButtonId = button.dataset.updateId;
            
            const parentDiv = button.parentElement;

            const existingForm = parentDiv.querySelector('.form-update');
            if(existingForm){
                existingForm.remove();
            }

            let body = `
                <form class="form-update">
                    <input class="input-name"></input>
                    <button>Submit</button>    
                </form>
            `;

            parentDiv.insertAdjacentHTML('beforeend', body);

            const formUpdate = document.querySelector('.form-update');
            const nameUpdate = document.querySelector('.input-name');
            formUpdate.addEventListener('submit', (event)=>{
                event.preventDefault();
                const name = nameUpdate.value;
                console.log(name);
                // updateFetch(updButtonId, name);
            })
            /*
            let bodyUpdate = ''
            const updateHTML = document.querySelector('.update-post');
            console.log(updateHTML);

            if(updButtonId){
                bodyUpdate += `
                    <form class="form-update">
                        <input class="input-name"></input>
                        <button>Submit</button>    
                    </form>
                `;
            }
            updateHTML.innerHTML = bodyUpdate;
            const formUpdate = document.querySelector('.form-update');
            const nameUpdate = document.querySelector('.input-name');
            formUpdate.addEventListener('submit', (event)=>{
                event.preventDefault();
                const name = nameUpdate.value;
                console.log(name);
                updateFetch(updButtonId, name);
            })
            */
        })
    })
    
})

const form = document.querySelector('.posts-form')
const input = document.querySelector('.input-form');
const formBtn = document.querySelector('.btn-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = input.value;
    console.log(name);

    postFetch(name);
})