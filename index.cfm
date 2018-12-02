<cfquery name="object" datasource="#application.datasource#">
    SELECT id, name
    FROM serverliste.projektbereiche_auswahl
</cfquery>

<!DOCTYPE html>
<html>
<head>
    <title>view_Diagram</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=2.0"/>
    <link rel="stylesheet" href="./style.css" type="text/css"/>
    <script src="./javascript/go.js"></script>
    <script src="./javascript/view_Diagram_Beta_1.0.js"></script>
</head>
<body onload="check()">
    <div class="view_Header">
        <div class="functionPanel">
            <div id="logo_image"></div>
        </div>
        <div class="functionPanel">
            <select id="getPDBody">
                <option name="choose" value = "9999">Alle Bereiche</option>
                    <cfloop query="object">
                        <cfoutput><option name="choose" value = "#id#">#name#</option></cfoutput>
                    </cfloop>
                <option name="choose" value = "0">Unbekannt</option>
            </select>
            <div class="button" onclick="location.reload();">
                SHOW
            </div>
        </div>
    </div>
    <div id="view_Diagram"></div>
</body> 
</html>

<script type="text/javascript"> 
    function check(){
        var e = document.getElementById('getPDBody');
        var element_block_value = e.options[e.selectedIndex].value;
        localStorage.setItem("value", element_block_value);
        start(localStorage.getItem('value'));
    }
</script> 