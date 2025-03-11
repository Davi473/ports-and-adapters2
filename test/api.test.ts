import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Register account", async () => {
    const account = {
        name: "Test API",
        email: `srcodorninha1@gmail.com`,
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

test("Login account", async () => {
    const login = {
        email: "fulano@gmail.com",
        password: "123"
    };
    const responseRegister = await axios.post("http://localhost:3000/register", {name: "Fulano De Tal", ...login});
    const responseGetAccount = await axios.get(`http://localhost:3000/account/${responseRegister.data.accountId}`);
    expect(responseGetAccount.data.name)
    const responseAccount = await axios.post("http://localhost:3000/login", login);
    const outputAccount = responseAccount.data;
    expect(!!outputAccount.token).toBe(true);
});