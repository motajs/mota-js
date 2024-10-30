
/*
actions.js: Handling of user interaction events
Keyboard, mouse, touch screen event related
 */

"use strict";

function actions () {
    this._init();
    this._HX_ = core._HALF_WIDTH_;
    this._HY_ = core._HALF_HEIGHT_;
    this._out = function (x) { return x < this._HX_ - 2 || this._HX_ + 2 < x; };
    this.LAST = core._WIDTH_ - 1;
}

actions.prototype._init = function () {
    this.actionsdata = functions_d6ad677b_427a_4623_b50f_a445a3b0ef8a.actions;
    this.actions = {};
    // --- onkeyDown注册
    this.registerAction('onkeyDown', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('onkeyDown', '_sys_onkeyDown', this._sys_onkeyDown, 0);
    // --- onkeyUp注册
    this.registerAction('onkeyUp', '_sys_onkeyUp_replay', this._sys_onkeyUp_replay, 100);
    this.registerAction('onkeyUp', '_sys_onkeyUp', this._sys_onkeyUp, 0);
    // --- pressKey注册
    this.registerAction('pressKey', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('pressKey', '_sys_pressKey', this._sys_pressKey, 0);
    // --- keyDown注册
    this.registerAction('keyDown', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('keyDown', '_sys_keyDown_lockControl', this._sys_keyDown_lockControl, 50);
    this.registerAction('keyDown', '_sys_keyDown', this._sys_keyDown, 0);
    // --- keyUp注册
    this.registerAction('keyUp', '_sys_keyUp_replay', this._sys_keyUp_replay, 100);
    this.registerAction('keyUp', '_sys_keyUp_lockControl', this._sys_keyUp_lockControl, 50);
    this.registerAction('keyUp', '_sys_keyUp', this._sys_keyUp, 0);
    // --- ondown注册
    this.registerAction('ondown', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('ondown', '_sys_ondown_lockControl', this._sys_ondown_lockControl, 30);
    this.registerAction('ondown', '_sys_ondown', this._sys_ondown, 0);
    // --- onmove注册
    this.registerAction('onmove', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('onmove', '_sys_onmove_choices', this._sys_onmove_choices, 30);
    this.registerAction('onmove', '_sys_onmove', this._sys_onmove, 0);
    // --- onup注册
    this.registerAction('onup', '_sys_checkReplay', this._sys_checkReplay, 100);
    this.registerAction('onup', '_sys_onup', this._sys_onup, 0);
    // --- onclick已废弃，将视为ondown
    // --- onmousewheel注册
    this.registerAction('onmousewheel', '_sys_onmousewheel', this._sys_onmousewheel, 0);
    // --- keyDownCtrl注册
    this.registerAction('keyDownCtrl', '_sys_keyDownCtrl', this._sys_keyDownCtrl, 0);
    // --- longClick注册
    this.registerAction('longClick', '_sys_longClick_lockControl', this._sys_longClick_lockControl, 50);
    // --- onStatusBarClick注册
    this.registerAction('onStatusBarClick', '_sys_onStatusBarClick', this._sys_onStatusBarClick, 0);

}

//////  注册一个用户交互行为 //////
/*
 * This function will register a user interaction behavior.
 * action: The type of interaction to register, such as ondown, onup, keyDown etc.
 * name: Your custom name, which can be used after cancellation. If the same name is registered repeatedly, the latter will overwrite the former.
 * func: Execute function.
 * priority: Priority; the one with the highest priority will be executed. This item can be left blank, and the default value is0.
 * Returns: Iffuncreturntrue, other interactive functions will not be executed; otherwise, other interactive functions will continue to be executed.
 */
actions.prototype.registerAction = function (action, name, func, priority) {
    if (!name || !func)
        return;
    // 将onclick视为ondown处理
    if (action == 'onclick') action = 'ondown';
    priority = priority || 0;
    if (!this.actions[action]) {
        this.actions[action] = [];
    }
    this.unregisterAction(action, name);
    this.actions[action].push(
        { "action": action, "name": name, "func": func, "priority": priority }
    );
    this.actions[action] = this.actions[action].sort(function (a, b) {
        return b.priority - a.priority;
    });
}

////// 注销一个用户交互行为 //////
actions.prototype.unregisterAction = function (action, name) {
    // 将onclick视为ondown处理
    if (action == 'onclick') action = 'ondown';
    if (!this.actions[action]) return;
    this.actions[action] = this.actions[action].filter(function (x) {
        return x.name != name;
    });
}

////// 执行一个用户交互行为 //////
actions.prototype.doRegisteredAction = function (action) {
    var actions = this.actions[action];
    if (!actions) return false;
    for (var i = 0; i < actions.length; ++i) {
        try {
            if (core.doFunc.apply(core, [actions[i].func, this].concat(Array.prototype.slice.call(arguments, 1))))
                return true;
        }
        catch (e) {
            console.error(e);
            console.error("ERROR in actions[" + actions[i].name + "].");
        }
    }
    return false;
}

actions.prototype._checkReplaying = function () {
    if (core.isReplaying() &&
        ['save', 'book', 'book-detail', 'viewMaps', 'toolbox', 'equipbox', 'text'].indexOf(core.status.event.id) < 0)
        return true;
    return false;
}

////// 检查是否在录像播放中，如果是，则停止交互
actions.prototype._sys_checkReplay = function () {
    if (this._checkReplaying()) return true;
}

////// 检查左手模式
actions.prototype.__checkLeftHandPrefer = function (e) {
    if (!core.flags.leftHandPrefer) return e;
    var map = {
        87: 38, // W -> up 
        83: 40, // S -> down
        65: 37, // A -> left
        68: 39, // D -> right
        73: 87, // I -> W
        74: 65, // J -> A
        75: 83, // K -> S
        76: 68, // L -> D
    }
    var newEvent = {};
    for (var one in e) {
        if (!(e[one] instanceof Function)) {
            newEvent[one] = e[one];
        }
    };
    ["stopPropagation", "stopImmediatePropagation", "preventDefault"].forEach(function (one) {
        newEvent[one] = function () {
            return e[one]();
        }
    });
    newEvent.keyCode = map[e.keyCode] || e.keyCode;
    return newEvent;
}

////// 按下某个键时 //////
actions.prototype.onkeyDown = function (e) {
    this.doRegisteredAction('onkeyDown', this.__checkLeftHandPrefer(e));
}

actions.prototype._sys_onkeyDown = function (e) {
    core.status.holdingKeys = core.status.holdingKeys || []
    var isArrow = { 37: true, 38: true, 39: true, 40: true }[e.keyCode]
    if (isArrow && !core.status.lockControl) {
        for (var ii = 0; ii < core.status.holdingKeys.length; ii++) {
            if (core.status.holdingKeys[ii] === e.keyCode) {
                return;
            }
        }
        if (e.preventDefault) e.preventDefault();
        core.status.holdingKeys.push(e.keyCode);
        this.pressKey(e.keyCode);
    } else {
        if (e.keyCode == 17) core.status.ctrlDown = true;
        this.keyDown(e.keyCode);
    }
}

////// 放开某个键时 //////
actions.prototype.onkeyUp = function (e) {
    this.doRegisteredAction('onkeyUp', this.__checkLeftHandPrefer(e));
}

actions.prototype._sys_onkeyUp_replay = function (e) {
    if (this._checkReplaying()) {
        if (e.keyCode == 27) // ESCAPE
            core.stopReplay();
        else if (e.keyCode == 90) // Z
            core.speedDownReplay();
        else if (e.keyCode == 67) // C
            core.speedUpReplay();
        else if (e.keyCode == 32) // SPACE
            core.triggerReplay();
        else if (e.keyCode == 65) // A
            core.rewindReplay();
        else if (e.keyCode == 83) // S
            core.control._replay_SL();
        else if (e.keyCode == 88) // X
            core.control._replay_book();
        else if (e.keyCode == 33 || e.keyCode == 34) // PgUp/PgDn
            core.control._replay_viewMap();
        else if (e.keyCode == 78) // N
            core.stepReplay();
        else if (e.keyCode == 84) // T
            core.control._replay_toolbox();
        else if (e.keyCode == 81) // Q
            core.control._replay_equipbox();
        else if (e.keyCode == 66) // B
            core.ui._drawStatistics();
        else if (e.keyCode >= 49 && e.keyCode <= 51) // 1-3
            core.setReplaySpeed(e.keyCode - 48);
        else if (e.keyCode == 52) // 4
            core.setReplaySpeed(6);
        else if (e.keyCode == 53) // 5
            core.setReplaySpeed(12);
        else if (e.keyCode == 54) // 6
            core.setReplaySpeed(24);
        return true;
    }
}

actions.prototype._sys_onkeyUp = function (e) {
    var isArrow = { 37: true, 38: true, 39: true, 40: true }[e.keyCode]
    if (isArrow && !core.status.lockControl) {
        for (var ii = 0; ii < core.status.holdingKeys.length; ii++) {
            if (core.status.holdingKeys[ii] === e.keyCode) {
                core.status.holdingKeys = core.status.holdingKeys.slice(0, ii).concat(core.status.holdingKeys.slice(ii + 1));
                if (ii === core.status.holdingKeys.length && core.status.holdingKeys.length !== 0) core.pressKey(core.status.holdingKeys.slice(-1)[0]);
                break;
            }
        }
        if (e.preventDefault) e.preventDefault();
        this.keyUp(e.keyCode, e.altKey);
    } else {
        if (e.keyCode == 17) core.status.ctrlDown = false;
        this.keyUp(e.keyCode, e.altKey);
    }
}

////// 按住某个键时 //////
actions.prototype.pressKey = function (keyCode) {
    this.doRegisteredAction('pressKey', keyCode);
}

actions.prototype._sys_pressKey = function (keyCode) {
    if (keyCode === core.status.holdingKeys.slice(-1)[0]) {
        this.keyDown(keyCode);
        window.setTimeout(function () {
            core.pressKey(keyCode);
        }, 30);
    }
}

////// 根据按下键的code来执行一系列操作 //////
actions.prototype.keyDown = function (keyCode) {
    this.doRegisteredAction('keyDown', keyCode);
}

actions.prototype._sys_keyDown_lockControl = function (keyCode) {
    if (!core.status.lockControl) return false;
    // Ctrl跳过对话
    if (keyCode == 17) {
        this.keyDownCtrl();
        return true;
    }
    switch (core.status.event.id) {
        case 'action':
            this._keyDownAction(keyCode);
            break;
        case 'book':
            this._keyDownBook(keyCode);
            break;
        case 'fly':
            this._keyDownFly(keyCode);
            break;
        case 'viewMaps':
            this._keyDownViewMaps(keyCode);
            break;
        case 'equipbox':
            this._keyDownEquipbox(keyCode);
            break;
        case 'toolbox':
            this._keyDownToolbox(keyCode);
            break;
        case 'save':
        case 'load':
        case 'replayLoad':
        case 'replayRemain':
        case 'replaySince':
            this._keyDownSL(keyCode);
            break;
        case 'selectShop':
        case 'switchs':
        case 'switchs-sounds':
        case 'switchs-display':
        case 'switchs-action':
        case 'notes':
        case 'settings':
        case 'syncSave':
        case 'syncSelect':
        case 'localSaveSelect':
        case 'storageRemove':
        case 'replay':
        case 'gameInfo':
            this._keyDownChoices(keyCode);
            break;
        case 'cursor':
            this._keyDownCursor(keyCode);
            break;
    }
    return true;
}

actions.prototype._sys_keyDown = function (keyCode) {
    if (!core.status.played)
        return true;
    switch (keyCode) {
        case 37:
            core.moveHero('left');
            break;
        case 38:
            core.moveHero('up');
            break;
        case 39:
            core.moveHero('right');
            break;
        case 40:
            core.moveHero('down');
            break;
    }
    return true;
}

////// 根据放开键的code来执行一系列操作 //////
actions.prototype.keyUp = function (keyCode, altKey, fromReplay) {
    this.doRegisteredAction('keyUp', keyCode, altKey, fromReplay);
}

actions.prototype._sys_keyUp_replay = function (keyCode, altKey, fromReplay) {
    if (!fromReplay && this._checkReplaying()) return true;
}

actions.prototype._sys_keyUp_lockControl = function (keyCode, altKey) {
    if (!core.status.lockControl) return false;

    var ok = function () {
        return keyCode == 27 || keyCode == 88 || keyCode == 13 || keyCode == 32 || keyCode == 67;
    }

    core.status.holdingKeys = [];
    switch (core.status.event.id) {
        case 'text':
            ok() && core.drawText();
            break;
        case 'confirmBox':
            this._keyUpConfirmBox(keyCode);
            break;
        case 'action':
            this._keyUpAction(keyCode);
            break;
        case 'about':
            ok() && core.closePanel();
            break;
        case 'help':
            ok() && core.closePanel();
            break;
        case 'book':
            this._keyUpBook(keyCode);
            break;
        case 'book-detail':
            ok() && this._clickBookDetail();
            break;
        case 'fly':
            this._keyUpFly(keyCode);
            break;
        case 'viewMaps':
            this._keyUpViewMaps(keyCode);
            break;
        case 'selectShop':
            this._keyUpQuickShop(keyCode);
            break;
        case 'toolbox':
            this._keyUpToolbox(keyCode);
            break;
        case 'equipbox':
            this._keyUpEquipbox(keyCode, altKey);
            break;
        case 'save':
        case 'load':
        case 'replayLoad':
        case 'replayRemain':
        case 'replaySince':
            this._keyUpSL(keyCode);
            break;
        case 'keyBoard':
            ok() && core.closePanel();
            break;
        case 'switchs':
            this._keyUpSwitchs(keyCode);
            break;
        case 'switchs-sounds':
            this._keyUpSwitchs_sounds(keyCode);
            break;
        case 'switchs-display':
            this._keyUpSwitchs_display(keyCode);
            break;
        case 'switchs-action':
            this._keyUpSwitchs_action(keyCode);
            break;
        case 'settings':
            this._keyUpSettings(keyCode);
            break;
        case 'notes':
            this._keyUpNotes(keyCode);
            break;
        case 'syncSave':
            this._keyUpSyncSave(keyCode);
            break;
        case 'syncSelect':
            this._keyUpSyncSelect(keyCode);
            break;
        case 'localSaveSelect':
            this._keyUpLocalSaveSelect(keyCode);
            break;
        case 'storageRemove':
            this._keyUpStorageRemove(keyCode);
            break;
        case 'cursor':
            this._keyUpCursor(keyCode);
            break;
        case 'replay':
            this._keyUpReplay(keyCode);
            break;
        case 'gameInfo':
            this._keyUpGameInfo(keyCode);
            break;
        case 'centerFly':
            this._keyUpCenterFly(keyCode);
            break;
    }
    return true;
}

actions.prototype._sys_keyUp = function (keyCode, altKey) {
    if (!core.status.played)
        return true;
    this.actionsdata.onKeyUp(keyCode, altKey);
    if (core.status.automaticRoute && core.status.automaticRoute.autoHeroMove) {
        core.stopAutomaticRoute();
    }
    core.status.heroStop = true;
    return true;
}

////// 点击（触摸）事件按下时 //////
actions.prototype.ondown = function (loc) {
    var x = parseInt(loc.x / loc.size), y = parseInt(loc.y / loc.size);
    var px = parseInt(loc.x / core.domStyle.scale), py = parseInt(loc.y / core.domStyle.scale);
    this.doRegisteredAction('ondown', x, y, px, py);
}

actions.prototype._sys_ondown_lockControl = function (x, y, px, py) {
    if (core.status.played && !core.status.lockControl) return false;

    switch (core.status.event.id) {
        case 'centerFly':
            this._clickCenterFly(x, y, px, py);
            break;
        case 'book':
            this._clickBook(x, y, px, py);
            break;
        case 'book-detail':
            this._clickBookDetail(x, y, px, py);
            break;
        case 'fly':
            this._clickFly(x, y, px, py);
            break;
        case 'viewMaps':
            this._clickViewMaps(x, y, px, py);
            break;
        case 'switchs':
            this._clickSwitchs(x, y, px, py);
            break;
        case 'switchs-sounds':
            this._clickSwitchs_sounds(x, y, px, py);
            break;
        case 'switchs-display':
            this._clickSwitchs_display(x, y, px, py);
            break;
        case 'switchs-action':
            this._clickSwitchs_action(x, y, px, py);
            break;
        case 'settings':
            this._clickSettings(x, y, px, py);
            break;
        case 'selectShop':
            this._clickQuickShop(x, y, px, py);
            break;
        case 'equipbox':
            this._clickEquipbox(x, y, px, py);
            break;
        case 'toolbox':
            this._clickToolbox(x, y, px, py);
            break;
        case 'save':
        case 'load':
        case 'replayLoad':
        case 'replayRemain':
        case 'replaySince':
            this._clickSL(x, y, px, py);
            break;
        case 'confirmBox':
            this._clickConfirmBox(x, y, px, py);
            break;
        case 'keyBoard':
            this._clickKeyBoard(x, y, px, py);
            break;
        case 'action':
            this._clickAction(x, y, px, py);
            break;
        case 'text':
            core.drawText();
            break;
        case 'notes':
            this._clickNotes(x, y, px, py);
            break;
        case 'syncSave':
            this._clickSyncSave(x, y, px, py);
            break;
        case 'syncSelect':
            this._clickSyncSelect(x, y, px, py);
            break;
        case 'localSaveSelect':
            this._clickLocalSaveSelect(x, y, px, py);
            break;
        case 'storageRemove':
            this._clickStorageRemove(x, y, px, py);
            break;
        case 'cursor':
            this._clickCursor(x, y, px, py);
            break;
        case 'replay':
            this._clickReplay(x, y, px, py);
            break;
        case 'gameInfo':
            this._clickGameInfo(x, y, px, py);
            break;
        case 'about':
        case 'help':
            core.ui.closePanel();
            break;
    }

    // --- 长按判定
    if (core.timeout.onDownTimeout == null) {
        core.timeout.onDownTimeout = setTimeout(function () {
            if (core.interval.onDownInterval == null) {
                core.interval.onDownInterval = setInterval(function () {
                    if (!core.actions.longClick(x, y, px, py)) {
                        clearInterval(core.interval.onDownInterval);
                        core.interval.onDownInterval = null;
                    }
                }, 40)
            }
        }, 500);
    }
    return true;
}

actions.prototype._sys_ondown = function (x, y, px, py) {
    if (core.status.lockControl) return false;
    core.status.downTime = new Date();
    core.deleteCanvas('route');
    var pos = { 'x': parseInt((px + core.bigmap.offsetX) / 32), 'y': parseInt((py + core.bigmap.offsetY) / 32) };
    core.status.stepPostfix = [];
    core.status.stepPostfix.push(pos);
    core.fillRect('ui', pos.x * 32 + 12 - core.bigmap.offsetX, pos.y * 32 + 12 - core.bigmap.offsetY, 8, 8, '#bfbfbf');

    clearTimeout(core.timeout.onDownTimeout);
    core.timeout.onDownTimeout = null;
    core.status.preview.prepareDragging = false;
    if (!core.hasFlag('__lockViewport__') && (core.status.thisMap.width > core._WIDTH_ || core.status.thisMap.height > core._HEIGHT_)) {
        core.status.preview.prepareDragging = true;
        core.status.preview.px = px;
        core.status.preview.py = py;
        core.timeout.onDownTimeout = setTimeout(function () {
            core.clearMap('ui');
            core.status.preview.prepareDragging = false;
            core.status.preview.enabled = true;
            core.status.preview.dragging = true;
            core.drawTip('Entered preview mode, can directly drag the large map');
            core.status.stepPostfix = [];
        }, 500);
    }
}

////// 当在触摸屏上滑动时 //////
actions.prototype.onmove = function (loc) {
    var x = parseInt(loc.x / loc.size), y = parseInt(loc.y / loc.size);
    var px = parseInt(loc.x / core.domStyle.scale), py = parseInt(loc.y / core.domStyle.scale);
    this.doRegisteredAction('onmove', x, y, px, py);
}

actions.prototype._sys_onmove_choices = function (x, y, px, py) {
    if (!core.status.lockControl) return false;

    switch (core.status.event.id) {
        case 'action':
            if (core.status.event.data.type == 'choices') {
                this._onMoveChoices(x, y);
                return true;
            }
            if (core.status.event.data.type == 'confirm') {
                this._onMoveConfirmBox(x, y, px, py);
                return true;
            }
            break;
        case 'selectShop':
        case 'switchs':
        case 'switchs-sounds':
        case 'switchs-display':
        case 'switchs-action':
        case 'notes':
        case 'settings':
        case 'syncSave':
        case 'syncSelect':
        case 'localSaveSelect':
        case 'storageRemove':
        case 'replay':
        case 'gameInfo':
            this._onMoveChoices(x, y);
            return true;
        case 'confirmBox':
            this._onMoveConfirmBox(x, y, px, py);
            return true;
        default:
            break;
    }
    return false;
}

actions.prototype._sys_onmove = function (x, y, px, py) {
    if (core.status.lockControl) return false;

    if (core.status.preview.dragging) {
        core.setViewport(core.bigmap.offsetX - px + core.status.preview.px, core.bigmap.offsetY - py + core.status.preview.py);
        core.status.preview.px = px;
        core.status.preview.py = py;
        return true;
    }
    if (core.status.preview.prepareDragging) {
        if (Math.abs(px - core.status.preview.px) <= 20 && Math.abs(py - core.status.preview.py) <= 20)
            return true;
        else core.status.preview.prepareDragging = false;
    }

    clearTimeout(core.timeout.onDownTimeout);
    core.timeout.onDownTimeout = null;

    if ((core.status.stepPostfix || []).length > 0) {
        var pos = { 'x': parseInt((px + core.bigmap.offsetX) / 32), 'y': parseInt((py + core.bigmap.offsetY) / 32) };
        var pos0 = core.status.stepPostfix[core.status.stepPostfix.length - 1];
        var directionDistance = [pos.y - pos0.y, pos0.x - pos.x, pos0.y - pos.y, pos.x - pos0.x];
        var max = 0, index = 4;
        for (var ii = 0; ii < 4; ii++) {
            if (directionDistance[ii] > max) {
                index = ii;
                max = directionDistance[ii];
            }
        }
        pos = [{ 'x': 0, 'y': 1 }, { 'x': -1, 'y': 0 }, { 'x': 0, 'y': -1 }, { 'x': 1, 'y': 0 }, false][index]
        if (pos) {
            pos.x += pos0.x;
            pos.y += pos0.y;
            core.status.stepPostfix.push(pos);
            core.fillRect('ui', pos.x * 32 + 12 - core.bigmap.offsetX, pos.y * 32 + 12 - core.bigmap.offsetY, 8, 8, '#bfbfbf');
        }
    }
    return true;
}

////// 当点击（触摸）事件放开时 //////
actions.prototype.onup = function (loc) {
    var x = parseInt(loc.x / loc.size), y = parseInt(loc.y / loc.size);
    var px = parseInt(loc.x / core.domStyle.scale), py = parseInt(loc.y / core.domStyle.scale);
    this.doRegisteredAction('onup', x, y, px, py);
}

actions.prototype._sys_onup = function (x, y, px, py) {
    clearTimeout(core.timeout.onDownTimeout);
    core.timeout.onDownTimeout = null;
    clearInterval(core.interval.onDownInterval);
    core.interval.onDownInterval = null;

    if (core.isPlaying()) {
        core.status.preview.prepareDragging = false;
        if (core.status.preview.dragging) {
            core.status.preview.dragging = false;
            return true;
        }
    }

    if ((core.status.stepPostfix || []).length == 0) return false;

    var stepPostfix = [];
    var direction = { '0': { '1': 'down', '-1': 'up' }, '-1': { '0': 'left' }, '1': { '0': 'right' } };
    for (var ii = 1; ii < core.status.stepPostfix.length; ii++) {
        var pos0 = core.status.stepPostfix[ii - 1];
        var pos = core.status.stepPostfix[ii];
        stepPostfix.push({
            'direction': direction[pos.x - pos0.x][pos.y - pos0.y],
            'x': pos.x,
            'y': pos.y
        });
    }
    var posx = core.status.stepPostfix[0].x;
    var posy = core.status.stepPostfix[0].y;
    core.status.stepPostfix = [];
    if (!core.status.lockControl) {
        core.clearMap('ui');
    }

    // 长按
    if (!core.status.lockControl && stepPostfix.length == 0 && core.status.downTime != null && new Date() - core.status.downTime >= 1000) {
        core.actions.longClick(x, y, px, py);
    }
    else {
        //posx,posy是寻路的目标点,stepPostfix是后续的移动
        core.setAutomaticRoute(posx, posy, stepPostfix);
    }
    core.status.downTime = null;
    return true;
}

////// 获得点击事件相对左上角的坐标 //////
actions.prototype._getClickLoc = function (x, y) {

    var statusBar = { 'x': 0, 'y': 0 };
    var size = 32;
    size = size * core.domStyle.scale;

    if (core.domStyle.isVertical) {
        statusBar.x = 3;
        statusBar.y = core.dom.statusBar.offsetHeight + 3;
    }
    else {
        statusBar.x = core.dom.statusBar.offsetWidth + 3;
        statusBar.y = 3;
    }

    var left = core.dom.gameGroup.offsetLeft + statusBar.x;
    var top = core.dom.gameGroup.offsetTop + statusBar.y;
    var loc = { 'x': Math.max(x - left), 'y': Math.max(y - top, 0), 'size': size };
    return loc;
}


////// 滑动鼠标滚轮时的操作 //////
actions.prototype.onmousewheel = function (direct) {
    this.doRegisteredAction('onmousewheel', direct);
}

actions.prototype._sys_onmousewheel = function (direct) {
    // 向下滚动是 -1 ,向上是 1

    if (this._checkReplaying()) {
        // 滚轮控制速度
        if (direct == 1) core.speedUpReplay();
        if (direct == -1) core.speedDownReplay();
        return;
    }

    // 楼层飞行器
    if (core.status.lockControl && core.status.event.id == 'fly') {
        if (direct == 1) core.ui.drawFly(this._getNextFlyFloor(1));
        if (direct == -1) core.ui.drawFly(this._getNextFlyFloor(-1));
        return;
    }

    // 怪物手册
    if (core.status.lockControl && core.status.event.id == 'book') {
        var pageinfo = core.ui._drawBook_pageinfo();
        if (direct == 1) core.ui.drawBook(core.status.event.data - pageinfo.per_page);
        if (direct == -1) core.ui.drawBook(core.status.event.data + pageinfo.per_page);
        return;
    }

    // 存读档
    if (core.status.lockControl && (core.status.event.id == 'save' || core.status.event.id == 'load')) {
        var index = core.status.event.data.page * 10 + core.status.event.data.offset;
        if (direct == 1) core.ui._drawSLPanel(index - 10);
        if (direct == -1) core.ui._drawSLPanel(index + 10);
        return;
    }

    // 浏览地图
    if (core.status.lockControl && core.status.event.id == 'viewMaps') {
        if (direct == 1) this._clickViewMaps(this._HX_, this._HY_ - 3, core._PX_ / 2, core._PY_ / 5 * 1.5);
        if (direct == -1) this._clickViewMaps(this._HX_, this._HY_ + 3, core._PX_ / 2, core._PY_ / 5 * 3.5);
        return;
    }

    // wait事件
    if (core.status.lockControl && core.status.event.id == 'action' && core.status.event.data.type == 'wait') {
        var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
        core.setFlag('type', 0);
        var keycode = direct == 1 ? 33 : 34;
        core.setFlag('keycode', keycode);
        core.setFlag('timeout', timeout);
        var executed = core.events.__action_wait_afterGet(core.status.event.data.current);
        if (executed || !core.status.event.data.current.forceChild) {
            core.status.route.push("input:" + (1e8 * timeout + keycode));
            clearTimeout(core.status.event.interval);
            delete core.status.event.timeout;
            core.doAction();
        }
        return;
    }

}

////// 长按Ctrl键时 //////
actions.prototype.keyDownCtrl = function () {
    this.doRegisteredAction('keyDownCtrl');
}

actions.prototype._sys_keyDownCtrl = function () {
    if (core.status.event.id == 'text') {
        core.drawText();
        return true;
    }
    if (core.status.event.id == 'action' && core.status.event.data.type == 'text') {
        core.doAction();
        return true;
    }
    if (core.status.event.id == 'action' && core.status.event.data.type == 'sleep'
        && !core.status.event.data.current.noSkip) {
        if (core.timeout.sleepTimeout && !core.hasAsync()) {
            clearTimeout(core.timeout.sleepTimeout);
            core.timeout.sleepTimeout = null;
            core.doAction();
        }
        return true;
    }
}

////// 长按 //////
actions.prototype.longClick = function (x, y, px, py) {
    if (!core.isPlaying()) return false;
    return this.doRegisteredAction('longClick', x, y, px, py);
}

actions.prototype._sys_longClick_lockControl = function (x, y, px, py) {
    if (!core.status.lockControl) return false;
    if (core.status.event.id == 'text') {
        core.drawText();
        return true;
    }
    if (core.status.event.id == 'action' && core.status.event.data.type == 'text') {
        core.doAction();
        return true;
    }
    // 长按楼传器的箭头可以快速翻页
    if (core.status.event.id == 'fly') {
        if ((x == core._WIDTH_ - 2 || x == core._WIDTH_ - 3) && (y == this._HY_ - 1 || y == this._HY_ + 3)) {
            this._clickFly(x, y);
            return true;
        }
    }
    // 长按SL上下页快速翻页
    if (["save", "load", "replayLoad", "replayRemain", "replaySince"].indexOf(core.status.event.id) >= 0) {
        if ([this._HX_ - 2, this._HX_ - 3, this._HX_ + 2, this._HX_ + 3].indexOf(x) >= 0 && y===core._HEIGHT_-1) {
            this._clickSL(x, y);
            return true;
        }
    }
    // 长按可以跳过等待事件
    if (core.status.event.id == 'action' && core.status.event.data.type == 'sleep'
        && !core.status.event.data.current.noSkip) {
        if (core.timeout.sleepTimeout && !core.hasAsync()) {
            clearTimeout(core.timeout.sleepTimeout);
            core.timeout.sleepTimeout = null;
            core.doAction();
            return true;
        }
    }
    return false;
}

actions.prototype.onStatusBarClick = function (e) {
    if (!core.isPlaying()) return false;
    var left = core.dom.gameGroup.offsetLeft + 3;
    var top = core.dom.gameGroup.offsetTop + 3;
    var px = parseInt((e.clientX - left) / core.domStyle.scale), py = parseInt((e.clientY - top) / core.domStyle.scale);
    return this.doRegisteredAction('onStatusBarClick', Math.max(px, 0), Math.max(py, 0));
}

actions.prototype._sys_onStatusBarClick = function (px, py, vertical) {
    if (this.actionsdata.onStatusBarClick)
        return this.actionsdata.onStatusBarClick(px, py, vertical);
}

/////////////////// 在某个界面时的按键点击效果 ///////////////////

actions.prototype._getChoicesTopIndex = function (length) {
    return this._HY_ - parseInt((length - 1) / 2) + (core.status.event.ui.offset || 0);
}

// 数字键快速选择选项
actions.prototype._selectChoices = function (length, keycode, callback) {
    var topIndex = this._getChoicesTopIndex(length);
    if (keycode == 13 || keycode == 32 || keycode == 67) {
        callback.apply(this, [this._HX_, topIndex + core.status.event.selection]);
    }

    if (keycode >= 49 && keycode <= 57) {
        var index = keycode - 49;
        if (index < length) {
            callback.apply(this, [this._HX_, topIndex + index]);
        }
    }
}

// 上下键调整选项
actions.prototype._keyDownChoices = function (keycode) {
    if (keycode == 38) {
        core.status.event.selection--;
        core.playSound('Cursor Movement');
        core.ui.drawChoices(core.status.event.ui.text, core.status.event.ui.choices, core.status.event.ui.width);
    }
    if (keycode == 40) {
        core.status.event.selection++;
        core.playSound('Cursor Movement');
        core.ui.drawChoices(core.status.event.ui.text, core.status.event.ui.choices, core.status.event.ui.width);
    }
}

// 移动光标
actions.prototype._onMoveChoices = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        if (selection == core.status.event.selection) return;
        core.status.event.selection = selection;
        core.playSound('Cursor Movement');
        core.ui.drawChoices(core.status.event.ui.text, core.status.event.ui.choices, core.status.event.ui.width);
    }
}

////// 点击中心对称飞行器时
actions.prototype._clickCenterFly = function (x, y) {
    var posX = core.status.event.data.posX, posY = core.status.event.data.posY;
    core.ui.closePanel();
    if (x == posX && y == posY) {
        if (core.canUseItem('centerFly')) {
            core.useItem('centerFly');
        }
        else {
            core.playSound('Operation failed');
            core.drawTip('Currently unavailable' + core.material.items['centerFly'].name, 'centerFly');
        }
    }
}

actions.prototype._keyUpCenterFly = function (keycode) {
    core.ui.closePanel();
    if (keycode == 51 || keycode == 13 || keycode == 32 || keycode == 67) {
        if (core.canUseItem('centerFly')) {
            core.useItem('centerFly');
        }
        else {
            core.playSound('Operation failed');
            core.drawTip('Currently unavailable' + core.material.items['centerFly'].name, 'centerFly');
        }
    }
}

////// 点击确认框时 //////
actions.prototype._clickConfirmBox = function (x, y, px, py) {
    if (px >= core._PX_ / 2 - 70 && px <= core._PX_ / 2 - 10
        && py >= core._PY_ / 2 && py <= core._PY_ / 2 + 64 && core.status.event.data.yes)
        core.status.event.data.yes();
    if (px >= core._PX_ / 2 + 10 && px <= core._PX_ / 2 + 70
        && py >= core._PY_ / 2 && py <= core._PY_ / 2 + 64 && core.status.event.data.no)
        core.status.event.data.no();
}

////// 键盘操作确认框时 //////
actions.prototype._keyUpConfirmBox = function (keycode) {
    if (keycode == 37 || keycode == 39) {
        core.status.event.selection = 1 - core.status.event.selection;
        core.playSound('Cursor Movement');
        core.ui.drawConfirmBox(core.status.event.ui, core.status.event.data.yes, core.status.event.data.no);
        return;
    }
    if (keycode == 13 || keycode == 32 || keycode == 67) {
        if (core.status.event.selection == 0 && core.status.event.data.yes) {
            // core.playSound('确定');
            core.status.event.selection = null;
            core.status.event.data.yes();
            return;
        }
        if (core.status.event.selection == 1 && core.status.event.data.no) {
            // core.playSound('确定');
            core.status.event.selection = null;
            core.status.event.data.no();
            return;
        }
    }
}

////// 鼠标在确认框上移动时 //////
actions.prototype._onMoveConfirmBox = function (x, y, px, py) {
    if (py >= core._PY_ / 2 && py <= core._PY_ / 2 + 64) {
        if (px >= core._PX_ / 2 - 70 && px <= core._PX_ / 2 - 10) {
            if (core.status.event.selection != 0) {
                core.status.event.selection = 0;
                core.playSound('Cursor Movement');
                if (core.status.event.id == 'action') {
                    core.ui.drawConfirmBox(core.status.event.ui.text);
                } else {
                    core.ui.drawConfirmBox(core.status.event.ui, core.status.event.data.yes, core.status.event.data.no);
                }
            }
            return;
        }
        if (px >= core._PX_ / 2 + 10 && px <= core._PX_ / 2 + 70) {
            if (core.status.event.selection != 1) {
                core.status.event.selection = 1;
                core.playSound('Cursor Movement');
                if (core.status.event.id == 'action') {
                    core.ui.drawConfirmBox(core.status.event.ui.text);
                } else {
                    core.ui.drawConfirmBox(core.status.event.ui, core.status.event.data.yes, core.status.event.data.no);
                }
            }
            return;
        }
    }
}

actions.prototype._clickAction_text = function () {
    // 正在淡入淡出的话不执行
    if (core.status.event.animateUI) return;

    var data = core.clone(core.status.event.data.current);
    if (typeof data == 'string') data = { "type": "text", "text": data };

    // 打字机效果显示全部文字
    if (core.status.event.interval != null) {
        data.showAll = true;
        core.insertAction(data);
        core.doAction();
        return;
    }

    if (!data.code) {
        core.ui._animateUI('hide', null, core.doAction);
    } else {
        // 不清除对话框
        core.doAction();
    }
}

////// 自定义事件时的点击操作 //////
actions.prototype._clickAction = function (x, y, px, py) {
    if (core.status.event.data.type == 'text') {
        return this._clickAction_text();
    }

    if (core.status.event.data.type == 'wait') {
        var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
        core.setFlag('type', 1);
        core.setFlag('x', x);
        core.setFlag('y', y);
        core.setFlag('px', px);
        core.setFlag('py', py);
        core.setFlag('timeout', timeout);
        var executed = core.events.__action_wait_afterGet(core.status.event.data.current);
        if (executed || !core.status.event.data.current.forceChild) {
            core.status.route.push("input:" + (1e8 * timeout + 1000000 + 1000 * px + py));
            clearTimeout(core.status.event.interval);
            delete core.status.event.timeout;
            core.doAction();
        }
        return;
    }

    if (core.status.event.data.type == 'choices') {
        // 选项
        var data = core.status.event.data.current;
        var choices = data.choices;
        if (choices.length == 0) return;
        if (this._out(x)) return;
            var topIndex = this._getChoicesTopIndex(choices.length);
            if (y >= topIndex && y < topIndex + choices.length) {
                var choice = choices[y - topIndex];
                if (choice.need != null && choice.need != '' && !core.calValue(choice.need)) {
                    core.playSound('Operation failed');
                    core.drawTip("This item cannot be selected");
                    return;
                }
                clearTimeout(core.status.event.interval);
                var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
                delete core.status.event.timeout;
                core.setFlag('timeout', timeout);
                // 对全局商店特殊处理
                var index = y - topIndex;
                if (index == choices.length - 1 && core.hasFlag('@temp@shop')) {
                    index = -1;
                }
                core.status.route.push("choices:" + (100 * timeout + index));
                core.insertAction(choice.action);
                core.doAction();
            }
        return;
    }

    if (core.status.event.data.type == 'confirm') {
        if ((x == this._HX_ - 2 || x == this._HX_ - 1) && y == this._HY_ + 1) {
            clearTimeout(core.status.event.interval);
            var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
            delete core.status.event.timeout;
            core.setFlag('timeout', timeout);
            core.status.route.push("choices:" + 100 * timeout);
            core.insertAction(core.status.event.ui.yes);
            core.doAction();
        }
        else if ((x == this._HX_ + 2 || x == this._HX_ + 1) && y == this._HY_ + 1) {
            clearTimeout(core.status.event.interval);
            var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
            delete core.status.event.timeout;
            core.setFlag('timeout', timeout);
            core.status.route.push("choices:" + (100 * timeout + 1));
            core.insertAction(core.status.event.ui.no);
            core.doAction();
        }
        return;
    }
}

////// 自定义事件时，按下某个键的操作 //////
actions.prototype._keyDownAction = function (keycode) {
    if (core.status.event.data.type == 'choices') {
        this._keyDownChoices(keycode);
        return;
    }
    if (core.status.event.data.type == 'confirm' && (keycode == 37 || keycode == 39)) {
        core.status.event.selection = 1 - core.status.event.selection;
        core.playSound('Cursor Movement');
        core.drawConfirmBox(core.status.event.ui.text);
        return;
    }
}

////// 自定义事件时，放开某个键的操作 //////
actions.prototype._keyUpAction = function (keycode) {
    if (core.status.event.data.type == 'text' && (keycode == 13 || keycode == 32 || keycode == 67)) {
        return this._clickAction_text();
    }
    if (core.status.event.data.type == 'wait') {
        var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
        core.setFlag('type', 0);
        core.setFlag('keycode', keycode);
        core.setFlag('timeout', timeout);
        var executed = core.events.__action_wait_afterGet(core.status.event.data.current);
        if (executed || !core.status.event.data.current.forceChild) {
            core.status.route.push("input:" + (1e8 * timeout + keycode));
            clearTimeout(core.status.event.interval);
            delete core.status.event.timeout;
            core.doAction();
        }
        return;
    }
    if (core.status.event.data.type == 'choices') {
        var data = core.status.event.data.current;
        var choices = data.choices;
        if (choices.length > 0) {
            this._selectChoices(choices.length, keycode, this._clickAction);
        }
        return;
    }
    if (core.status.event.data.type == 'confirm' && (keycode == 13 || keycode == 32 || keycode == 67)) {
        var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
        delete core.status.event.timeout;
        core.setFlag('timeout', timeout);
        core.status.route.push("choices:" + (100 * timeout + core.status.event.selection));
        if (core.status.event.selection == 0)
            core.insertAction(core.status.event.ui.yes);
        else core.insertAction(core.status.event.ui.no);
        core.doAction();
        return;
    }
}

////// 怪物手册界面的点击操作 //////
actions.prototype._clickBook = function (x, y) {
    var pageinfo = core.ui._drawBook_pageinfo();
    // 上一页
    if ((x == this._HX_ - 2 || x == this._HX_ - 3) && y===core._HEIGHT_-1) {
        core.playSound('Cursor Movement');
        core.ui.drawBook(core.status.event.data - pageinfo.per_page);
        return;
    }
    // 下一页
    if ((x == this._HX_ + 2 || x == this._HX_ + 3) && y===core._HEIGHT_-1) {
        core.playSound('Cursor Movement');
        core.ui.drawBook(core.status.event.data + pageinfo.per_page);
        return;
    }
    // 返回
    if (x >= this.LAST - 2 && y===core._HEIGHT_-1) {
        core.playSound('Cancel');
        if (core.events.recoverEvents(core.status.event.interval)) {
            return;
        }
        else if (core.status.event.ui != null) {
            core.status.boxAnimateObjs = [];
            core.ui._drawViewMaps(core.status.event.ui);
        }
        else core.ui.closePanel();
        return;
    }
    // 怪物信息
    var data = core.status.event.data;
    if (data != null && y < core._HEIGHT_-1) {
        var per_page = pageinfo.per_page, page = parseInt(data / per_page);
        var u = (core._HEIGHT_ - 1) / per_page;
        for (var i = 0; i < per_page; ++i) {
            if (y >= u * i && y < u * (i + 1)) {
                var index = per_page * page + i;
                core.ui.drawBook(index);
                core.ui._drawBookDetail(index);
                break;
            }
        }
        return;
    }
    return;
}

////// 怪物手册界面时，按下某个键的操作 //////
actions.prototype._keyDownBook = function (keycode) {
    var pageinfo = core.ui._drawBook_pageinfo();
    if (keycode == 37) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data - pageinfo.per_page); }
    if (keycode == 38) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data - 1); }
    if (keycode == 39) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data + pageinfo.per_page); }
    if (keycode == 40) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data + 1); }
    if (keycode == 33) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data - pageinfo.per_page); }
    if (keycode == 34) { core.playSound('Cursor Movement'); core.ui.drawBook(core.status.event.data + pageinfo.per_page); }
    return;
}

