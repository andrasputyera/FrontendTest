
document.getElementById("btn-search").addEventListener("click", getUserData);

const client_id = "Iv1.64350b47f705a1a8";
const client_secret = "98fd6d72947f87cb9f1d6d96cfa0cde74aa612aa";

function getUserData() {
    
    document.getElementById("info").style.display = "none";
    let user = document.getElementById("inputValue").value;
    
    let userData = `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`;

        fetch(userData)
        .then(response => response.json())
        .then(data => {
            document.getElementById("inputValue").value = ""
            /*Return an error message if user doesn't exist*/
            if(data.message){ 
                document.getElementById("error").style.display = "flex"; 
            }
            else{
                document.getElementById("error").style.display = "none";
                showUserData(data);
                getUserRepos(user);
        };
    })
    .catch(error => console.error(error));
}

function getUserRepos(user){

    const userRepo = `https://api.github.com/users/${user}/repos`;

        fetch(userRepo)
        .then(response => response.json())
        .then(data => {
            if(data.length == 0){
                document.getElementById("emptyRepos").style.display = "flex";
                document.getElementById("repoTable").style.display = "none";
            }
            else{
                document.getElementById("emptyRepos").style.display = "none";
                document.getElementById("repoTable").style.display = "block";
                showUserRepos(data);
        };
    })
    .catch(error => console.error(error));
}

function showUserData(data){
    
    document.getElementById("info").style.display = "block";
    document.getElementById("profilePic").src = data.avatar_url;
    document.getElementById("loginName").innerHTML = "@" + data.login;
    document.getElementById("fullName").innerHTML = data.name;
    document.getElementById("userBio").innerHTML = data.bio;
}

function showUserRepos(data){

    const repoTable = document.getElementById("repoTable");

    repoTable.innerHTML = "";

    let template = "";

    data.map(repository => {
         template += `
            <div class="repoContainer">
                <h3 class="repoTitle">${repository.name}</h3>
                <div class="icons">
                <span><img src="img/star.png" class="star">${repository.stargazers_count}</span>
                <span><img src="img/code-fork-symbol.png" class="fork">${repository.forks_count}</span>
                </div>
            </div>`;
    });

    repoTable.innerHTML = template;
}