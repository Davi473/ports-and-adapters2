import axios from "axios";

axios.defaults.validateStatus = () => true;

test("create account", async () => {
    const account = {
        name: "Test API",
        email: `fulano${Math.random()}@gmail.com`,
        password: "1234"
    }
    const responseAccount = await axios.post("http://localhost:3000/register", account);
    const outputAccount = responseAccount.data;
    const responseGetAccount = await axios.get(`http://localhost:3000/account/${outputAccount.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.name).toBe(account.name);
    expect(outputGetAccount.email).toBe(account.email);
    expect(outputGetAccount.password).toBe(account.password);
});