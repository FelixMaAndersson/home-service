const TestService = {
    async getString() {
        return "somestring"
    },
    async getNum() {
        return Math.random()
    }
}
Object.freeze(TestService)

export default TestService