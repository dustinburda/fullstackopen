import axios from 'axios'
const baseUrl = 'http://localhost:3008/api/notes'

const getAll = () => {
  console.log("Get All!")
  const request = axios.get(baseUrl)
  return request.then(request => request.data)
}

const create = newObject => {
  console.log("Creating: ", newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(request => request.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(request => request.data)
}

export default { getAll, create, update }