////// 怪物手册界面时，放开某个键的操作 //////
actions.prototype._keyUpBook = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        if (core.events.recoverEvents(core.status.event.interval)) {
            return;
        }
        else if (core.status.event.ui != null) {
            core.status.boxAnimateObjs = [];
            core.ui._drawViewMaps(core.status.event.ui);
        }
        else core.ui.closePanel();
        return;
    }
    if (keycode == 13 || keycode == 32 || keycode == 67) {
        var data = core.status.event.data;
        if (data != null) {
            core.ui._drawBookDetail(data);
        }
        return;
    }
}

////// 怪物手册属性显示界面时的点击操作 //////
actions.prototype._clickBookDetail = function () {
    core.clearMap('data');
    core.playSound('Cancel');
    core.status.event.id = 'book';
}

////// 楼层传送器界面时的点击操作 //////
actions.prototype._clickFly = function (x, y) {
    if ((x == core._WIDTH_ - 2 || x == core._WIDTH_ - 3) && y == this._HY_ + 3) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(-1)); }
    if ((x == core._WIDTH_ - 2 || x == core._WIDTH_ - 3) && y == this._HY_ - 1) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(1)); }
    if ((x == core._WIDTH_ - 2 || x == core._WIDTH_ - 3) && y == this._HY_ + 4) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(-10)); }
    if ((x == core._WIDTH_ - 2 || x == core._WIDTH_ - 3) && y == this._HY_ - 2) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(10)); }
    if (x >= this._HX_ - 1 && x <= this._HX_ + 1 && y===core._HEIGHT_-1) { core.playSound('Cancel'); core.ui.closePanel(); }
    if (x >= 0 && x <= this._HX_ + 3 && y >= 3 && y <= core._HEIGHT_-1 - 1)
        core.flyTo(core.floorIds[core.status.event.data]);
    return;
}

