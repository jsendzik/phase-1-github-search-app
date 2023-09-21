

const form = document.getElementById("github-form");
const input = document.getElementById("search");
const userList = document.querySelector("#user-list")
const repoList = document.querySelector("#repos-list")




form.addEventListener("submit", userSearch);
function userSearch(event) {
    event.preventDefault();
    //console.log(input.value);
    fetch(`https://api.github.com/search/users?q=${input.value}`)
    .then(response => response.json())
    .then(users => {
        //console.log(users);
        users.items.forEach((user) => {
            const li = document.createElement("li");
            userList.appendChild(li);
            li.innerText = `${user.login}   `;
            li.style.fontSize = "25px";
            const img = document.createElement("img");
            li.appendChild(img);
            img.setAttribute("src", user.avatar_url);
            img.style.height = "25px"

            //Below adds repo URL to userList, but doesn't getUserRepo to work
            // const li2 = document.createElement("p");
            // li.appendChild(li2);
            // li2.innerText = `${user.repos_url}`;
            // li2.style.fontSize = "25px";


            li.addEventListener("click", getUserRepo)
            function getUserRepo (event) {
                //console.log(event.target.innerText);
                fetch(`https://api.github.com/users/${event.target.innerText}/repos`)
                .then(resp => resp.json())
                .then(repos => {
                    //console.log(repos)
                    repos.forEach((repo) => {
                        //console.log(repo.name);
                        const li3 = document.createElement("li");
                        li3.innerText = repo.name;
                        repoList.appendChild(li3)
                    })
                })
                }
        });
        });
}
