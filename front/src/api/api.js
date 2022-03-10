const BASE_URL = "http://hackathon.alexis-guay.fr/api/";

const DEV = true;
const TOKEN = "1|b2gefWLpMoJTpwcD8qVVn81lZqN2Vhg9z6bmi5sg";

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
    const role = rep["role"];
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    return rep;
}

export async function register(data) {
    // TODO complete
    const body = new FormData();
    body.append("street", data.street);
    body.append("city", data.city);
    body.append("zipcode", data.zipCode);
    body.append("country", data.country);
    body.append("name", data.name);
    body.append("password", data.password);
    body.append("email", data.email);
    body.append("password_confirmation", data.passwordConfirmation), body.append("phone", data.phone);
    body.append("birth", data.birth);
    body.append("size", data.size);
    body.append("weight", data.weight);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}create-account`, requestOptions);
    const rep = await req.json();

    const token = rep["token"];
    const role = rep["role"];
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
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

export async function getCampaigns() {
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

export async function getCampaignById(campaignId) {
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
    const body = new FormData();
    body.append("name", data.name);
    body.append("description", data.description);
    body.append("campaign_id", data.campaign_id);
    // let timeElapsed = Date.now();
    // let today = new Date(timeElapsed);
    // let startDate = today.toLocaleDateString();
    body.append("start", data.date_end);
    body.append("end", data.date_end);

    const requestOptions = {
        method: "POST",
        body,
        redirect: "follow",
        headers,
    };

    const req = await fetch(`${BASE_URL}sessions`, requestOptions);
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

export async function requests(campaignId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "GET",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}campaigns/${campaignId}/requests`, requestOptions);
    return await req.json();
}

export async function request(campaignId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    var requestOptions = {
        method: "POST",
        headers,
        redirect: "follow",
    };

    const req = await fetch(`${BASE_URL}campaigns/${campaignId}/request`, requestOptions);
    return await req.json();
}

export async function acceptUserIntoSession(sessionId, userId) {
    const token = sessionStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${DEV ? TOKEN : token}`);

    const body = new FormData();
    body.append("user_id", userId);

    var requestOptions = {
        method: "POST",
        headers,
        redirect: "follow",
        body,
    };

    const req = await fetch(`${BASE_URL}sessions/${sessionId}/accept-user`, requestOptions);
    return await req.json();
}
