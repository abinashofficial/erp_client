// src/google.d.ts
declare global {
    interface Window {
      gapi: any;
      google: any;
    }
  
    // Extend gapi.auth2
    namespace gapi.auth2 {
      function getAuthInstance(): any;
      function init(params: any): Promise<any>;
    }
  }
  
  export {};
  