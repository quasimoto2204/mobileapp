"use strict";

window.addEventListener("DOMContentLoaded", function () {
    if (typeof localStorage === "undefined") {
        Swal.fire({
            title: "Memo app",
            text: "このブラウザはlocal storage機能が実装されていません",
            type: "error",
            allowOutsideClick: false
        });
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        selectTable();
        delLocalStorage();
        allClearLocalStorage();
    }
}, false);

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click", function (e) {
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            Swal.fire({
                title: "Memo app",
                text: "Key,Memoはいずれも必須です",
                type: "error",
                allowOutsideClick: false
            });
            return;
        } else {
            let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存します。\nよろしいですか？";
            Swal.fire({
                title: "Memo app",
                text: w_msg,
                type: "question",
                showCancelButton: true,
                imageUrl:"C:\\Users\\s227025\\Desktop\\04_memo_fix\\img\\2.jpg",
                customClass: {
                    popup: 'custom-swal-popup',
                },
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに " + key + " " + value + " を保存しました";
                    Swal.fire({
                        title: "Memo app",
                        text: w_msg,
                        type: "success",
                        showCancelButton: false,
                        imageUrl:"C:\\Users\\s227025\\Desktop\\04_memo_fix\\img\\3.gif",
                customClass: {
                    popup: 'custom-swal-popup2',
                },
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    });
}

function viewStorage() {
    const list = document.getElementById("list");

    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td")

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";

    }
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBox("select");
    }, false);
}

function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app",
                text: "1つ選択してください。",
                type: "error"
            });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app",
                text: "1つ以上選択してください。",
                type: "error"
            });
        }
    }
}

//function delLocalStorage() {
// const del = document.getElementById("del");
// del.addEventListener("click", function (e) {
//     e.preventDefault();
//     const chkbox1 = document.getElementsByName("chkbox1");
//     const table1 = document.getElementById("table1");
//     let w_cnt = 0;
//     w_cnt = selectCheckBox("del");

//     if (w_cnt >= 1) {
//         Swal.fire({
//             title: "Memo app",
//             text: "LocalStorageから選択されている" + w_cnt + "件を削除しますか？",
//             type: "question",
//             showCancelButton: true
//         }).then(function (result) {
//             if (result.value === true) {
//                 for (let i = 0; i < chkbox1.length; i++) {
//                     if (chkbox1[i].checked) {
//                         localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
//                     }
//                 }

//                 viewStorage();
//                 let w_msg = "LocalStorageから " + w_cnt + " 件を削除しました";
//                 Swal.fire({
//                     title: "Memo app",
//                     text: w_msg,
//                     type: "success",
//                     showCancelButton: false
//                 });
//                 document.getElementById("textKey").value = "";
//                 document.getElementById("textMemo").value = "";
//             }
//         });
//     }
// }, false);


//}
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click", function (e) {
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt = 0;
        w_cnt = selectCheckBox("del");

        if (w_cnt >= 1) {
            Swal.fire({
                title: "Memo app",
                text: "LocalStorageから選択されている" + w_cnt + "件を削除しますか？",
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) {
                            const keyToRemove = table1.rows[i + 1].cells[1].firstChild.data;
                            localStorage.removeItem(keyToRemove);
                        }
                    }

                    viewStorage();
                    let w_msg = "LocalStorageから " + w_cnt + " 件を削除しました";
                    Swal.fire({
                        title: "Memo app",
                        text: w_msg,
                        type: "success",
                        showCancelButton: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);



    const table1 = document.getElementById("table1");

    table1.addEventListener("click", function (e) {
        if (e.target.classList.contains("trash")) {
            e.preventDefault();

            const tr = e.target.parentNode.parentNode;
            const keyToRemove = tr.getElementsByTagName('td')[1].innerHTML;
            const memoToRemove = tr.getElementsByTagName('td')[2].innerHTML;

            Swal.fire({
                title: "Memo app",
                text: "LocalStorageから選択されている:\n「" + keyToRemove + " " + memoToRemove + "」\n削除(delete)しますか？",
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.removeItem(keyToRemove);
                    tr.parentNode.removeChild(tr);
                    let w_msg = "LocalStorageから 「" + keyToRemove + " " + memoToRemove + "」\nを削除(delete)しました!";
                    Swal.fire({
                        title: "Memo app",
                        text: w_msg,
                        type: "success",
                        showCancelButton: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);

}

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click", function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Memo app",
            text: "LocalStorageのデータをすべて削除します。よろしいでしょうか",
            type: "question",
            showCancelButton: true
        }).then(function (result) {
            if (result.value === true) {
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除(ALL CLEAR)しました";
                Swal.fire({
                    title: "Memo app",
                    text: w_msg,
                    type: "success",
                    showCancelButton: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    }, false);
}
