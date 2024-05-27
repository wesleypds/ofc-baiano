const baseURL = 'http://localhost:8080/api'; 

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const fetchData = async (url, options) => {
  try {
    const response = await fetch(baseURL + url, options);
    return response.json(); 
  } catch (error) {
    return {
      error: true,
      message: error.message || 'Algo deu errado'
    };
  }
};

export const get = async (url) => {
  return fetchData(url, {
    method: 'GET',
    headers,
  });
};


export const getByParams = async (url, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;
    console.log(fullUrl)
    return fetchData(fullUrl, {
        method: 'GET',
        headers,
    });
};

export const postData = async (url, data) => {
  return fetchData(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
};

export const put = async (url, data) => {
  return fetchData(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
};


export const del = async (url, id) => {
  const fullUrl = `${url}/${id}`;
  return fetchData(fullUrl, {
    method: 'DELETE',
    headers,
  });
};
