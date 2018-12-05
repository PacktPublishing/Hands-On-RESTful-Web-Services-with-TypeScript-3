"use strict";
exports.__esModule = true;
var Queue = /** @class */ (function () {
    function Queue(initialData) {
        var _a;
        if (initialData === void 0) { initialData = []; }
        this._store = [];
        (_a = this._store).push.apply(_a, initialData);
    }
    Queue.prototype.push = function (val) {
        this._store.push(val);
    };
    Queue.prototype.pop = function () {
        return this._store.shift();
    };
    Queue.prototype.isEmpty = function () {
        return this._store.length === 0;
    };
    Queue.prototype.size = function () {
        return this._store.length;
    };
    return Queue;
}());
exports.Queue = Queue;
