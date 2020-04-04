class Utils {
  static parseRequestURL() {
      const url = location.hash.slice(2),
          request = {};

      [request.resource, request.id, request.action] = url.split('/');

      return request;
  }

  static generateID() {
      return Math.random().toString(36).substr(2, 10);
  }
}

export default Utils;
