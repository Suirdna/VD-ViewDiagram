/*

    ██╗   ██╗██╗███████╗██╗    ██╗        ██████╗ ██╗ █████╗  ██████╗ ██████╗  █████╗ ███╗   ███╗
    ██║   ██║██║██╔════╝██║    ██║        ██╔══██╗██║██╔══██╗██╔════╝ ██╔══██╗██╔══██╗████╗ ████║
    ██║   ██║██║█████╗  ██║ █╗ ██║        ██║  ██║██║███████║██║  ███╗██████╔╝███████║██╔████╔██║
    ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║        ██║  ██║██║██╔══██║██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║
     ╚████╔╝ ██║███████╗╚███╔███╔╝███████╗██████╔╝██║██║  ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
      ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝


    PROJECT_NAME:    VIEW_DIAGRAM
    PROJECT_VERSION: 1.0 Beta
    WRITED_BY:       ANDRIUS LIZUNOVAS / SUIRDNA
    DATE:            22.11.2018

    
*/


/* ID[1]...................................... SCRIPT START ......................................*/

function start(select){             
    if(select != undefined){        
        if(select == 9999){         
            getServer();            
        }else{                      
            getServer(select);      
        }
    }else{                          
        getServer();                
    }
}

/* ID[2]..................... GETTING JSON DATA AND CONVERTING TO JAVASCRIPT ARRAY  ..............*/

/* ID[2][1][1]****************************** IF LISTBOX ITEM IS SELECTED [projektbereiche_auswahl.cfm] ******************************/

function getServer(select){
    
    if(select != undefined){                                                                       
        var database_projektbereiche_auswahl = new Array();                                  
        var ajax = new XMLHttpRequest();                                                     
        var method = "GET";
        var url = "http://local.serverliste2.de/expr/cfm/projektbereiche_auswahl.cfm";
        var sync = true;
        ajax.open(method, url, sync);                                                        
        ajax.send();                                                                         

        ajax.onreadystatechange = function(){                                            
            if (this.readyState == 4 && this.status == 200){                                 
                var data = JSON.parse(this.responseText);                                    

                for(var i=0; i < data.length; i++){
                    database_projektbereiche_auswahl[i] = data[i];                           
                }

                database_projektbereiche_auswahl[database_projektbereiche_auswahl.length] = [0,"UNBEKANNT"];                                                                                                    
                //console.log(database_projektbereiche_auswahl);
            }
        }

/* ID[2][1][2]*********************************** IF LISTBOX ITEM IS SELECTED [server.cfm] *****************************************/

        var database_projektbereiche_auswahl_2 = database_projektbereiche_auswahl;          
        var database_server = new Array();                                                  
        var serverLists_keycategory = new Array();                                          
        var ajax_2 = new XMLHttpRequest();                                                  
        var method_2 = "GET";
        var url_2 = "http://local.serverliste2.de/expr/cfm/server.cfm";
        var sync_2 = true;

        ajax_2.open(method_2, url_2, sync_2);
        ajax_2.send();                                                                      

        ajax_2.onreadystatechange = function(){                                             
            if (this.readyState == 4 && this.status == 200){                                
                var data = JSON.parse(this.responseText);                                   

                for(var i=0; i < data.length; i++){
                    database_server[i] = data[i];                                           
                }


                for(var a=0; a <= database_projektbereiche_auswahl.length -1; a++){
                    if(database_projektbereiche_auswahl[a][0] == select){					
                        serverLists_keycategory[a-a] = {key:"" + database_projektbereiche_auswahl[a][1] + "", category: "" + database_projektbereiche_auswahl[a][1] + "_T"};  	
                    }
                }
                
                var serverCount = 0;
                for(var a=0; a <= database_server.length-1; a++){
                    if((database_server[a][10] == false) && (database_server[a][11] == select)) {																				
                        serverLists_keycategory[serverLists_keycategory.length] = {key:"" + database_server[a][1] + "", category: "" + database_server[a][1] + "_T"};			
                        serverCount++;
                    }
                }
                
                var linkArray = new Array();

                for(var a=0; a <= database_server.length -1; a++){
                    for(var b=0; b <= database_projektbereiche_auswahl.length -1; b++){																								
                        if((database_server[a][11] == select) && (database_projektbereiche_auswahl[b][0] == select)){																
                            linkArray[a] = {from:"" + database_projektbereiche_auswahl[b][1] + "", to: "" + database_server[a][1] + ""};											
                        }else if(database_server[a][11] != select){																													
                            linkArray[a] = {from:"" + database_projektbereiche_auswahl[database_projektbereiche_auswahl.length-1][1] + "", to: "" + database_server[a][1] + ""};	
                        }else if(database_server[a][11] == ""){																														
                            linkArray[a] = {from:"" + database_projektbereiche_auswahl[database_projektbereiche_auswahl.length-1][1] + "", to: "" + database_server[a][1] + ""};
                        }
                    }
                }
                
                //console.log(linkArray);
                //console.log(serverLists_keycategory);
                init(database_projektbereiche_auswahl_2, database_server, serverLists_keycategory, linkArray) /* ARRAY BRIDGE[2] - SENDING ARRAYS TO THE FINAL FUNCTION */
            }
        }
    }else{
        
/* ID[2][2][1]****************************** IF LISTBOX ITEM IS NOT SELECTED [projektbereiche_auswahl.cfm] ******************************/
        
        var database_projektbereiche_auswahl = new Array();
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "http://local.serverliste2.de/expr/cfm/projektbereiche_auswahl.cfm";
        var sync = true;
        ajax.open(method, url, sync);
        ajax.send();

        ajax.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(this.responseText);

                for(var i=0; i < data.length; i++){
                    database_projektbereiche_auswahl[i] = data[i];
                }

                database_projektbereiche_auswahl[database_projektbereiche_auswahl.length] = [0,"UNBEKANNT"];
                //console.log(database_projektbereiche_auswahl);
            }


        }

