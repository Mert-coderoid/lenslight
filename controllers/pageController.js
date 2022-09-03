const getIndexPage = (req, res) => {
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

export { getIndexPage, getAboutPage };