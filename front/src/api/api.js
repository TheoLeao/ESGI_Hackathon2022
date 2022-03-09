const BASE_URL = "http://hackathon.alexis-guay.fr/api/";

const DEV = true;
const TOKEN = "3|3WAPauiyEbeYGr4FRpZg1hHtagkj1KmsIs4Q81ow";

export async function login(email, password) {
    const body = new FormData();
    body.append("password", password);
    body.append("email", email);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}login`, requestOptions);
    const rep = await req.json();

    const token = rep["token"];
    sessionStorage.setItem("token", token);
    return rep;
}

export async function register(data) {
    // TODO complete
    const body = new FormData();
    body.append("name", data.name);
    body.append("password", data.password);
    body.append("email", data.email);
    body.append("password_confirmation", data.passwordConfirmation);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}create-account`, requestOptions);
    const rep = await req.json();

    const token = rep["token"];
    sessionStorage.setItem("token", token);
    return rep;
}

export async function user(userId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}users/${userId}`, requestOptions);
    return await req.json();
}

export async function users() {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}users`, requestOptions);
    return await req.json();
}

export async function me() {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}user`, requestOptions);
    return await req.json();
}

export async function campaigns() {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export async function campaign(campaignId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}campaigns/${campaignId}`, requestOptions);
    return await req.json();
}

export async function createCampaign(data) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    // TODO complete
    const body = new FormData();
    body.append("product_name", data.product_name);
    body.append("product_brand", data.product_brand);
    body.append("product_code", data.product_code);
    body.append("product_category", data.product_category);
    body.append("product_picture", data.product_picture);
    body.append("product_description", data.product_description);
    body.append("name", data.campaign_name);
    body.append("state", data.campaign_state);
    body.append("description", data.campaign_description);

    const requestOptions = {
        method: "POST",
        body,
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export async function metricsSession(sessionId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}metrics/${sessionId}`, requestOptions);
    return await req.json();
}

export async function survey(sessionId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}survey/${sessionId}`, requestOptions);
    return await req.json();
}

export async function answer(sessionId, data) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const body = new FormData();
    body.append("session_id", sessionId);
    for (const [key, value] of Object.entries(data)) {
        body.append(key, value);
    }

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
        headers,
    };

    const req = await fetch(`${BASE_URL}answer`, requestOptions);
    return await req.json();
}

export async function createSession(data) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    // TODO complete
    const body = new FormData();
    body.append("name", data.name);
    body.append("description", data.description);
    body.append("campaign_id", data.campaign_id);
    body.append("start", data.date_start);
    body.append("end", data.date_end);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
        headers,
    };

    const req = await fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}

export async function deleteCampaign(campaignId) {
    //TODO
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    console.log("TODO DELETE", campaignId);
    // TODO complete
    const body = new FormData();
    body.append("name", data.name);
    body.append("description", data.description);
    body.append("campaign_id", data.campaign_id);
    body.append("start", data.date_start);
    body.append("end", data.date_end);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
        headers,
    };

    const req = await fetch(`${BASE_URL}campaigns`, requestOptions);
    return await req.json();
}
