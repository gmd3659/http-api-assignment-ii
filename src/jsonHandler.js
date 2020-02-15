const users = {};
let count = 0;

const respondJSON = (resuest, response, status, object) => {
  // Set status code and type
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // Stringify and write response obj
  response.write(JSON.stringify(object));
  // End response
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, params) => {
  if (!users[response.name]) {
    const newUser = {
      name: params.name,
      age: params.age,
    };


    const obj = JSON.parse(params);
    console.dir(obj);

    users[count] = newUser;
    count++;

    return respondJSON(request, response, 201, newUser);
  }
  users[response.name].age = response.age;
  return respondJSON(request, response, 204);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'Error: Not Real',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
  notFound,
};
