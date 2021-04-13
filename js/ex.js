//cree un ajax object 
var Ajax = new XMLHttpRequest();
//cree un list de donee
var object = [];

/*** hna kaykon had listiner kytsana ila jra chi taghyir fl7ala dyal ajax 
matalan flwel katkon readystate ktkhalf 4 ya3ny machi mojoda databa bach n9rawha 
ghi katbdal katkhdam had function o knchufo wach wlat 4 z3ma wlat mojoda 
***/
Ajax.onreadystatechange = function() {
        //ready state kt9dar tsawy 
        /* 
0: request not initialized
1: server connection established
2: request received
3: processing request
4: request finished and response is ready
    
   statue kt9dar tsawy 
200: "OK"
403: "Forbidden"
404: "Page not found"
   */
        if (this.readyState == 4 && this.status == 200) {
            try {
                //convert les ficher json l list de donee 
                object = JSON.parse(this.responseText);


            } catch (error) {
                // hna ila kan chi error ola chi mochkil kanjiw lhad lcatch 
            }

        }
    }
    // hna kan3tiwha lien dl fichier lifih data ela chkal json
Ajax.open('lien de fiecher');
// had send ghi bach ngolo lih dir khdmtq
Ajax.send();