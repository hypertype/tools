export {expect, assert, should, use} from "chai";

export function suite(target) {
}

export function test(target, key, descriptor) {
    const instance = new target.constructor();
    it(key, async () => {
        await instance[key]();
    });
    return descriptor;
}
