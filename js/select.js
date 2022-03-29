const render = () => {
    browser.storage.local.get("school")
        .then((school) => {
            return school.school;
        })
        .then((school) => {
            let name = school.name;
            if(name.length == 0){
                name = "없음";
            }

            document.getElementById("school").innerText = name;
        }).catch(() => {
            document.getElementById("school").innerText = "설정된 학교가 없습니다!";
        });
};

const updateSchool = (name, edu, school) => {
    alert(`학교 정보가 변경되었습니다!`);
    browser.storage.local.set({
        school: {
            name,
            edu,
            school
        }
    });

    render();
};

const searchSchool = (e) => {
    e.preventDefault();

    const query = document.getElementById("searchBox").value.replace(" ", "");

    if(query.length == 0) {
        window.alert("설정된 검색어가 없습니다!");
        document.getElementById("searchBox").focus();
    } else {
        const host = "https://school.ch1ck.xyz";
        fetch(`${host}/api/school?school_name=${query}`).then((resp) => {
            return resp.json();
        }).then((apiResponse) => {
            const display = document.getElementById("display");
            display.innerHTML = "";

            apiResponse.forEach((meta) => {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(meta.name));
                li.setAttribute("style", "margin-bottom: 15px");
                li.setAttribute("data-n", meta.name);
                li.setAttribute("data-e", meta.code.edu);
                li.setAttribute("data-s", meta.code.school);

                li.addEventListener("click", (ev) => {
                    const data = ev.target.dataset;
                    updateSchool(
                        data.n,
                        data.e,
                        data.s,
                    );
                });

                display.appendChild(li);
            });
        });
    }
};

const init = () => {
    document.getElementById("searchForm").addEventListener("submit", searchSchool);
    render();
}; init();
