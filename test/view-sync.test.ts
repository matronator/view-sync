import { describe, expect, it } from 'vitest';
import { ViewSync } from '../src/index';

describe("construct", () => {
    it("Values should be equal", () => {
        const wrapper = document.createElement("div");
        const input = document.createElement("input");
        const output = document.createElement("span");
        wrapper.dataset.syncInit = "test";
        wrapper.dataset.syncValue = "Hello, World!";

        input.dataset.sync = "test";
        output.dataset.syncText = "test";

        wrapper.appendChild(input);
        wrapper.appendChild(output);
        document.body.appendChild(wrapper);

        ViewSync.Init();

        input.value = "Hello, World!";
        input.dispatchEvent(new Event("input"));

        expect(output.textContent).toBe("Hello, World!");
    });
});
