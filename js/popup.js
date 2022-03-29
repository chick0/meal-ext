const getApp = () => {
    const app = document.getElementById("app");
    app.innerHTML = "";

    return app;
};

const fetchTodayMeal = (edu, school) => {
    const host = "https://school.ch1ck.xyz";
    fetch(`${host}/api/meal?edu=${edu}&school=${school}`).then((resp) => {
        return resp.json();
    }).then((apiResponse) => {
        const app = getApp();

        apiResponse.forEach((mealData) => {
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
            box.appendChild(menus);
            app.appendChild(box);
        });

        if(app.childNodes.length == 0){
            app.innerText = "오늘의 점심 메뉴가 없습니다!";
        } else {
            const link = document.createElement("a");
            link.appendChild(document.createTextNode("학교 정보 설정하기"));
            link.setAttribute("href", "select.html");
            link.setAttribute("target", "_blank");
            link.setAttribute("style", "text-decoration: none; color: #141414; background-color: #FFCC4D;");

            app.appendChild(link);
            app.setAttribute("style", "text-align: left;");
        }
    }).catch(() => {
        app.innerText = "오늘의 점심 메뉴가 없습니다!";
    });
};

const main = () => {
    browser.storage.local.get("school")
        .then((school) => {
            return school.school;
        })
        .then((school) => {
            fetchTodayMeal(
                school.edu,
                school.school
            );    
        }).catch(() => {
            const app = getApp();

            const alert = document.createElement("p");
            alert.appendChild(document.createTextNode("학교 정보가 설정되지 않았습니다!"));
            app.appendChild(alert);
        
            const link = document.createElement("a");
            link.appendChild(document.createTextNode("학교 정보 설정하기"));
            link.setAttribute("href", "select.html");
            link.setAttribute("target", "_blank");
            link.setAttribute("style", "text-decoration: none; color: #141414; background-color: #FFCC4D;");
            app.appendChild(link);
        
        });
};

// call main
main();
