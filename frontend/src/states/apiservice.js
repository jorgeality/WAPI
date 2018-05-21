export default class ApiService {
    constructor(apiurl)
    {
        this.apiurl = "http://127.0.0.1:5000/api/v1/";
    }
    
    getPalabras() {
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

    putPalabra(success,palabra){
        var exito = "no"
        if(success == 1)
        {
            exito = "si"
        }
        var myHeaders = new Headers({
            'Content-Type':'application/json',
            "exito":exito
        });
        let url= this.apiurl +"palabras/"+palabra;
        fetch(url,{method: 'PUT', headers: myHeaders
        }).then(function(response){
            return response
        }).catch(function(error){console.log('error: ',error)});
    }
}