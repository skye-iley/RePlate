import os
from fastapi import FastAPI, Request
from pydantic import BaseModel
from contextlib import asynccontextmanager
import asyncio
import sqlite3

tableColumns = {}

con = sqlite3.connect("replate.db")
cur = con.cursor()

def create_table(columns, table_name):
    columnString = ""
    for column in columns:
        columnString = columnString + column + ", "
    columnString = columnString[:-2]

    tableColumns[table_name] = columnString

    cur.execute("""CREATE TABLE IF NOT EXISTS {table_name} ({columnString});""".format(table_name=table_name,columnString=columnString))

#-------------- Microservices Below -------------------

# Gets column values from table rows where condition is met
# condition should be a string in the format "column1 = checkVal1, column2 = checkVal2, etc.". Use proper SQL syntax
def getValuesQuery(table_name, return_columns, condition):
    ans = []
    columnString = ""
    for column in return_columns:
        columnString = columnString + column + ", "
    columnString = columnString[:-2]
    for row in cur.execute("""SELECT {columnString} FROM {table_name} WHERE {condition};""".format(columnString=columnString,table_name=table_name, condition=condition)):
        ans.append(row)
        # may need to do some parsing here
    return ans

# Make sure values is in the same order as sql
def insertRow(table_name, values):
    for value in values:
        valString = ""
        for sub_val in value:
            valString = valString + sub_val + ", "
        valString = valString[:-2]
        cur.execute("""INSERT INTO {table_name} ({columnString}) VALUES ({valString});""".format(table_name=table_name, columnString=tableColumns[table_name], valString=valString))

# ADD ADDITIONAL REQUESTS/CHANGES DEPENDING ON WHAT PPL NEED.





class Message(BaseModel):
    requestType: str
    data: object

app = FastAPI()

@app.post("/")
# MICROSERVICE REQUEST HANDLING
async def enrich(message: Message, request: Request):
    if (message.requestType == "numDonations"):
        tblName = "userDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numDonations = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numDonations
        }
    elif (message.requestType == "numRecieved"):
        tblName = "userTransactions"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numRecieved
        }
    elif (message.requestType == "numVisited"):
        tblName = "userDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(DISTINCT Location)"], condition)[0]

        return {
            numRecieved
        }
    elif (message.requestType == "numPlanned"):
        tblName = "plannedDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numRecieved
        }
    elif (message.requestType == "locationIndex"):
        tblName = "Stock"
        locationIndex = message.data.locationIndex
        condition = "locationIndex = \"" + locationIndex + "\""
        locationStock = getValuesQuery(tblName, ["*"], condition)

        return {
            locationStock
        }
    elif (message.requestType =="checkLogin"):
        table_name = "Auth"
        name = message.data.name
        passwd = message.data.password
        returnVal = "CASE WHEN Password = \"" + passwd + "\" THEN true ELSE false END"
        condition = "name = \"" + name + "\""
        ans = getValuesQuery(table_name, returnVal, condition)[0]
        return { ans }


    return None
    