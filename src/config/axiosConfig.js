let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Authorization": 'Bearer' + localStorage.getItem('token')
    }
};

export default axiosConfig;