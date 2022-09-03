const getIndexPage = (req, res) => {
    console.log("Request user: " + req.user);
    res.render("index",
        {
            active_page: 'Home'
        }
    );
}

const getAboutPage = (req, res) => {
    res.render("about",
        {
            active_page: 'About'
        }
    );
}

const getRegisterPage = (req, res) => {
    res.render("register",
        {
            active_page: 'Register'
        }
    );
}

const getLoginPage = (req, res) => {
    res.render("login",
        {
            active_page: 'Login'
        }
    );
}

export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage };