import { API_GET_ALL_TRACKS_ENDPOINT } from "../api/endpoints";
import { getRequest } from "../api/methods";

import { ITrack } from "../interfaces";

export const getAllTracks = async () => {
  try {
    const tracks = await getRequest<ITrack[]>(API_GET_ALL_TRACKS_ENDPOINT);
    return tracks;
  } catch (error) {
    // handle error
    return [];
  }
};
