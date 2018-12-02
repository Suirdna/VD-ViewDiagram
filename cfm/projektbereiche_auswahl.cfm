<cfset projektbereiche_auswahl = ArrayNew(2)/>

<cfquery name ="projektbereiche_auswahl_object" datasource="#application.datasource#">
    SELECT id, name
    FROM serverliste.projektbereiche_auswahl
</cfquery>

<cfloop query = "projektbereiche_auswahl_object">
    <cfset projektbereiche_auswahl[CurrentRow][1] = id/>
    <cfset projektbereiche_auswahl[CurrentRow][2] = name/>
</cfloop>

<cfscript>
    projektbereiche_auswahl_json = serialize(projektbereiche_auswahl);
    writeoutput(projektbereiche_auswahl_json);
</cfscript>