////// 楼层传送器界面时，按下某个键的操作 //////
actions.prototype._keyDownFly = function (keycode) {
    if (keycode == 37) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(-10)); }
    else if (keycode == 38) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(1)); }
    else if (keycode == 39) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(10)); }
    else if (keycode == 40) { core.playSound('Cursor Movement'); core.ui.drawFly(this._getNextFlyFloor(-1)); }
    return;
}

actions.prototype._getNextFlyFloor = function (delta, index) {
    if (index == null) index = core.status.event.data;
    if (delta == 0) return index;
    var sign = Math.sign(delta);
    delta = Math.abs(delta);
    var ans = index;
    while (true) {
        index += sign;
        if (index < 0 || index >= core.floorIds.length) break;
        var floorId = core.floorIds[index];
        if (core.status.maps[floorId].canFlyTo && core.hasVisitedFloor(floorId)) {
            delta--;
            ans = index;
        }
        if (delta == 0) break;
    }
    return ans;
}

////// 楼层传送器界面时，放开某个键的操作 //////
actions.prototype._keyUpFly = function (keycode) {
    if (keycode == 71 || keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
    }
    if (keycode == 13 || keycode == 32 || keycode == 67)
        this._clickFly(this._HX_ - 1, this._HY_ - 1);
    return;
}

////// 查看地图界面时的点击操作 //////
actions.prototype._clickViewMaps = function (x, y, px, py) {
    if (core.status.event.data == null) {
        core.ui._drawViewMaps(core.floorIds.indexOf(core.status.floorId));
        return;
    }
    var now = core.floorIds.indexOf(core.status.floorId);
    var index = core.status.event.data.index;
    var cx = core.status.event.data.x, cy = core.status.event.data.y;
    var floorId = core.floorIds[index], mh = core.floors[floorId].height;
    var perpx = core._PX_ / 5, cornerpx = perpx * 3 / 4, perpy = core._PY_ / 5, cornerpy = perpy * 3 / 4;

    if (px <= cornerpx && py <= cornerpy) {
        core.status.event.data.damage = !core.status.event.data.damage;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx, cy);
        return;
    }
    if (px <= cornerpx && py >= core._PY_ - cornerpy) {
        if (core.markedFloorIds[floorId]) delete core.markedFloorIds[floorId];
        else core.markedFloorIds[floorId] = true;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx, cy);
        return;
    }
    if (px >= core._PX_ - cornerpx && py <= cornerpy) {
        core.status.event.data.all = !core.status.event.data.all;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx, cy);
        return;
    }

    if (px >= perpx && px <= core._PX_ - perpx && py <= perpy && (!core.status.event.data.all && mh > core._HEIGHT_)) {
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx, cy - 1);
        return;
    }
    if (px >= perpx && px <= core._PX_ - perpx && py >= core._PY_ - perpy && (!core.status.event.data.all && mh > core._HEIGHT_)) {
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx, cy + 1);
        return;
    }
    if (px <= perpx && py >= perpy && py <= core._PY_ - perpy) {
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx - 1, cy);
        return;
    }
    if (px >= core._PX_ - perpx && py >= perpy && py <= core._PY_ - perpy) {
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(index, cx + 1, cy);
        return;
    }

    if (py <= 2 * perpy && (mh == core._HEIGHT_ || (px >= perpx && px <= core._PX_ - perpx))) {
        core.playSound('Cursor Movement');
        index++;
        while (index < core.floorIds.length && index != now && core.status.maps[core.floorIds[index]].cannotViewMap)
            index++;
        if (index < core.floorIds.length)
            core.ui._drawViewMaps(index);
        return;
    }
    if (py >= 3 * perpy && (mh == core._HEIGHT_ || (px >= perpx && px <= core._PX_ - perpx))) {
        core.playSound('Cursor Movement');
        index--;
        while (index >= 0 && index != now && core.status.maps[core.floorIds[index]].cannotViewMap)
            index--;
        if (index >= 0)
            core.ui._drawViewMaps(index);
        return;
    }
    if (px >= perpx && px <= core._PX_ - perpx && py >= perpy * 2 && py <= perpy * 3) {
        core.clearMap('data');
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
}

////// 查看地图界面时，按下某个键的操作 //////
actions.prototype._keyDownViewMaps = function (keycode) {
    if (core.status.event.data == null) return;

    var floorId = core.floorIds[core.status.event.data.index], mh = core.floors[floorId].height;

    if (keycode == 38 || keycode == 33)      this._clickViewMaps(this._HX_       , this._HY_ - 3    , core._PX_ / 2, core._PY_ / 5 * 1.5);
    if (keycode == 40 || keycode == 34)      this._clickViewMaps(this._HX_       , this._HY_ + 3    , core._PX_ / 2, core._PY_ / 5 * 3.5);
    if (keycode == 87 && mh > core._HEIGHT_) this._clickViewMaps(this._HX_       , 0                , core._PX_ / 2, 1                  );
    if (keycode == 65)                       this._clickViewMaps(0               , this._HY_        , 1            , core._PY_ / 2      );
    if (keycode == 83 && mh > core._HEIGHT_) this._clickViewMaps(this._HX_       , core._HEIGHT_ - 1, core._PX_ / 2, core._PY_ - 1      );
    if (keycode == 68)                       this._clickViewMaps(core._WIDTH_ - 1, this._HY_        , core._PX_    , core._PY_ / 2 - 1  );
    return;
}

