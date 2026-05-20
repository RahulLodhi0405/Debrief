export const getRevision = () => {
  return JSON.parse(localStorage.getItem("revision")) || {};
};

export const saveRevision = (data) => {
  localStorage.setItem("revision", JSON.stringify(data));
};