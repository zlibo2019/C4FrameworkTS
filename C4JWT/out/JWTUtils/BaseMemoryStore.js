"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseMemoryStore {
    constructor() {
        this.m_TokenStore = {};
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_TokenStore = {};
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.m_TokenStore[key];
        });
    }
    set(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_TokenStore[key] = data;
            return true;
        });
    }
    clear(key) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.m_TokenStore.key;
        });
    }
}
exports.default = BaseMemoryStore;
;
//# sourceMappingURL=BaseMemoryStore.js.map