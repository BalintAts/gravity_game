const tokenConfig = {
    headers: {
        Authorization: 'Bearer' + localStorage.getItem('token')
    }
}

export default tokenConfig;