import { expect, test, describe } from "vitest";
import * as log from "../src/log/log";
// @ponicode
describe("log.addLog", () => {
    test("0", () => {
        let result: any = log.addLog({ level: "c466a48309794261b64a4f02cfcc3d64", message: "Error getting key from: %s" })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = log.addLog({ level: "da7588892", message: "Message recipient is not the grader, the person being graded, or the controller" })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = log.addLog({ level: "12345", message: "cannot be found." })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = log.addLog({ level: "12345", message: "New Error " })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = log.addLog({ level: "bc23a9d531064583ace8f67dad60f6bb", message: "Error:" })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = log.addLog({ level: "", message: "" })
        expect(result).toMatchSnapshot()
    })

    test("6", () => {
        let result: any = log.addLog({ level: "12345", message: "Missing FileUri configuration" })
        expect(result).toMatchSnapshot()
    })

    test("7", () => {
        let result: any = log.addLog({ level: "c466a48309794261b64a4f02cfcc3d64", message: "Counterparty sent error: %s" })
        expect(result).toMatchSnapshot()
    })

    test("8", () => {
        let result: any = log.addLog({ level: "9876", message: "Unable to find your git executable - Shutdown SickBeard and EITHER <a href=\"http://code.google.com/p/sickbeard/wiki/AdvancedSettings\" onclick=\"window.open(this.href); return false;\">set git_path in your config.ini</a> OR delete your .git folder and run from source to enable updates." })
        expect(result).toMatchSnapshot()
    })

    test("9", () => {
        let result: any = log.addLog({ level: "9876", message: "Warning: " })
        expect(result).toMatchSnapshot()
    })

    test("10", () => {
        let result: any = log.addLog({ level: "da7588892", message: "Could not find a submission object for message from xqueue" })
        expect(result).toMatchSnapshot()
    })
})