/* ID[2][2][2]****************************** IF LISTBOX ITEM IS NOT SELECTED [server.cfm] **********************************************/

        var database_projektbereiche_auswahl_2 = database_projektbereiche_auswahl;



        var database_server = new Array();
        var serverLists_keycategory = new Array();
        var ajax_2 = new XMLHttpRequest();
        var method_2 = "GET";
        var url_2 = "http://local.serverliste2.de/expr/cfm/server.cfm";
        var sync_2 = true;

        ajax_2.open(method_2, url_2, sync_2);
        ajax_2.send();

        ajax_2.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(this.responseText);

                for(var i=0; i < data.length; i++){
                    database_server[i] = data[i];
                }

                for(var a=0; a <= database_projektbereiche_auswahl.length -1; a++){
                    serverLists_keycategory[a] = {key:"" + database_projektbereiche_auswahl[a][1] + "", category: "" + database_projektbereiche_auswahl[a][1] + "_T"};
                }

                var serverCount = 0;
                for(var a=0; a <= database_server.length-1; a++){
                    if(database_server[a][10] == false){
                        serverLists_keycategory[serverCount+database_projektbereiche_auswahl.length] = {key:"" + database_server[a][1] + "", category: "" + database_server[a][1] + "_T"};
                        serverCount++;
                    }
                }

                var linkArray = new Array();
                for(var a=0; a <= database_server.length -1; a++){
                    for(var x=0; x <= database_projektbereiche_auswahl.length -1; x++){ 
                        if(database_server[a][11] == database_projektbereiche_auswahl[x][0]){
                            linkArray[a] = {from:"" + database_projektbereiche_auswahl[x][1] + "", to: "" + database_server[a][1] + ""};
                        }else if(database_server[a][11] == ""){
                            linkArray[a] = {from:"" + database_projektbereiche_auswahl[x][1] + "", to: "" + database_server[a][1] + ""};
                        }
                    }
                }

                init(database_projektbereiche_auswahl_2, database_server, serverLists_keycategory, linkArray) /* ARRAY BRIDGE[2] - SENDING ARRAYS TO THE FINAL FUNCTION */
                //console.log(serverLists_keycategory);
            }
        }
     }
}

/* ID[3]................................................. GO.JS DIAGRAM TEMPLATE BILDER  ...................................................*/
/* ID[3][0]...................................... USING JAVASCRIPT ARRAY TO DESIGN THE DIAGRAM TEMPLATES  .....................................*/

