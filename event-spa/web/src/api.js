import store from './store';

async function api_get(path) {
  let text = await fetch(
    "http://events-spa.teresewang.com:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://events-spa.teresewang.com:4000/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: 'users/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_events() {
  api_get("/events").then((data) => {
    let action = {
      type: 'events/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function api_login(email, password) {
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
     let action = {
        type: 'error/set',
        data: data.error,
      }
      store.dispatch(action);
    }
  });
}

export function create_user(user) {
  return api_post("/users", {user});
}

export async function create_event(event){
  let data = new FormData();
  data.append("event[date]", event.date)
  data.append("event[description]", event.description);
  data.append("event[name]", event.name);
  fetch("http://events-spa.teresewang.com:4000/api/v1/events", {
    method: 'POST',
    body: data,
  }).then((resp) => {
    console.log(resp);
  });
}

export function load_defaults() {
  fetch_events();
  fetch_users();
}