////// 查看地图界面时，放开某个键的操作 //////
actions.prototype._keyUpViewMaps = function (keycode) {
    if (core.status.event.data == null) {
        core.ui._drawViewMaps(core.floorIds.indexOf(core.status.floorId));
        return;
    }
    var floorId = core.floorIds[core.status.event.data.index];

    if (keycode == 27 || keycode == 13 || keycode == 32 || (!core.isReplaying() && keycode == 67)) {
        core.clearMap('data');
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
    if (keycode == 86) {
        core.status.event.data.damage = !core.status.event.data.damage;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(core.status.event.data);
        return;
    }
    if (keycode == 90) {
        core.status.event.data.all = !core.status.event.data.all;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(core.status.event.data);
        return;
    }
    if (keycode == 66) {
        if (core.markedFloorIds[floorId]) delete core.markedFloorIds[floorId];
        else core.markedFloorIds[floorId] = true;
        core.playSound('Cursor Movement');
        core.ui._drawViewMaps(core.status.event.data);
        return;
    }
    if (keycode == 88 || (core.isReplaying() && keycode == 67)) {
        if (core.isReplaying()) {
            core.control._replay_book();
        } else {
            core.openBook(false);
        }
        return;
    }
    if (keycode == 71 && !core.isReplaying()) {
        core.useFly(false);
        return;
    }
    return;
}

////// 快捷商店界面时的点击操作 //////
actions.prototype._clickQuickShop = function (x, y) {
    var shopIds = core.listShopIds();
    if (this._out(x)) return;
        var topIndex = this._HY_ - parseInt(shopIds.length / 2) + (core.status.event.ui.offset || 0);
        if (y >= topIndex && y < topIndex + shopIds.length) {
            var shopId = shopIds[y - topIndex];
            if (!core.canOpenShop(shopId)) {
                core.playSound('Operation failed');
                core.drawTip('The current item is not yet opened');
                return;
            }
            var message = core.canUseQuickShop(shopId);
            if (message == null) {
                // core.ui.closePanel();
                core.openShop(shopIds[y - topIndex], false);
            } else {
                core.playSound('Operation failed');
                core.drawTip(message);
            }
        }
        // 离开
        else if (y == topIndex + shopIds.length) {
            core.playSound('Cancel');
            core.ui.closePanel();
        }
}

////// 快捷商店界面时，放开某个键的操作 //////
actions.prototype._keyUpQuickShop = function (keycode) {
    if (keycode == 27 || keycode == 75 || keycode == 88 || keycode == 86) {
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
    this._selectChoices(core.listShopIds().length + 1, keycode, this._clickQuickShop);
    return;
}

////// 工具栏界面时的点击操作 //////
actions.prototype._clickToolbox = function (x, y) {
    var tools = core.getToolboxItems('tools'),
        constants = core.getToolboxItems('constants');

    // 装备栏
    if (x >= this.LAST - 2 && y == 0) {
        core.ui.closePanel();
        if (core.isReplaying())
            core.control._replay_equipbox();
        else
            core.openEquipbox();
        return;
    }
    if (x >= this.LAST - 2 && y===core._HEIGHT_-1) {
        core.playSound('Cancel');
        core.ui.closePanel();
        var last = core.status.route[core.status.route.length - 1] || '';
        if (last.startsWith('equip:') || last.startsWith('unEquip:')) {
            core.status.route.push('no');
        }
        core.checkAutoEvents();
        return;
    }

    var toolsPage = core.status.event.data.toolsPage;
    var constantsPage = core.status.event.data.constantsPage;
    // 上一页
    if (x == this._HX_ - 2 || x == this._HX_ - 3) {
        if (y===core._HEIGHT_-1 - 5 && toolsPage > 1) {
            core.status.event.data.toolsPage--;
            core.playSound('Cursor Movement');
            core.ui._drawToolbox(core.status.event.selection);
        }
        if (y===core._HEIGHT_-1 && constantsPage > 1) {
            core.status.event.data.constantsPage--;
            core.playSound('Cursor Movement');
            core.ui._drawToolbox(core.status.event.selection);
        }
    }
    // 下一页
    if (x == this._HX_ + 2 || x == this._HX_ + 3) {
        if (y===core._HEIGHT_-1 - 5 && toolsPage < Math.ceil(tools.length / this.LAST)) {
            core.status.event.data.toolsPage++;
            core.playSound('Cursor Movement');
            core.ui._drawToolbox(core.status.event.selection);
        }
        if (y===core._HEIGHT_-1 && constantsPage < Math.ceil(constants.length / this.LAST)) {
            core.status.event.data.constantsPage++;
            core.playSound('Cursor Movement');
            core.ui._drawToolbox(core.status.event.selection);
        }
    }

    var index = parseInt(x / 2);
    if (y===core._HEIGHT_-1 - 8) index += 0;
    else if (y===core._HEIGHT_-1 - 6) index += this._HX_;
    else if (y===core._HEIGHT_-1 - 3) index += this.LAST;
    else if (y===core._HEIGHT_-1 - 1) index += this.LAST + this._HX_;
    else index = -1;
    if (index >= 0)
        this._clickToolboxIndex(index);
}

////// 选择工具栏界面中某个Index后的操作 //////
actions.prototype._clickToolboxIndex = function (index) {
    var tools = core.getToolboxItems('tools'),
        constants = core.getToolboxItems('constants');

    var items = null;
    var select;
    if (index < this.LAST) {
        select = index + this.LAST * (core.status.event.data.toolsPage - 1);
        items = tools;
    }
    else {
        select = index % this.LAST + this.LAST * (core.status.event.data.constantsPage - 1);
        items = constants;
    }
    if (items == null) return;
    if (select >= items.length) return;
    var itemId = items[select];
    if (itemId == core.status.event.data.selectId) {
        if (core.isReplaying()) return;
        core.events.tryUseItem(itemId);
    }
    else {
        core.playSound('Cursor Movement');
        core.ui._drawToolbox(index);
    }
}

////// 工具栏界面时，按下某个键的操作 //////
actions.prototype._keyDownToolbox = function (keycode) {
    if (core.status.event.data == null) return;

    var last_index = this.LAST - 1;

    var tools = core.getToolboxItems('tools'),
        constants = core.getToolboxItems('constants');
    var index = core.status.event.selection;
    var toolsPage = core.status.event.data.toolsPage;
    var constantsPage = core.status.event.data.constantsPage;
    var toolsTotalPage = Math.ceil(tools.length / this.LAST);
    var constantsTotalPage = Math.ceil(constants.length / this.LAST);
    var toolsLastIndex = toolsPage < toolsTotalPage ? last_index : (tools.length + last_index) % this.LAST;
    var constantsLastIndex = this.LAST + (constantsPage < constantsTotalPage ? last_index : (constants.length + last_index) % this.LAST);

    if (keycode == 37) { // left
        if (index == 0) { // 处理向前翻页
            if (toolsPage > 1) {
                core.status.event.data.toolsPage--;
                index = last_index;
            }
            else return; // 第一页不向前翻
        }
        else if (index == this.LAST) {
            if (constantsPage == 1) {
                if (toolsTotalPage == 0) return;
                core.status.event.data.toolsPage = toolsTotalPage;
                index = (tools.length + last_index) % this.LAST;
            }
            else {
                core.status.event.data.constantsPage--;
                index = 2 * this.LAST - 1;
            }
        }
        else index -= 1;
        this._clickToolboxIndex(index);
        return;
    }
    if (keycode == 38) { // up
        if (index >= this.LAST && index < this.LAST + this._HX_) { // 进入tools
            if (toolsTotalPage == 0) return;
            if (toolsLastIndex >= this._HX_) index = Math.min(toolsLastIndex, index - this._HX_);
            else index = Math.min(toolsLastIndex, index - this.LAST);
        }
        else if (index < this._HX_) return; // 第一行没有向上
        else index -= this._HX_;
        this._clickToolboxIndex(index);
        return;
    }
    if (keycode == 39) { // right
        if (toolsPage < toolsTotalPage && index == last_index) {
            core.status.event.data.toolsPage++;
            index = 0;
        }
        else if (constantsPage < constantsTotalPage && index == 2 * this.LAST - 1) {
            core.status.event.data.constantsPage++;
            index = this.LAST;
        }
        else if (index == toolsLastIndex) {
            if (constantsTotalPage == 0) return;
            core.status.event.data.constantsPage = 1;
            index = this.LAST;
        }
        else if (index == constantsLastIndex) // 一个物品无操作
            return;
        else index++;
        this._clickToolboxIndex(index);
        return;
    }
    if (keycode == 40) { // down
        var nextIndex = null;
        if (index < this._HX_) {
            if (toolsLastIndex >= this._HX_) nextIndex = Math.min(toolsLastIndex, index + this._HX_);
            else index += this._HX_;
        }
        if (nextIndex == null && index < this.LAST) {
            if (constantsTotalPage == 0) return;
            nextIndex = Math.min(index + this._HX_, constantsLastIndex);
        }
        if (nextIndex == null && index < this.LAST + this._HX_) {
            if (constantsLastIndex >= this.LAST + this._HX_)
                nextIndex = Math.min(constantsLastIndex, index + this._HX_);
        }
        if (nextIndex != null) {
            this._clickToolboxIndex(nextIndex);
        }
        return;
    }
}

////// 工具栏界面时，放开某个键的操作 //////
actions.prototype._keyUpToolbox = function (keycode) {
    if (keycode == 81) {
        core.playSound('Sure');
        core.ui.closePanel();
        if (core.isReplaying())
            core.control._replay_equipbox();
        else
            core.openEquipbox();
        return;
    }
    if (keycode == 84 || keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
        var last = core.status.route[core.status.route.length - 1] || '';
        if (last.startsWith('equip:') || last.startsWith('unEquip:')) {
            core.status.route.push('no');
        }
        core.checkAutoEvents();
        return;
    }
    if (core.status.event.data == null) return;

    if (keycode == 13 || keycode == 32 || keycode == 67) {
        this._clickToolboxIndex(core.status.event.selection);
        return;
    }
}

////// 装备栏界面时的点击操作 //////
actions.prototype._clickEquipbox = function (x, y, px, py) {
    if (x >= this.LAST - 2 && y == 0) {
        core.playSound('Sure');
        core.ui.closePanel();
        if (core.isReplaying())
            core.control._replay_toolbox();
        else
            core.openToolbox();
        return;
    }
    if (x >= this.LAST - 2 && y===core._HEIGHT_-1) {
        core.playSound('Cancel');
        core.ui.closePanel();
        var last = core.status.route[core.status.route.length - 1] || '';
        if (last.startsWith('equip:') || last.startsWith('unEquip:')) {
            core.status.route.push('no');
        }
        core.checkAutoEvents();
        return;
    }
    if ((x == this._HX_ - 2 || x == this._HX_ - 3) && y===core._HEIGHT_-1) {
        if (core.status.event.data.page > 1) {
            core.status.event.data.page--;
            core.playSound('Cursor Movement');
            core.ui._drawEquipbox(core.status.event.selection);
        }
        return;
    }
    if ((x == this._HX_ + 2 || x == this._HX_ + 3) && y===core._HEIGHT_-1) {
        var lastPage = Math.ceil(core.getToolboxItems('equips').length / this.LAST);
        if (core.status.event.data.page < lastPage) {
            core.status.event.data.page++;
            core.playSound('Cursor Movement');
            core.ui._drawEquipbox(core.status.event.selection);
        }
        return;
    }
    var per_page = this._HX_ - 3, v = core._WIDTH_ / per_page;
    if (y === core._HEIGHT_ - 9) {
        for (var i = 0; i < per_page; ++i) if (x >= i * v && x <= (i + 1) * v) return this._clickEquipboxIndex(i);
    } else if (y === core._HEIGHT_ - 7) {
        for (var i = 0; i < per_page; ++i) if (x >= i * v && x <= (i + 1) * v) return this._clickEquipboxIndex(per_page + i);
    } else if (Math.abs(core._HEIGHT_ - 5 - py / 32) < 0.5) {
        for (var i = 0; i < per_page; ++i) if (x >= i * v && x <= (i + 1) * v) return this._clickEquipboxIndex(2 * per_page + i);
    } else if (y === core._HEIGHT_ - 4) this._clickEquipboxIndex(this.LAST + parseInt(x / 2))
    else if (y === core._HEIGHT_ - 2) this._clickEquipboxIndex(this.LAST + this._HX_ + parseInt(x / 2));
}

////// 选择装备栏界面中某个Index后的操作 //////
actions.prototype._clickEquipboxIndex = function (index) {
    if (index < this.LAST) {
        if (index >= core.status.globalAttribute.equipName.length) return;
        if (index == core.status.event.selection && core.status.hero.equipment[index]) {
            if (core.isReplaying()) return;
            core.unloadEquip(index);
            core.status.route.push("unEquip:" + index);
        } else core.playSound('Cursor Movement');
    }
    else {
        var equips = core.getToolboxItems('equips');
        if (index == core.status.event.selection) {
            if (core.isReplaying()) return;
            var equipId = equips[index - this.LAST + (core.status.event.data.page - 1) * this.LAST];
            core.loadEquip(equipId);
            core.status.route.push("equip:" + equipId);
        } else core.playSound('Cursor Movement');
    }
    core.ui._drawEquipbox(index);
}

////// 装备栏界面时，按下某个键的操作 //////
actions.prototype._keyDownEquipbox = function (keycode) {
    if (core.status.event.data == null) return;

    var last_index = this.LAST - 1;
    var per_line = this._HX_ - 3;
    var equipCapacity = core.status.globalAttribute.equipName.length;
    var ownEquipment = core.getToolboxItems('equips');
    var index = core.status.event.selection;
    var page = core.status.event.data.page;
    var totalPage = Math.ceil(ownEquipment.length / this.LAST);
    var totalLastIndex = this.LAST + (page < totalPage ? last_index : (ownEquipment.length + last_index) % this.LAST);

    if (keycode == 37) { // left
        if (index == 0) return;
        if (index == this.LAST) {
            if (page > 1) {
                core.status.event.data.page--;
                core.playSound('Cursor Movement');
                index = this.LAST + last_index;
            }
            else if (page == 1)
                index = equipCapacity - 1;
            else return;
        }
        else index -= 1;
        this._clickEquipboxIndex(index);
        return;
    }
    if (keycode == 38) { // up
        if (index < per_line) return;
        else if (index < 2 * per_line) index -= per_line;
        else if (index < this.LAST + this._HX_) {
            index = parseInt((index - this.LAST) / 2);
            if (equipCapacity > per_line) index = Math.min(equipCapacity - 1, index + per_line);
            else index = Math.min(equipCapacity - 1, index);
        }
        else index -= this._HX_;
        this._clickEquipboxIndex(index);
        return;
    }
    if (keycode == 39) { // right
        if (page < totalPage && index == this.LAST + last_index) {
            core.status.event.data.page++;
            core.playSound('Cursor Movement');
            index = this.LAST;
        }
        else if (index == equipCapacity - 1) {
            if (totalPage == 0) return;
            index = this.LAST;
        }
        else if (index == totalLastIndex)
            return;
        else index++;
        this._clickEquipboxIndex(index);
        return;
    }
    if (keycode == 40) { // down
        if (index < per_line) {
            if (equipCapacity > per_line) index = Math.min(index + per_line, equipCapacity - 1);
            else {
                if (totalPage == 0) return;
                index = Math.min(2 * index + 1 + this.LAST, totalLastIndex);
            }
        }
        else if (index < 2 * per_line) {
            if (totalPage == 0) return;
            index = Math.min(2 * (index - per_line) + 1 + this.LAST, totalLastIndex);
        }
        else if (index < this.LAST + this._HX_)
            index = Math.min(index + this._HX_, totalLastIndex);
        else return;
        this._clickEquipboxIndex(index);
        return;
    }
}

////// 装备栏界面时，放开某个键的操作 //////
actions.prototype._keyUpEquipbox = function (keycode, altKey) {
    if (altKey && keycode >= 48 && keycode <= 57) {
        core.items.quickSaveEquip(keycode - 48);
        return;
    }
    if (keycode == 84) {
        core.playSound('Sure');
        core.ui.closePanel();
        if (core.isReplaying())
            core.control._replay_toolbox();
        else
            core.openToolbox();
        return;
    }
    if (keycode == 81 || keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
        var last = core.status.route[core.status.route.length - 1] || '';
        if (last.startsWith('equip:') || last.startsWith('unEquip:')) {
            core.status.route.push('no');
        }
        core.checkAutoEvents();
        return;
    }
    if (!core.status.event.data.selectId) return;

    if (keycode == 13 || keycode == 32 || keycode == 67) {
        this._clickEquipboxIndex(core.status.event.selection);
        return;
    }
}

////// 存读档界面时的点击操作 //////
actions.prototype._clickSL = function (x, y) {
    var page = core.status.event.data.page, offset = core.status.event.data.offset;
    var index = page * 10 + offset;

    // 上一页
    if ((x == this._HX_ - 2 || x == this._HX_ - 3) && y===core._HEIGHT_-1) {
        core.playSound('Cursor Movement');
        core.ui._drawSLPanel(10 * (page - 1) + offset);
        return;
    }
    // 下一页
    if ((x == this._HX_ + 2 || x == this._HX_ + 3) && y===core._HEIGHT_-1) {
        core.playSound('Cursor Movement');
        core.ui._drawSLPanel(10 * (page + 1) + offset);
        return;
    }
    // 返回
    if (x >= this.LAST - 2 && y===core._HEIGHT_-1) {
        core.playSound('Cancel');
        if (core.events.recoverEvents(core.status.event.interval))
            return;
        core.ui.closePanel();
        delete core.status.tempRoute;
        if (!core.isPlaying())
            core.showStartAnimate(true);
        return;
    }
    // 删除
    if (x >= 0 && x <= 2 && y===core._HEIGHT_-1) {
        if (core.status.event.id == 'save') {
            core.status.event.selection = !core.status.event.selection;
            core.ui._drawSLPanel(index);
        }
        else { // 显示收藏
            core.status.event.data.mode = core.status.event.data.mode == 'all' ? 'fav' : 'all';
            if (core.status.event.data.mode == 'fav')
                core.ui._drawSLPanel(1, true);
            else {
                page = parseInt((core.saves.saveIndex - 1) / 5);
                offset = core.saves.saveIndex - 5 * page;
                core.ui._drawSLPanel(10 * page + offset, true);
            }
        }
        return;
    }
    // 点存档名
    var xLeft = parseInt(core._WIDTH_ / 3), xRight = parseInt(core._WIDTH_ * 2 / 3);
    var topY1 = 0, topY2 = this._HY_;
    if (y >= topY1 && y <= topY1 + 1) {
        if (x >= xLeft && x < xRight) return this._clickSL_favorite(page, 1);
        if (x >= xRight) return this._clickSL_favorite(page, 2);
    }
    if (y >= topY2 && y <= topY2 + 1) {
        if (x < xLeft) return this._clickSL_favorite(page, 3);
        if (x >= xLeft && x < xRight) return this._clickSL_favorite(page, 4);
        if (x >= xRight) return this._clickSL_favorite(page, 5);
    }

    var id = null;
    if (y >= topY1 + 2 && y < this._HY_ - 1) {
        if (x < xLeft) id = "autoSave";
        if (x >= xLeft && x < xRight) id = 5 * page + 1;
        if (x >= xRight) id = 5 * page + 2;
    }
    if (y >= topY2 + 2 && y < core._HEIGHT_ - 1) {
        if (x < xLeft) id = 5 * page + 3;
        if (x >= xLeft && x < xRight) id = 5 * page + 4;
        if (x >= xRight) id = 5 * page + 5;
    }
    if (id != null) {
        if (core.status.event.selection) {
            if (id == 'autoSave') {
                core.playSound('Operation failed');
                core.drawTip("Unable to delete autosave!");
            } else {
                core.removeSave(id, function () {
                    core.ui._drawSLPanel(index, true);
                });
            }
        }
        else {
            if (core.status.event.data.mode == 'fav' && id != 'autoSave')
                id = core.saves.favorite[id - 1];
            core.doSL(id, core.status.event.id);
        }
    }
}

actions.prototype._clickSL_favorite = function (page, offset) {
    if (offset == 0) return;
    var index = 5 * page + offset;
    if (core.status.event.data.mode == 'fav') { // 收藏模式下点击的下标直接对应favorite
        index = core.saves.favorite[index - 1];
        core.myprompt("Please enter the archive name you want to display(Length not exceeding5character)", null, function (value) {
            if (value && value.length <= 5) {
                core.saves.favoriteName[index] = value;
                core.control._updateFavoriteSaves();
                core.ui._drawSLPanel(10 * page + offset);
            } else if (value) {
                alert("Invalid input!");
            }
        });
    } else {
        var v = core.saves.favorite.indexOf(index);
        core.playSound('Sure');
        if (v >= 0) { // 已经处于收藏状态：取消收藏
            core.saves.favorite.splice(v, 1);
            delete core.saves.favoriteName[index];
        }
        else if (core.hasSave(index)) { // 存在存档则进行收藏
            core.saves.favorite.push(index);
            core.saves.favorite = core.saves.favorite.sort(function (a, b) { return a - b; }); // 保证有序
            core.drawTip("Collection successful!");
        }
        core.control._updateFavoriteSaves();
        core.ui._drawSLPanel(10 * page + offset);
    }
}

////// 存读档界面时，按下某个键的操作 //////
actions.prototype._keyDownSL = function (keycode) {

    var page = core.status.event.data.page, offset = core.status.event.data.offset;
    var index = page * 10 + offset;

    if (keycode == 37) { // left
        core.playSound('Cursor Movement');
        if (offset == 0) {
            core.ui._drawSLPanel(10 * (page - 1) + 5);
        }
        else {
            core.ui._drawSLPanel(index - 1);
        }
        return;
    }
    if (keycode == 38) { // up
        core.playSound('Cursor Movement');
        if (offset < 3) {
            core.ui._drawSLPanel(10 * (page - 1) + offset + 3);
        }
        else {
            core.ui._drawSLPanel(index - 3);
        }
        return;
    }
    if (keycode == 39) { // right
        core.playSound('Cursor Movement');
        if (offset == 5) {
            core.ui._drawSLPanel(10 * (page + 1) + 1);
        }
        else {
            core.ui._drawSLPanel(index + 1);
        }
        return;
    }
    if (keycode == 40) { // down
        core.playSound('Cursor Movement');
        if (offset >= 3) {
            core.ui._drawSLPanel(10 * (page + 1) + offset - 3);
        }
        else {
            core.ui._drawSLPanel(index + 3);
        }
        return;
    }
    if (keycode == 33) { // PAGEUP
        core.playSound('Cursor Movement');
        core.ui._drawSLPanel(10 * (page - 1) + offset);
        return;
    }
    if (keycode == 34) { // PAGEDOWN
        core.playSound('Cursor Movement');
        core.ui._drawSLPanel(10 * (page + 1) + offset);
        return;
    }
}

////// 存读档界面时，放开某个键的操作 //////
actions.prototype._keyUpSL = function (keycode) {
    var page = core.status.event.data.page, offset = core.status.event.data.offset;
    var index = page * 10 + offset;

    if (keycode == 27 || keycode == 88 || (core.status.event.id == 'save' && keycode == 83)
        || (core.status.event.id == 'load' && keycode == 68)) {
        this._clickSL(core._WIDTH_ - 1, core._HEIGHT_ - 1);
        return;
    }
    if (keycode >= 48 && keycode <= 57) {
        if (keycode == 48) keycode = 58;
        core.ui._drawSLPanel((keycode - 49) * 1000 + 1);
        return;
    }
    if (keycode == 13 || keycode == 32 || keycode == 67) {
        if (offset == 0)
            core.doSL("autoSave", core.status.event.id);
        else {
            var id = 5 * page + offset;
            if (core.status.event.data.mode == 'fav') id = core.saves.favorite[id - 1];
            core.doSL(id, core.status.event.id);
        }
        return;
    }
    if (keycode == 69 && core.status.event.id != 'save') { // E 收藏切换
        this._clickSL(0, core._HEIGHT_ - 1);
        return;
    }
    if (keycode == 46) {
        if (offset == 0) {
            core.playSound('Operation failed');
            core.drawTip("Unable to delete autosave!");
        }
        else {
            var id = 5 * page + offset;
            if (core.status.event.data.mode == 'fav') id = core.saves.favorite[id - 1];
            core.removeSave(id, function () {
                core.ui._drawSLPanel(index, true);
            });
        }
    }
    if (keycode == 70 && core.status.event.data.mode == 'all') { // F
        this._clickSL_favorite(page, offset);
    }
}


////// 系统设置界面时的点击操作 //////
actions.prototype._clickSwitchs = function (x, y) {
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    var selection = y - topIndex;
    if (this._out(x)) return;
    if (selection >= 0 && selection < choices.length) {
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                core.status.event.selection = 0;
                core.playSound('Sure');
                return core.ui._drawSwitchs_sounds();
            case 1:
                core.status.event.selection = 0;
                core.playSound('Sure');
                return core.ui._drawSwitchs_display();
            case 2:
                core.status.event.selection = 0;
                core.playSound('Sure');
                return core.ui._drawSwitchs_action();
            case 3:
                core.status.event.selection = 0;
                core.playSound('Cancel');
                return core.ui._drawSettings();
        }
    }
}

////// 系统设置界面时，放开某个键的操作 //////
actions.prototype._keyUpSwitchs = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 0;
        core.playSound('Cancel');
        core.ui._drawSettings();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSwitchs);
}