function init(database_projektbereiche_auswahl_2, database_server, newArray_serverLists, linkArray){
    
    /* ARRAY BRIDGE DATA ARRAY */
    var projektbereiche = database_projektbereiche_auswahl_2;
    var serverlist = database_server;
    var newArray_serverLists_mod = newArray_serverLists;
    var newArray_link_mod = linkArray;
    
    //console.log(newArray_link_mod);
    
    /* ID[3][1]============================= GO.JS OBJECT INITIALIZATION ============================= */
    /* ID[3][1]============================= GO.JS OBJECT INITIALIZATION ============================= */
    
    var $ = go.GraphObject.make;
    var Diagram = $(go.Diagram, "view_Diagram", {initialContentAlignment: go.Spot.Center, initialAutoScale: go.Diagram.Uniform});
    
    /* ID[3][1]============================= GO.JS OBJECT INITIALIZATION ============================= */
    /* ID[3][1]============================= GO.JS OBJECT INITIALIZATION ============================= */
    
    /* ID[3][2]============================= PROJEKTBEREICH TEMPLATE ============================= */
    /* ID[3][2]============================= PROJEKTBEREICH TEMPLATE ============================= */
        
    for(var a=0; a <= projektbereiche.length -1; a++){   
        Diagram.nodeTemplateMap.add(projektbereiche[a][1]+ "_T", 
            $(go.Node, "Spot",
             $(go.Shape, "Circle", { fill:"white", strokeWidth:8, stroke:"#6e86c7", desiredSize: new go.Size(150,150)}),
             $(go.TextBlock, projektbereiche[a][1], {font:"normal normal bold 14pt Calibri"}))                           
        );
    }
    
    /* ID[3][2]============================= PROJEKTBEREICH TEMPLATE ============================= */
    /* ID[3][2]============================= PROJEKTBEREICH TEMPLATE ============================= */
    
    /* ID[3][3]============================= HOST SIMPLE TEMPLATE ============================= */
    /* ID[3][3]============================= HOST SIMPLE TEMPLATE ============================= */
    
    for(var a=0; a <= serverlist.length -1; a++){
        if((serverlist[a][10] == false) && (serverlist[a][9] == "" )){
            Diagram.nodeTemplateMap.add(serverlist[a][1]+"_T",
                $(go.Node, "Spot",
                 $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f", desiredSize:new go.Size(200,136)}),
                 $(go.Panel, "Vertical",
                   $(go.Panel, "Auto",
                     $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                     $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                    ),
                   $(go.Panel, "Vertical",
                     $(go.Panel,"Auto",
                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                            $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                      ),
                    $(go.Panel,"Auto",
                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                            $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                      ),
                    $(go.Panel,"Auto",
                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                            $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                      ),
                    ),
                   $(go.Panel, "Auto",
                     $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f", desiredSize:new go.Size(200,38)}),
                     $(go.TextBlock, serverlist[a][5], {font:"normal normal normal 12pt Calibri"})
                    )  
                    )       
                  )
            );
            
        }
    }

    /* ID[3][3]============================= HOST SIMPLE TEMPLATE ============================= */
    /* ID[3][3]============================= HOST SIMPLE TEMPLATE ============================= */
    
    /* ID[3][4]============================= HOST AND GUEST COMPLEX TEMPLATE ============================= */
    /* ID[3][4]============================= HOST AND GUEST COMPLEX TEMPLATE ============================= */
    
    for(var a=0; a <= serverlist.length -1; a++){
        if((serverlist[a][7] == "") && (serverlist[a][9] != "") && (serverlist[a][10] == false )){
            /*document.write("SERVER_ID: " + serverlist[a][0] + " | SERVER_NAME: " + serverlist[a][1] + " | SERVER_GAST_VON_ID: " + serverlist[a][7] + " | GAUESTE: " + serverlist[a][9] + " | SERVER_VIRTUELL: " + serverlist[a][10] + "<br>" );*/
            //var server_id = serverlist[a][0];*/
            var cout = 0;
            var serverCount = new Array();
            for(var b=0; b <= serverlist.length -1; b++){
                if((serverlist[b][7] == serverlist[a][0]) && (serverlist[b][10] == true)){
                    /*document.write("SERVER_ID: " + serverlist[a][0] + " | SERVER_NAME: " + serverlist[a][1] + " | SERVER_GAESTE: "  + serverlist[a][9] + " |>>>>>>>>| GAST_ID: " + serverlist[b][0] + " | GAST_NAME: " + serverlist[b][1] + " | GAST_GAST_VON_ID: " + serverlist[b][7] + "<br>" );*/
                    cout++;
                    
                    if(cout == 1){
                        serverCount[0] = serverlist[b][1];
                        serverCount[1] = serverlist[b][2];
                        serverCount[2] = serverlist[b][3];
                        serverCount[3] = serverlist[b][5];
                    }else if(cout == 2){
                        serverCount[4] = serverlist[b][1];
                        serverCount[5] = serverlist[b][2];
                        serverCount[6] = serverlist[b][3];
                        serverCount[7] = serverlist[b][5];
                    }else if(cout == 3){
                        serverCount[8] = serverlist[b][1];
                        serverCount[9] = serverlist[b][2];
                        serverCount[10] = serverlist[b][3];
                        serverCount[11] = serverlist[b][5];
                    }else if(cout == 4){
                        serverCount[12] = serverlist[b][1];
                        serverCount[13] = serverlist[b][2];
                        serverCount[14] = serverlist[b][3];
                        serverCount[15] = serverlist[b][5];
                    }
                    
                    switch(cout){
                        case 1: 
                            Diagram.nodeTemplateMap.add(serverlist[a][1] + "_T",
                                $(go.Node, "Auto",
                                    $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f"}),
                                     $(go.Panel, "Vertical",
                                       $(go.Panel, "Auto",
                                         $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                                         $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                                        ),
                                       $(go.Panel, "Vertical",
                                         $(go.Panel,"Auto",
                                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                                $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                                          ),
                                        $(go.Panel,"Auto",
                                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                                $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                                          ),
                                        $(go.Panel,"Auto",
                                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                                $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                                          ),
                                        ),
                                       $(go.Panel, "Vertical",
                                            $(go.Panel, "Vertical", {padding:5},
                                                $(go.Panel, "Auto",
                                                 $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                                 $(go.TextBlock, serverlist[b][1],{font:"normal small-caps bold 11pt Calibri"})),
                                                $(go.Panel, "Auto",
                                                 $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                                 $(go.TextBlock, serverlist[b][2],{font:"normal normal normal 10pt Calibri"})),
                                                $(go.Panel, "Auto",
                                                 $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                                 $(go.TextBlock, serverlist[b][3],{font:"normal normal normal 10pt Calibri"})),
                                                $(go.Panel, "Auto",
                                                 $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                                 $(go.TextBlock, serverlist[b][5],{font:"normal small-caps normal 11pt Calibri"})),
                                             )
                                         )
                                       )
                                  )
                                );
                    
                            break;
                        case 2:
                            Diagram.nodeTemplateMap.add(serverlist[a][1] + "_T",
                            $(go.Node, "Auto",
                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f"}),
                                 $(go.Panel, "Vertical",
                                   $(go.Panel, "Auto",
                                     $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                                     $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                                    ),
                                   $(go.Panel, "Vertical",
                                     $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    ),
                                   $(go.Panel, "Vertical",
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[0],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[1],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[2],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[3],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[4],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[5],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[6],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[7],{font:"normal small-caps normal 11pt Calibri"})),
                                         )
                                     )
                                   )
                              )
                            );
                            break;
                        case 3:
                            Diagram.nodeTemplateMap.add(serverlist[a][1] + "_T",
                            $(go.Node, "Auto",
                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f"}),
                                 $(go.Panel, "Vertical",
                                   $(go.Panel, "Auto",
                                     $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                                     $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                                    ),
                                   $(go.Panel, "Vertical",
                                     $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    ),
                                   $(go.Panel, "Vertical",
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[0],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[1],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[2],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[3],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[4],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[5],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[6],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[7],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[8],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[9],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[10],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[11],{font:"normal small-caps normal 11pt Calibri"})),
                                         )
                                     )
                                   )
                              )
                            );
                            break;
                        case 4:
                            Diagram.nodeTemplateMap.add(serverlist[a][1] + "_T",
                            $(go.Node, "Auto",
                                $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f"}),
                                 $(go.Panel, "Vertical",
                                   $(go.Panel, "Auto",
                                     $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                                     $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                                    ),
                                   $(go.Panel, "Vertical",
                                     $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    $(go.Panel,"Auto",
                                            $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                            $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                                      ),
                                    ),
                                   $(go.Panel, "Vertical",
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[0],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[1],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[2],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[3],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[4],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[5],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[6],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[7],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[8],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[9],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[10],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[11],{font:"normal small-caps normal 11pt Calibri"})),
                                         ),
                                        $(go.Panel, "Vertical", {padding:5},
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,38)}),
                                             $(go.TextBlock, serverCount[12],{font:"normal small-caps bold 11pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[13],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[14],{font:"normal normal normal 10pt Calibri"})),
                                            $(go.Panel, "Auto",
                                             $(go.Shape, "Rectangle",{fill:"#fcebdd", strokeWidth:1, desiredSize:new go.Size(200,20)}),
                                             $(go.TextBlock, serverCount[15],{font:"normal small-caps normal 11pt Calibri"})),
                                         )
                                    )  
                                    )       
                                  )
                            )
                            break;
                    }
                }else if(cout == 0){
                        Diagram.nodeTemplateMap.add(serverlist[a][1]+"_T",
                        $(go.Node, "Spot",
                         $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"5f799f", desiredSize:new go.Size(200,136)}),
                         $(go.Panel, "Vertical",
                           $(go.Panel, "Auto",
                             $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f",  desiredSize:new go.Size(200,38)}),
                             $(go.TextBlock, serverlist[a][1], {font:"normal small-caps bold 13pt Calibri"}) 
                            ),
                           $(go.Panel, "Vertical",
                             $(go.Panel,"Auto",
                                    $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                    $(go.TextBlock, serverlist[a][2], {font:"normal normal normal 10pt Calibri"})
                              ),
                            $(go.Panel,"Auto",
                                    $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                    $(go.TextBlock, serverlist[a][3], {font:"normal normal normal 10pt Calibri"})
                              ),
                            $(go.Panel,"Auto",
                                    $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:0, desiredSize:new go.Size(200,20)}),
                                    $(go.TextBlock, serverlist[a][4], {font:"normal normal normal 10pt Calibri"})
                              ),
                            ),
                           $(go.Panel, "Auto",
                             $(go.Shape, "Rectangle", {fill:"#dbeef3", strokeWidth:1, stroke:"#5f799f", desiredSize:new go.Size(200,38)}),
                             $(go.TextBlock, serverlist[a][5], {font:"normal normal normal 12pt Calibri"})
                            )  
                            )       
                          )
                    );
                }
            }
        }    
    }
    
    /* ID[3][4]============================= HOST AND GUEST COMPLEX TEMPLATE ============================= */
    /* ID[3][4]============================= HOST AND GUEST COMPLEX TEMPLATE ============================= */
    
    /* ID[3][5]============================= NODE_DATA_ARRAY + LINK_DATA_ARRAY CONNECTING WITH GO.OBJECT ============================= */
    /* ID[3][5]============================= NODE_DATA_ARRAY + LINK_DATA_ARRAY CONNECTING WITH GO.OBJECT ============================= */
    
    Diagram.model.nodeDataArray = newArray_serverLists_mod;
    Diagram.model.linkDataArray = newArray_link_mod;
    
    /* ID[3][5]============================= NODE_DATA_ARRAY + LINK_DATA_ARRAY CONNECTING WITH GO.OBJECT ============================= */
    /* ID[3][5]============================= NODE_DATA_ARRAY + LINK_DATA_ARRAY CONNECTING WITH GO.OBJECT ============================= */
    
    /* ID[3][6]============================= SETTING UP POSITION STYLE FOR GO.OBJECT ============================= */
    /* ID[3][6]============================= SETTING UP POSITION STYLE FOR GO.OBJECT ============================= */

    Diagram.layout = new go.ForceDirectedLayout();
    
    /* ID[3][6]============================= SETTING UP POSITION STYLE FOR GO.OBJECT ============================= */
    /* ID[3][6]============================= SETTING UP POSITION STYLE FOR GO.OBJECT ============================= */
}