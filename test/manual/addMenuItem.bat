@echo off
if [%1] == [] goto missingjsoninput
echo %1
curl -H "Content-Type:application/json" -X POST -d %1  https://tue9tii5q1.execute-api.us-west-2.amazonaws.com/Prod/menuitems
goto exit

:missingjsoninput
    echo       json input missing ex: {\"name\": \"pasta\"}
:exit

    