actions.prototype._clickSwitchs_sounds = function (x, y) {
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    var selection = y - topIndex;
    if (this._out(x)) {
        if (selection != 2) return;
    }
    if (selection >= 0 && selection < choices.length) {
        var width = choices[selection].width;
        var leftPos = (core._PX_ - width) / 2, rightPos = (core._PX_ + width) / 2;
        var leftGrid = parseInt(leftPos / 32), rightGrid = parseInt(rightPos / 32) - 1;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                return this._clickSwitchs_sounds_bgm();
            case 1:
                return this._clickSwitchs_sounds_se();
            case 2:
                if (x == leftGrid || x == leftGrid + 1) return this._clickSwitchs_sounds_userVolume(-1);
                if (x == rightGrid || x == rightGrid + 1) return this._clickSwitchs_sounds_userVolume(1);
                return;
            case 3:
                core.status.event.selection = 0;
                core.playSound('Cancel');
                core.ui._drawSwitchs();
                return;
        }
    }
}

actions.prototype._clickSwitchs_sounds_bgm = function () {
    core.triggerBgm();
    core.playSound('Sure');
    core.ui._drawSwitchs_sounds();
}

actions.prototype._clickSwitchs_sounds_se = function () {
    core.musicStatus.soundStatus = !core.musicStatus.soundStatus;
    core.setLocalStorage('soundStatus', core.musicStatus.soundStatus);
    core.playSound('Sure');
    core.ui._drawSwitchs_sounds();
}

actions.prototype._clickSwitchs_sounds_userVolume = function (delta) {
    var value = Math.round(Math.sqrt(100 * core.musicStatus.userVolume));
    if (value == 0 && delta < 0) return;
    core.musicStatus.userVolume = core.clamp(Math.pow(value + delta, 2) / 100, 0, 1);
    //audioContext 音效 不受designVolume 影响
    if (core.musicStatus.gainNode != null) core.musicStatus.gainNode.gain.value = core.musicStatus.userVolume;
    if (core.musicStatus.playingBgm) core.material.bgms[core.musicStatus.playingBgm].volume = core.musicStatus.userVolume * core.musicStatus.designVolume;
    core.setLocalStorage('userVolume', core.musicStatus.userVolume);
    core.playSound('Sure');
    core.ui._drawSwitchs_sounds();
}

actions.prototype._keyUpSwitchs_sounds = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 0;
        core.playSound('Cancel');
        core.ui._drawSwitchs();
        return;
    }
    if (keycode == 37) {
        switch (core.status.event.selection) {
            case 2: core.playSound('Sure'); return this._clickSwitchs_sounds_userVolume(-1);
        }
    } else if (keycode == 39) {
        switch (core.status.event.selection) {
            case 2: core.playSound('Sure'); return this._clickSwitchs_sounds_userVolume(1);
        }
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSwitchs_sounds);
}

actions.prototype._clickSwitchs_display = function (x, y) {
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    var selection = y - topIndex;
    if (this._out(x)) {
        if (selection != 0) return;
    }
    if (selection >= 0 && selection < choices.length) {
        var width = choices[selection].width;
        var leftPos = (core._PX_ - width) / 2, rightPos = (core._PX_ + width) / 2;
        var leftGrid = parseInt(leftPos / 32), rightGrid = parseInt(rightPos / 32) - 1;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                if (x == leftGrid || x == leftGrid + 1) return this._clickSwitchs_display_setSize(-1);
                if (x == rightGrid || x == rightGrid + 1) return this._clickSwitchs_display_setSize(1);
                return;
            case 1:
                core.playSound('Sure');
                return this._clickSwitchs_display_enableHDCanvas();
            case 2:
                core.playSound('Sure');
                return this._clickSwitchs_display_enableEnemyPoint();
            case 3:
                core.playSound('Sure');
                return this._clickSwitchs_display_enemyDamage();
            case 4:
                core.playSound('Sure');
                return this._clickSwitchs_display_critical();
            case 5:
                core.playSound('Sure');
                return this._clickSwitchs_display_extraDamage();
            case 6:
                core.playSound('Sure');
                return this._clickSwitchs_display_extraDamageType();
            case 7:
                core.playSound('Sure');
                core.setLocalStorage('autoScale', core.getLocalStorage('autoScale') ? false : true);
                core.ui._drawSwitchs_display();
                break;
            case 8:
                core.status.event.selection = 1;
                core.playSound('Cancel');
                core.ui._drawSwitchs();
                return;
        }
    }
}

