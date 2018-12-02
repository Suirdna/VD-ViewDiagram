<cfquery name ="object" datasource="#application.datasource#">
    SELECT s.id, s.servername, ipadressen.ip as ipaddress, s.betriebssystem, to_char(s.kaufdatum, 'dd.mm.yyyy') as kaufdate, s.serverfunktion_fk, serverfunktion_auswahl.bezeichnung as serverfunktion, s.gast_von_id, ipadressen.haupt_ip as haupt_ip, gaeste, virtuell, projektbereich_fk
    FROM serverliste.server s 
    LEFT JOIN serverliste.serverfunktion_auswahl on s.id = serverliste.serverfunktion_auswahl.id
    LEFT JOIN serverliste.ipadressen on s.id = serverliste.ipadressen.server_fk
    and serverliste.ipadressen.haupt_ip = 1 
    where servername not like '%AUSLESER%'
</cfquery>

<cfset DATA = ArrayNew(2)/>

<cfloop query = "object">
    <cfset DATA[CurrentRow][1] = id/> 
    <cfset DATA[CurrentRow][2] = servername/>
    <cfset DATA[CurrentRow][3] = ipaddress/>
    <cfset DATA[CurrentRow][4] = betriebssystem/>
    <cfset DATA[CurrentRow][5] = kaufdate/>
    <cfset DATA[CurrentRow][6] = serverfunktion/>
    <cfset DATA[CurrentRow][7] = serverfunktion_fk/>
    <cfset DATA[CurrentRow][8] = gast_von_id/>
    <cfset DATA[CurrentRow][9] = haupt_ip/>
    <cfset DATA[CurrentRow][10] = gaeste/>
    <cfset DATA[CurrentRow][11] = virtuell/>
    <cfset DATA[CurrentRow][12] = projektbereich_fk/>
</cfloop>

<cfscript>
    jsonData = serializeJSON(DATA);
    writeoutput(jsonData);
</cfscript>

