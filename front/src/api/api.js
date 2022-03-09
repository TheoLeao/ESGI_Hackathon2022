const BASE_URL = "http://hackathon.alexis-guay.fr/api/";

export async function login(email, password) {
    const formdata = new FormData();
    formdata.append("password", password);
    formdata.append("email", email);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}login`, requestOptions);
    const rep = await req.json();

    token = rep["token"];
    sessionStorage.setItem("token", token);
    return rep;
}

export async function register(data) {
    // TODO complete
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("password", data.password);
    formdata.append("email", data.email);
    formdata.append("password_confirmation", data.passwordConfirmation);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}create-account`, requestOptions);
    const rep = await req.json();

    token = rep["token"];
    sessionStorage.setItem("token", token);
    return rep;
}

export async function user(userId) {
    const token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}users/${userId}`, requestOptions);
    return await req.json();
}

export async function users() {
    const token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}users`, requestOptions);
    return await req.json();
}

export async function me() {
    const token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}user`, requestOptions);
    return await req.json();
}

export async function campaigns() {
    const token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export async function campaign(campaignId) {
    const token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns/${campaignId}`, requestOptions);
    return await req.json();
}

export async function createCampaign(data) {
    // TODO complete
    const formdata = new FormData();
    formdata.append("product_name", data.product_name);
    formdata.append("product_brand", data.product_brand);
    formdata.append("product_code", data.product_code);
    formdata.append("product_category", data.product_category);
    formdata.append("product_picture", data.product_picture);
    formdata.append("product_description", data.product_description);
    formdata.append("name", data.campaign_name);
    formdata.append("state", data.campaign_state);
    formdata.append("description", data.campaign_description);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}
