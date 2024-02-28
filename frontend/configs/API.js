import axios from "axios";

const baseConfig = {
  baseURL: "http://192.168.1.42:8000/api/",
};

export const endpoints = {
  users: "users/",
  user: (userId) => `users/${userId}/`,
  changePassword: "users/change-password/",
  currentUser: "users/current-user/",
  publicUsers: "public-users/",
  theses: "theses/",
  notActiveTheses: "theses/not-active/",
  activeTheses: "theses/active/",
  notCouncilTheses: "theses/not-council/",
  thesis: (thesisId) => `theses/${thesisId}/`,
  createThesis: `theses/create-thesis/`,
  updateThesis: (thesisId) => `theses/${thesisId}/update-thesis/`,
  uploadFile: (thesisId) => `theses/${thesisId}/upload-files/`,
  toggleThesis: (thesisId) => `theses/${thesisId}/toggle-active/`,
  myThesis: "theses/my-thesis/",
  thesisReivews: (thesisId) => `theses/${thesisId}/reviews/`,
  addReview: (thesisId) => `theses/${thesisId}/add-review/`,
  updateReview: (thesisId) => `theses/${thesisId}/update-review/`,
  councils: "councils/",
  council: (councilId) => `councils/${councilId}/`,
  councilMembers: (councilId) => `councils/${councilId}/members/`,
  councilTheses: (councilId) => `councils/${councilId}/theses/`,
  updateCouncilTheses: (councilId) => `councils/${councilId}/update-theses/`,
  updateCouncilMembers: (councilId) => `councils/${councilId}/update-members/`,
  updateCouncilMemberRole: (councilId) =>
    `councils/${councilId}/update-member-role/`,
  toggleCouncil: (councilId) => `councils/${councilId}/toggle-active/`,
  lecturerCouncils: "councils/lecturer-councils/",
  myReview: (thesisId) => `theses/${thesisId}/my-review/`,
  plot: "plot/",
};

const createAuthAPI = (accessToken, params = {}) =>
  axios.create({
    ...baseConfig,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
    params,
  });

export const authAPIWithParams = (accessToken, params) =>
  createAuthAPI(accessToken, {
    page: params.page,
    search: params.search,
    filter: params.filter,
  });

export const authAPIWithoutParams = (accessToken) => createAuthAPI(accessToken);

export default axios.create(baseConfig);
