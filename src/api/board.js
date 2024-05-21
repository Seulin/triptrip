import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listQnA(param, success, fail) {
  local.get(`/question`, { params: param }).then(success).catch(fail);
}

function detailQnA(qnano, success, fail) {
  local.get(`/question/${qnano}`).then(success).catch(fail);
}

function registQnA(qna, success, fail) {
  console.log("questionjs qna", qna);
  local.post(`/question`, JSON.stringify(qna)).then(success).catch(fail);
}

function getQnA(qnano, success, fail) {
  local.get(`/question/${qnano}`).then(success).catch(fail);
}

function modifyQnA(qna, success, fail) {
  local.put(`/question`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteQnA(qnano, success, fail) {
  local.delete(`/question/${qnano}`).then(success).catch(fail);
}

export {
  listQnA,
  detailQnA,
  registQnA,
  getQnA,
  modifyQnA,
  deleteQnA,
};
