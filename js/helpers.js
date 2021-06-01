const checkFetchResponseStatus = (response) => {
  if(response.ok){
    return Promise.resolve(response)
  } else{
    return Promise.reject(new Error(response.statusText))
  }
}

const formatSimpleDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if(date.getFullYear() < today.getFullYear()) {
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  return date.toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric'
  });
}
export {
  checkFetchResponseStatus,
  formatSimpleDate
}
