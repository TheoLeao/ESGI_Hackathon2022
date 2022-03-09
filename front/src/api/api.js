const BASE_URL = "http://hackathon.alexis-guay.fr/api/";

const DEV = true;
const TOKEN = "3|3WAPauiyEbeYGr4FRpZg1hHtagkj1KmsIs4Q81ow";

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
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}users/${userId}`, requestOptions);
    return await req.json();
}

export async function users() {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}users`, requestOptions);
    return await req.json();
}

export async function me() {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}user`, requestOptions);
    return await req.json();
}

export async function campaigns() {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export async function campaign(campaignId) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns/${campaignId}`, requestOptions);
    return await req.json();
}

export async function createCampaign(data) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

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
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export function metricsSession(sessionId) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}metrics/${sessionId}`, requestOptions);
    return await req.json();
}

export function survey(sessionId) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = fetch(`${BASE_URL}metrics/${sessionId}`, requestOptions);
    return await req.json();
}

export function createSession(data) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    // TODO complete
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("campaign_id", data.campaign_id);
    formdata.append("start", data.date_start);
    formdata.append("end", data.date_end);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers,
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export function deleteCampaign(campaignId) {
    const token = sessionStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    console.log("TODO DELETE", campaignId);
    // TODO complete
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("campaign_id", data.campaign_id);
    formdata.append("start", data.date_start);
    formdata.append("end", data.date_end);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers,
    };

    const req = fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}
