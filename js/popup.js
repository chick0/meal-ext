function getApp() {
    const app = document.getElementById("app");
    app.innerHTML = "";
    return app;
}

/**
 * @param {HTMLElement} app 
 */
function add_school_select(app) {
    const block = document.createElement("p");

    const link = document.createElement("a");
    link.appendChild(document.createTextNode("학교 정보 설정하기"));
    link.setAttribute("href", "select.html");
    link.setAttribute("target", "_blank");
    link.setAttribute("style", "text-decoration: none; color: #141414; background-color: #FFCC4D;");

    block.appendChild(link);
    app.appendChild(block);
}

function fetch_today(edu, school) {
    fetch(`https://school.ch1ck.xyz/api/meal?edu=${edu}&school=${school}`)
        .then((resp) => resp.json())
        .then((json) => {
            const app = getApp();

            if(json.message != null) {
                app.innerText = json.message;
            } else {
                json.forEach((mealData) => {
                    const box = document.createElement("div");

                    const title = document.createElement("h3");
                    title.appendChild(document.createTextNode(mealData.code[1]));
                    box.appendChild(title);

                    const menus = document.createElement("ul")

                    mealData.menu.forEach((menu) => {
                        const item = document.createElement("li");
                        item.appendChild(document.createTextNode(menu.name));
                        item.setAttribute("style", "margin: 0");
                        box.appendChild(item);
                    });

                    box.setAttribute("style", "text-align: left");
                    box.appendChild(menus);
                    app.appendChild(box);
                });

            }

            add_school_select(app);
        })
        .catch(() => {
            app.innerText = "API 서버와의 통신에 실패했습니다.";
        });
}

browser.storage.local.get("school")
    .then((data) => {
        const school = data.school;

        fetch_today(
            school.edu,
            school.school
        );    
    })
    .catch(() => {
        const app = getApp();

        const alert = document.createElement("p");
        alert.appendChild(document.createTextNode("학교 정보가 설정되지 않았습니다!"));
        app.appendChild(alert);

        add_school_select(app);
    });
