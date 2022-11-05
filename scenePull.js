let players = game.users.filter(u => u.data.role < 3 && u.active).map(u =>
    `<input type="checkbox" id="${u.id}" name="player" value="${u.id}">
    <label for="${u.id}" style="font-size: 120%;">${u.data.name}</label><br>`
).join(``);
let scenes = game.scenes.contents.filter(u => u.data.active || u.data.navigation).map(u => `<option value=${u.id}> ${u.data.name} </option>`).join(``);

var button_OK = {
    icon: '<i class="fas fa-check"></i>',
    label: `<center>OK`,
    callback: () => confirmed = true
};

var button_cancel = {
    icon: '<i class="fas fa-times"></i>',
    label: '<center>Cancel',
    callback: () => confirmed = false
};

var buttons = {
    "OK": button_OK,
    "cancel": button_cancel
};

let dialogContentPrefix = `
<div><h1><center>Choose a scene along with players to move:</center></h1><div>`

let dialogContentSuffix = `
<br>Scene: <select name="scene">${scenes}</select></div>
<br>
`

let dialogContent = dialogContentPrefix + players + dialogContentSuffix;

let e = new Dialog({
    title: 'Pull to Scene',
    content: dialogContent,
    buttons: buttons,
    default: "cancel",
    close: html => {
        if (confirmed) {
            let players = html.find("[name=player]");
            let scene = html.find("[name=scene]")[0].value;
            for (p in players) {
                if (players[p].checked) {
                    game.socket.emit("pullToScene", scene, players[p].value);
                }
            }
        }
    }
}).render(true);
