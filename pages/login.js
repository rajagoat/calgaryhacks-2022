const Login = () => {
    return (
        <div>
            <h1>Log in</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password"/>
            </form>
        </div>
    );
}
 
export default Login;