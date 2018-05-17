export default class ApiService {
    constructor(apiurl, headers)
    {
        this.apiurl = "http://127.0.0.1:5000/api/v1/";
        this.headers = new Headers({
            
        });
    }
    
    getPalabras () {
        //URL    
        let url= this.apiurl + "palabras";
        //Fetch!
        return fetch(url,{method: 'GET',
        header: {'Content-Type':'applicaciont/json'}})
        .then(function(response){
            return response.json();
        }).then(function(json){
            console.log('parsed json', json);
            return json;
        }).catch(function(error){console.log('error: ',error)});
    }
}