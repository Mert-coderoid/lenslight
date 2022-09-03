const staticFilesOptions = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders (res, path, stat) {
    res.set('x-timestamp', Date.now())
    }
}

export { staticFilesOptions }