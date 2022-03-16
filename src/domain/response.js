class Response {
  /*
  Class responsible for sending more complete data to the front-end, 
  so we can better handle the information and avoid sending sensitive data  
  */

  constructor(statusCode, httpStatus, message, data) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode
    this.httpStatus = httpStatus
    this.message = message
    this.data = data
  }
}

export default Response
