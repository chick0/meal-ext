function render() {
    const school_name = document.getElementById("school");

    browser.storage.local.get("school")
        .then((data) => {
            const school = data.school;

            if(school.name.length == 0) {
                school_name.innerText = "없음";
            } else {
                school_name.innerText = school.name;
            }
        })
        .catch(() => {
            school_name.innerText = "설정된 학교가 없습니다!";
        });
};

function update_school(name, edu, school) {
    alert(`설정된 학교가 ${name}(으)로 변경되었습니다!`);

    browser.storage.local.set({
        school: {
            name,
            edu,
            school
        }
    });

    render();
};

function searchSchool(event) {
    event.preventDefault();

    const query = document.getElementById("searchBox").value.replace(" ", "");

    if(query.length == 0) {
        window.alert("설정된 검색어가 없습니다!");
        document.getElementById("searchBox").focus();
    } else {
        const host = "https://school.ch1ck.xyz";
        fetch(`${host}/api/school?school_name=${query}`)
            .then((resp) => resp.json())
            .then((json) => {
                const display = document.getElementById("display");
                display.innerHTML = "";

                json.forEach((meta) => {
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(meta.name));
                    li.setAttribute("style", "margin-bottom: 15px; cursor: pointer;");
                    li.setAttribute("data-n", meta.name);
                    li.setAttribute("data-e", meta.code.edu);
                    li.setAttribute("data-s", meta.code.school);

                    li.addEventListener("click", (ev) => {
                        const data = ev.target.dataset;

                        update_school(
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

document.getElementById("searchForm").addEventListener("submit", searchSchool);
render();
