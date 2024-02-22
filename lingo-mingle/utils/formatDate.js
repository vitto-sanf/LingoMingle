const formatDate = (rawDate) => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${day}/${month}/${year}`;
};

export const formatTimestamp = (timestamp) => {
  const formattedTime = new Date(timestamp).toLocaleString();
  return formattedTime;
};


export default formatDate;