actions.prototype._clickSwitchs_display_setSize = function (delta) {
    core.setDisplayScale(delta);
    var currentRatio = Math.max(window.devicePixelRatio || 1, core.domStyle.scale);
    if (currentRatio > core.domStyle.ratio) {
        core.drawTip("Need to refresh the page to adjustUIClarity");
    }
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_enableHDCanvas = function () {
    core.flags.enableHDCanvas = !core.flags.enableHDCanvas;
    core.setLocalStorage('enableHDCanvas', core.flags.enableHDCanvas);
    core.drawTip("Switch HDUI, you need to refresh the page to take effect");
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_enableEnemyPoint = function () {
    core.flags.enableEnemyPoint = !core.flags.enableEnemyPoint;
    core.setLocalStorage('enableEnemyPoint', core.flags.enableEnemyPoint);
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_enemyDamage = function () {
    core.flags.displayEnemyDamage = !core.flags.displayEnemyDamage;
    core.updateDamage();
    core.setLocalStorage('enemyDamage', core.flags.displayEnemyDamage);
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_critical = function () {
    core.flags.displayCritical = !core.flags.displayCritical;
    core.updateDamage();
    core.setLocalStorage('critical', core.flags.displayCritical);
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_extraDamage = function () {
    core.flags.displayExtraDamage = !core.flags.displayExtraDamage;
    core.updateDamage();
    core.setLocalStorage('extraDamage', core.flags.displayExtraDamage);
    core.ui._drawSwitchs_display();
}

actions.prototype._clickSwitchs_display_extraDamageType = function () {
    core.flags.extraDamageType = (core.flags.extraDamageType + 1) % 3;
    core.updateDamage();
    core.setLocalStorage('extraDamageType', core.flags.extraDamageType);
    core.ui._drawSwitchs_display();
}

actions.prototype._keyUpSwitchs_display = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 1;
        core.playSound('Cancel');
        core.ui._drawSwitchs();
        return;
    }
    if (keycode == 37) {
        switch (core.status.event.selection) {
            case 0: core.playSound('Sure'); return this._clickSwitchs_display_setSize(-1);
        }
    } else if (keycode == 39) {
        switch (core.status.event.selection) {
            case 0: core.playSound('Sure'); return this._clickSwitchs_display_setSize(1);
        }
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSwitchs_display);
}

actions.prototype._clickSwitchs_action = function (x, y) {
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    var selection = y - topIndex;
    if (this._out(x)) {
        if (selection != 0 && selection != 1) return;
    }
    if (selection >= 0 && selection < choices.length) {
        var width = choices[selection].width;
        var leftPos = (core._PX_ - width) / 2, rightPos = (core._PX_ + width) / 2;
        var leftGrid = parseInt(leftPos / 32), rightGrid = parseInt(rightPos / 32) - 1;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                if (x == leftGrid || x == leftGrid + 1) { core.playSound('Sure'); return this._clickSwitchs_action_moveSpeed(-10); }
                if (x == rightGrid || x == rightGrid + 1) { core.playSound('Sure'); return this._clickSwitchs_action_moveSpeed(10); }
                return;
            case 1:
                if (x == leftGrid || x == leftGrid + 1) { core.playSound('Sure'); return this._clickSwitchs_action_floorChangeTime(-100); }
                if (x == rightGrid || x == rightGrid + 1) { core.playSound('Sure'); return this._clickSwitchs_action_floorChangeTime(100); }
            case 2:
                core.playSound('Sure');
                return this._clickSwitchs_action_potionNoRouting();
            case 3:
                core.playSound('Sure');
                return this._clickSwitchs_action_clickMove();
            case 4:
                core.playSound('Sure');
                return this._clickSwitchs_action_leftHandPrefer();
            case 5:
                core.status.event.selection = 2;
                core.playSound('Cancel');
                core.ui._drawSwitchs();
                return;
        }
    }
}

actions.prototype._clickSwitchs_action_moveSpeed = function (delta) {
    core.values.moveSpeed = core.clamp(core.values.moveSpeed + delta, 50, 200);
    core.setLocalStorage("moveSpeed", core.values.moveSpeed);
    core.ui._drawSwitchs_action();
}

actions.prototype._clickSwitchs_action_floorChangeTime = function (delta) {
    core.values.floorChangeTime = core.clamp(core.values.floorChangeTime + delta, 0, 2000);
    core.setLocalStorage("floorChangeTime", core.values.floorChangeTime);
    core.ui._drawSwitchs_action();
}

actions.prototype._clickSwitchs_action_potionNoRouting = function () {
    if (core.hasFlag('__potionNoRouting__')) core.removeFlag('__potionNoRouting__');
    else core.setFlag('__potionNoRouting__', true);
    core.ui._drawSwitchs_action();
}

actions.prototype._clickSwitchs_action_clickMove = function () {
    if (core.hasFlag('__noClickMove__')) core.removeFlag('__noClickMove__');
    else core.setFlag('__noClickMove__', true);
    core.ui._drawSwitchs_action();
}

actions.prototype._clickSwitchs_action_leftHandPrefer = function () {
    core.flags.leftHandPrefer = !core.flags.leftHandPrefer;
    core.setLocalStorage('leftHandPrefer', core.flags.leftHandPrefer);
    if (core.flags.leftHandPrefer) {
        core.myconfirm("Left-handed mode is on!\nIn this modeWASDWill be used to move warriors,IJKLCorresponding to the originalWASDPerform operations such as saving and reading files.")
    }
    core.ui._drawSwitchs_action();
}

actions.prototype._keyUpSwitchs_action = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 2;
        core.playSound('Cancel');
        core.ui._drawSwitchs();
        return;
    }
    if (keycode == 37) {
        switch (core.status.event.selection) {
            case 0: core.playSound('Sure'); return this._clickSwitchs_action_moveSpeed(-10);
            case 1: core.playSound('Sure'); return this._clickSwitchs_action_floorChangeTime(-100);
        }
    } else if (keycode == 39) {
        switch (core.status.event.selection) {
            case 0: core.playSound('Sure'); return this._clickSwitchs_action_moveSpeed(10);
            case 1: core.playSound('Sure'); return this._clickSwitchs_action_floorChangeTime(100);
        }
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSwitchs_action);
}

////// 系统菜单栏界面时的点击操作 //////
actions.prototype._clickSettings = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawSwitchs();
                break;
            case 1:
                // core.playSound('确定');
                core.ui._drawKeyBoard();
                break;
            case 2:
                // core.playSound('确定');
                core.clearUI();
                core.ui._drawViewMaps();
                break;
            case 3:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawNotes();
                break;
            case 4:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawSyncSave();
                break;
            case 5:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawGameInfo();
                break;
            case 6:
                return core.confirmRestart();
            case 7:
                core.playSound('Cancel');
                core.ui.closePanel();
                break;
        }
    }
    return;
}

////// 系统菜单栏界面时，放开某个键的操作 //////
actions.prototype._keyUpSettings = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSettings);
}

////// 存档笔记页面时的点击操作 //////
actions.prototype._clickNotes = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);
    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                core.playSound('Sure');
                this._clickNotes_new();
                break;
            case 1:
                // core.playSound('确定');
                this._clickNotes_show();
                break;
            case 2:
                core.playSound('Sure');
                this._clickNotes_edit();
                break;
            case 3:
                core.playSound('Sure');
                this._clickNotes_delete();
                break;
            case 4:
                core.status.event.selection = 3;
                core.playSound('Cancel');
                core.ui._drawSettings();
                break;
        }
    }
}

actions.prototype.__clickNotes_replaceText = function (data) {
    data = (data || "").replace(/[\${}]/g, "_")
        .replace(/(\t|\\t)\[.*?\]/g, "")
        .replace("\b", "\\b")
        .replace(/\\b\[.*?\]/g, "")
        .replace(/\n|\\n/g, " ");
    if (data.length > 45) data = data.substring(0, 43) + "...";
    return data;
}

actions.prototype._clickNotes_new = function () {
    core.status.hero.notes = core.status.hero.notes || [];
    core.myprompt("Please enter a note, no longer than45Character", null, function (data) {
        data = core.actions.__clickNotes_replaceText(data);
        if (data) {
            core.status.hero.notes.push(data);
            core.drawText("Archived notes added successfully!");
        } else {
            core.ui.closePanel();
        }
    });
}

actions.prototype._clickNotes_show = function () {
    core.playSound('Sure');
    core.status.hero.notes = core.status.hero.notes || [];
    var result = [];
    for (var i = 0; i < core.status.hero.notes.length; i += 5) {
        var v = [];
        for (var j = i; j < i + 5 && j < core.status.hero.notes.length; ++j) {
            v.push(j + 1 + ". " + this.__clickNotes_replaceText(core.status.hero.notes[j]));
        }
        result.push("\t[Archive Notes]" + v.join("\n"));
    }
    if (result.length == 0) result.push("There are currently no archived notes. Try adding one!\n(Menu bar -> Archive Notes -> Added archived notes)");
    core.drawText(result);
}

actions.prototype._clickNotes_edit = function () {
    core.status.hero.notes = core.status.hero.notes || [];
    if (core.status.hero.notes.length == 0) {
        core.drawText("There are currently no archived notes. Try adding one!");
    } else {
        core.myprompt("Please enter the archive note number to edit (1 - " + core.status.hero.notes.length + "）", "1", function (data) {
            if (!data) core.ui.closePanel();
            var value = parseInt(data) || 0;
            if (!value || value <= 0 || value > core.status.hero.notes.length) {
                core.drawText("Invalid input!");
            } else {
                core.myprompt("Please enter new content, no more than45Character", core.status.hero.notes[value - 1], function (data) {
                    data = core.actions.__clickNotes_replaceText(data);
                    if (data) {
                        core.status.hero.notes[value - 1] = data;
                        core.drawText("Archived note edited successfully!");
                    } else {
                        core.ui.closePanel();
                    }
                });
            }
        })
    }
}

actions.prototype._clickNotes_delete = function () {
    core.status.hero.notes = core.status.hero.notes || [];
    if (core.status.hero.notes.length == 0) {
        core.stopSound();
        core.playSound('Operation failed');
        core.drawText("There are currently no archived notes and cannot be deleted!");
    } else {
        core.myprompt("Please enter the IDs of all archived notes to be deleted, separated by commas. Leaving this field blank will delete all notes.", null, function (data) {
            if (data == null) {
                core.ui.closePanel();
                return;
            }
            else if (!data) {
                core.status.hero.notes = [];
                core.drawText("All archived notes deleted successfully!");
            } else {
                data = data.split(",").map(function (one) { return parseInt(one); })
                    .filter(function (one) { return one && one > 0 && one <= core.status.hero.notes.length });
                if (data.length == 0) {
                    core.drawText("No notes to delete!");
                } else {
                    data.sort(function (a, b) { return b - a; })
                        .forEach(function (index) {
                            core.status.hero.notes.splice(index - 1, 1);
                        });
                    core.drawText("Deleted " + data.sort().join(",") + " Notes");
                }
            }
        })
    }
}

////// 存档笔记页面时，放开某个键的操作 //////
actions.prototype._keyUpNotes = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 3;
        core.playSound('Cancel');
        core.ui._drawSettings();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickNotes);
}

////// 同步存档界面时的点击操作 //////
actions.prototype._clickSyncSave = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;
    var topIndex = this._getChoicesTopIndex(choices.length);
    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawSyncSelect();
                break;
            case 1:
                core.playSound('Sure');
                core.syncLoad();
                break;
            case 2:
                core.playSound('Sure');
                core.status.event.selection = 0;
                core.ui._drawLocalSaveSelect();
                break;
            case 3:
                core.playSound('Sure');
                return this._clickSyncSave_readFile();
            case 4:
                // core.playSound('确定');
                return this._clickSyncSave_replay();
            case 5:
                core.status.event.selection = 0;
                core.playSound('Sure');
                core.ui._drawStorageRemove();
                break;
            case 6:
                core.status.event.selection = 4;
                core.playSound('Cancel');
                core.ui._drawSettings();
                break;

        }
    }
    return;
}

actions.prototype._clickSyncSave_readFile = function () {
    core.readFile(function (obj) {
        if (obj.name != core.firstData.name) return alert("The save file and the game are inconsistent!");
        if (obj.version != core.firstData.version) return alert("The game version is inconsistent!");
        if (!obj.data) return alert("Invalid save file!");
        core.control._syncLoad_write(obj.data);
    }, null, ".h5save");
}

actions.prototype._clickSyncSave_replay = function () {
    core.ui._drawReplay();
}

////// 同步存档界面时，放开某个键的操作 //////
actions.prototype._keyUpSyncSave = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 4;
        core.playSound('Cancel');
        core.ui._drawSettings();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSyncSave);
}

////// 同步存档选择界面时的点击操作 //////
actions.prototype._clickSyncSelect = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);
    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                core.playSound('Sure');
                core.myconfirm('Are you sure you want to sync all saves?\nThis may be slow when there are many save files.', function () {
                    core.syncSave('all');
                });
                break;
            case 1:
                core.playSound('Sure');
                core.syncSave();
                break;
            case 2:
                core.status.event.selection = 0;
                core.playSound('Cancel');
                core.ui._drawSyncSave();
                break;
        }
    }
}

////// 同步存档选择界面时，放开某个键的操作 //////
actions.prototype._keyUpSyncSelect = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 0;
        core.playSound('Cancel');
        core.ui._drawSyncSave();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSyncSelect);
}

////// 存档下载界面时的点击操作 //////
actions.prototype._clickLocalSaveSelect = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);

    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        if (selection < 2) {
            var callback = function (saves) {
                if (saves) {
                    var content = {
                        "name": core.firstData.name,
                        "version": core.firstData.version,
                        "data": saves
                    }
                    core.download(core.firstData.name + "_" + core.formatDate2(new Date()) + ".h5save",
                        LZString.compressToBase64(JSON.stringify(content)));
                }
            };
            if (selection == 0) core.getAllSaves(callback);
            else core.getSave(core.saves.saveIndex, callback);
        }

        core.status.event.selection = 2;
        core.playSound('Cancel');
        core.ui._drawSyncSave();
    }
}

