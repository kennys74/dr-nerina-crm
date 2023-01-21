import { del, get, post, update } from "./api_helper";
import * as url from "./url_helper";

// get clients
export const getClients = () => get(url.GET_CLIENTS);

// add client
export const addNewClient = (client) => post(url.ADD_NEW_CLIENT, client);

// update client
export const updateClient = (client) => update(url.UPDATE_CLIENT, client);

// delete client
export const deleteClient = (client) =>
  del(url.DELETE_CLIENT, { headers: { client } });