////// 存档下载界面时，放开某个键的操作 //////
actions.prototype._keyUpLocalSaveSelect = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 2;
        core.playSound('Cancel');
        core.ui._drawSyncSave();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickLocalSaveSelect);
}

////// 存档删除界面时的点击操作 //////
actions.prototype._clickStorageRemove = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);

    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0:
                return this._clickStorageRemove_all();
            case 1:
                return this._clickStorageRemove_current();
            case 2:
                core.status.event.selection = 5;
                core.playSound('Cancel');
                core.ui._drawSyncSave();
                break;
        }
    }
}

actions.prototype._clickStorageRemove_all = function () {
    core.myconfirm("Are you sure you want to clear all local saves for [All Games]?\nThis behavior is irreversible!!!", function () {
        core.ui.drawWaiting("Clearing, please wait...");
        core.clearLocalForage(function () {
            core.saves.ids = {};
            core.saves.autosave.data = null;
            core.saves.autosave.updated = false;
            core.saves.autosave.now = 0;
            core.saves.cache = {};
            core.ui.closePanel();
            core.saves.saveIndex = 1;
            core.saves.favorite = [];
            core.saves.favoriteName = {};
            core.control._updateFavoriteSaves();
            core.removeLocalStorage('saveIndex');
            core.drawText("\t[Operation successful]All your save files have been cleared.");
        });
    });
}

actions.prototype._clickStorageRemove_current = function () {
    core.myconfirm("Are you sure you want to clear all local saves for this game?\nThis behavior is irreversible!!!", function () {
        var done = function () {
            core.saves.ids = {};
            core.saves.autosave.data = null;
            core.saves.autosave.updated = false;
            core.saves.autosave.now = 0;
            core.ui.closePanel();
            core.saves.saveIndex = 1;
            core.saves.favorite = [];
            core.saves.favoriteName = {};
            core.control._updateFavoriteSaves();
            core.removeLocalStorage('saveIndex');
            core.drawText("\t[Operation successful]The current towers save has been cleared.");
        }
        core.ui.drawWaiting("Clearing, please wait...");
        Object.keys(core.saves.ids).forEach(function (v) {
            core.removeLocalForage("save" + v);
        });
        core.removeLocalForage("autoSave", done);
    });
}

////// 存档删除界面时，放开某个键的操作 //////
actions.prototype._keyUpStorageRemove = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 5;
        core.playSound('Cancel');
        core.ui._drawSyncSave();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickStorageRemove);
}

////// 回放选择界面时的点击操作 //////
actions.prototype._clickReplay = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);

    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0: core.playSound('Sure'); return this._clickReplay_fromBeginning();
            case 1: core.playSound('Sure'); return this._clickReplay_fromLoad();
            case 2: core.playSound('Sure'); return this._clickReplay_replayRemain();
            case 3: core.playSound('Sure'); return this._clickReplay_replaySince();
            case 4: core.playSound('Sure'); return core.chooseReplayFile();
            case 5: core.playSound('Sure'); return this._clickReplay_download();
            case 6: core.playSound('Cancel'); return core.ui.closePanel();
        }
    }
}

actions.prototype._clickReplay_fromBeginning = function () {
    core.ui.closePanel();
    core.startGame(core.status.hard, core.getFlag('__seed__'), core.cloneArray(core.status.route));
}

actions.prototype._clickReplay_fromLoad = function () {
    core.status.event.id = 'replayLoad';
    core.status.event.selection = null;
    core.clearUI();
    var saveIndex = core.saves.saveIndex;
    var page = parseInt((saveIndex - 1) / 5), offset = saveIndex - 5 * page;
    core.ui._drawSLPanel(10 * page + offset);
}

actions.prototype._clickReplay_replayRemain = function () {
    core.closePanel();
    core.drawText([
        "\t[Continue playing video]This feature allows you to play\r[yellow]Recording between two archives\r, often used for\r[yellow]Regional Optimization\r.\n" +
        "For example, there are several areas that have all been cleared; after re-playing an area and optimizing it, you can directly play the video of the remaining areas without having to re-play them all.\n\n" +
        "For detailed usage, please refer to the video tutorial recorded by Luzhu:\n\r[yellow]https://bilibili.com/video/BV1az4y1C78x",
        "\t[step1]Please select an archive.\n\r[yellow]The coordinates of this archive must be exactly the same as the current warriors coordinates.\r\nWill attempt to start playback from here.",
    ], function () {
        core.status.event.id = 'replayRemain';
        core.lockControl();
        var saveIndex = core.saves.saveIndex;
        var page = parseInt((saveIndex - 1) / 5), offset = saveIndex - 5 * page;
        core.ui._drawSLPanel(10 * page + offset);
    });
}

actions.prototype._clickReplay_replaySince = function () {
    core.closePanel();
    core.drawText([
        "\t[Play remaining archived videos]This function is a simplified version of [Continue to play recording], allowing you to play\r[yellow]Remaining recordings in an archive\r, often used for\r[yellow]Local video optimization\r.\n" +
        "During normal playback, you can pause and pressSkey to archive; at this time\r[yellow]Remaining Videos\rIt will also be recorded in the archive (use\r[yellow][R]\rLogo.\n" +
        "Afterwards, you can choose to play the saved game directly after route optimization.\r[yellow]Remaining Videos\r, without having to select the start and end points of the recording like continuous playback.\n\n" +
        "For detailed usage, please refer to the video tutorial recorded by Luzhu:\n\r[yellow]https://bilibili.com/video/BV1az4y1C78x",
        "Please select an archive.\n\n\r[yellow]The archive file must be saved during the video playback, and the coordinates must be exactly the same as the current warriors coordinates.\r\nAn attempt will be made to play the remaining recordings from this archive.",
    ], function () {
        core.status.event.id = 'replaySince';
        core.lockControl();
        var saveIndex = core.saves.saveIndex;
        var page = parseInt((saveIndex - 1) / 5), offset = saveIndex - 5 * page;
        core.ui._drawSLPanel(10 * page + offset);
    });
}

actions.prototype._clickReplay_download = function () {
    // if (core.hasFlag('debug')) return core.drawText("\t[系统提示]调试模式下无法下载录像");
    core.download(core.firstData.name + "_" + core.formatDate2() + ".h5route",
        LZString.compressToBase64(JSON.stringify({
            'name': core.firstData.name,
            'hard': core.status.hard,
            'seed': core.getFlag('__seed__'),
            'route': core.encodeRoute(core.status.route)
        })));

}

////// 回放选择界面时，放开某个键的操作 //////
actions.prototype._keyUpReplay = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickReplay);
}

////// 游戏信息界面时的点击操作 //////
actions.prototype._clickGameInfo = function (x, y) {
    if (this._out(x)) return;
    var choices = core.status.event.ui.choices;

    var topIndex = this._getChoicesTopIndex(choices.length);

    if (y >= topIndex && y < topIndex + choices.length) {
        var selection = y - topIndex;
        core.status.event.selection = selection;
        switch (selection) {
            case 0: return core.ui._drawStatistics();
            case 1: return this._clickGameInfo_openProject();
            case 2: return this._clickGameInfo_openComments();
            case 3: return core.ui._drawHelp();
            case 4: return core.ui._drawAbout();
            case 5: return this._clickGameInfo_download();
            case 6:
                core.status.event.selection = 5;
                core.playSound('Cancel');
                core.ui._drawSettings();
                break;
        }
    }
}

actions.prototype._clickGameInfo_openProject = function () {
    if (core.platform.isPC)
        window.open("editor.html", "_blank");
    else {
        core.myconfirm("You are about to leave this game and jump to the project page. Confirm?", function () {
            window.location.href = "editor-mobile.html";
        });
    }
}

actions.prototype._clickGameInfo_openComments = function () {
    if (core.platform.isPC) {
        window.open("/score.php?name=" + core.firstData.name, "_blank");
    }
    else {
        core.myconfirm("You are about to leave this game and jump to the comment page, are you sure?", function () {
            window.location.href = "/score.php?name=" + core.firstData.name;
        });
    }
}

actions.prototype._clickGameInfo_download = function () {
    if (core.platform.isPC)
        window.open(core.firstData.name + ".zip");
    else
        window.location.href = core.firstData.name + ".zip";
}

////// 游戏信息界面时，放开某个键的操作 //////
actions.prototype._keyUpGameInfo = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.status.event.selection = 5;
        core.playSound('Cancel');
        return core.ui._drawSettings();
    }
    this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickGameInfo);
}

////// “虚拟键盘”界面时的点击操作 //////
actions.prototype._clickKeyBoard = function (x, y) {
    var m = this._HX_;
    if (y == this._HY_ - 3 && x >= m - 5 && x <= m + 5) {
        core.ui.closePanel();
        core.keyUp(112 + x + 5 - m);
    }
    if (y == this._HY_ - 2 && x >= m - 5 && x <= m + 4) {
        core.ui.closePanel();
        core.keyUp(x == m + 4 ? 48 : 49 + x + 5 - m); // 1-9: 49-57; 0: 48
    }
    // 字母
    var lines = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
    ];
    if (y == this._HY_ - 1 && x >= m - 5 && x <= m + 4) {
        core.ui.closePanel();
        core.keyUp(lines[0][x + 5 - m].charCodeAt(0));
    }
    if (y == this._HY_ && x >= m - 5 && x <= m + 3) {
        core.ui.closePanel();
        core.keyUp(lines[1][x + 5 - m].charCodeAt(0));
    }
    if (y == this._HY_ + 1 && x >= m - 5 && x <= m + 1) {
        core.ui.closePanel();
        core.keyUp(lines[2][x + 5 - m].charCodeAt(0));
    }
    if (y == this._HY_ + 2 && x >= m - 5 && x <= m + 5) {
        core.ui.closePanel();
        if (x == m - 5) core.keyUp(189); // -
        if (x == m - 4) core.keyUp(187); // =
        if (x == m - 3) core.keyUp(219); // [
        if (x == m - 2) core.keyUp(221); // ]
        if (x == m - 1) core.keyUp(220); // \
        if (x == m) core.keyUp(186); // ;
        if (x == m + 1) core.keyUp(222); // '
        if (x == m + 2) core.keyUp(188); // ,
        if (x == m + 3) core.keyUp(190); // .
        if (x == m + 4) core.keyUp(191); // /
        if (x == m + 5) core.keyUp(192); // `
    }
    if (y == this._HY_ + 3 && x >= m - 5 && x <= m + 4) {
        core.ui.closePanel();
        if (x == m - 5) core.keyUp(27); // ESC
        if (x == m - 4) core.keyUp(9); // TAB
        if (x == m - 3) core.keyUp(20); // CAPS
        if (x == m - 2) core.keyUp(16); // SHIFT
        if (x == m - 1) core.keyUp(17); // CTRL
        if (x == m) core.keyUp(18); // ALT
        if (x == m + 1) core.keyUp(32); // SPACE
        if (x == m + 2) core.keyUp(8); // BACKSPACE
        if (x == m + 3) core.keyUp(13); // ENTER
        if (x == m + 4) core.keyUp(46); // DEL
    }
    if (y == this._HY_ + 4 && x >= m + 3 && x <= m + 5) {
        core.playSound('Cancel');
        core.ui.closePanel();
    }
}

////// 光标界面时的点击操作 //////
actions.prototype._clickCursor = function (x, y, px, py) {
    if (x == core.status.automaticRoute.cursorX && y == core.status.automaticRoute.cursorY) {
        core.ui.closePanel();
        // 视为按下再放起
        this.doRegisteredAction('ondown', x, y, px, py);
        this.doRegisteredAction('onup', x, y, px, py);
        return;
    }
    core.status.automaticRoute.cursorX = x;
    core.status.automaticRoute.cursorY = y;
    core.ui._drawCursor();
}

////// 光标界面时，按下某个键的操作 //////
actions.prototype._keyDownCursor = function (keycode) {
    if (keycode == 37) { // left
        core.status.automaticRoute.cursorX--;
        core.playSound('Cursor Movement');
        core.ui._drawCursor();
        return;
    }
    if (keycode == 38) { // up
        core.status.automaticRoute.cursorY--;
        core.playSound('Cursor Movement');
        core.ui._drawCursor();
        return;
    }
    if (keycode == 39) { // right
        core.status.automaticRoute.cursorX++;
        core.playSound('Cursor Movement');
        core.ui._drawCursor();
        return;
    }
    if (keycode == 40) { // down
        core.status.automaticRoute.cursorY++;
        core.playSound('Cursor Movement');
        core.ui._drawCursor();
        return;
    }
}

////// 光标界面时，放开某个键的操作 //////
actions.prototype._keyUpCursor = function (keycode) {
    if (keycode == 27 || keycode == 88) {
        core.playSound('Cancel');
        core.ui.closePanel();
        return;
    }
    if (keycode == 13 || keycode == 32 || keycode == 67 || keycode == 69) {
        core.playSound('Sure');
        core.ui.closePanel();
        var x = core.status.automaticRoute.cursorX;
        var y = core.status.automaticRoute.cursorY;
        // 视为按下再放起
        this.doRegisteredAction('ondown', x, y, 32 * x + 16, 32 * y + 16);
        this.doRegisteredAction('onup', x, y, 32 * x + 16, 32 * y + 16);
        return;
    }
}
