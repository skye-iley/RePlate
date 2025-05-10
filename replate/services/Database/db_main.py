import os
from fastapi import FastAPI, Request
from pydantic import BaseModel
from contextlib import asynccontextmanager
import asyncio
import sqlite3

# stores name of columns for tables in order to correctly add new rows
tableColumns = {}

# connecting to the SQLite database
con = sqlite3.connect("replate.db")
cur = con.cursor()

# code to create a table
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
# Inserts a row into the database
def insertRow(table_name, values):
    for value in values:
        valString = ""
        for sub_val in value:
            valString = valString + sub_val + ", "
        valString = valString[:-2]
        cur.execute("""INSERT INTO {table_name} ({columnString}) VALUES ({valString});""".format(table_name=table_name, columnString=tableColumns[table_name], valString=valString))



# Standardized format for requests to the database
class Message(BaseModel):
    requestType: str
    data: object

# creates the API
app = FastAPI()

# MICROSERVICE REQUEST HANDLING
@app.post("/")
async def enrich(message: Message, request: Request):
    # if we are asking for the number of donations a user has made, this queries the database for that.
    if (message.requestType == "numDonations"):
        tblName = "userDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numDonations = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numDonations
        }
    # if we are asking for the number of food items a user has recieved, this queries the database for that.
    elif (message.requestType == "numRecieved"):
        tblName = "userTransactions"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numRecieved
        }
    # if we are asking for the number of locations a user has visited, this queries the database for that.
    elif (message.requestType == "numVisited"):
        tblName = "userDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(DISTINCT Location)"], condition)[0]

        return {
            numRecieved
        }
    # if we are asking for the number of planned donations a user has indicated, this queries the database for that.
    elif (message.requestType == "numPlanned"):
        tblName = "plannedDonations"
        name = message.data.name
        condition = "name = \"" + name + "\""
        numRecieved = getValuesQuery(tblName, ["COUNT(*)"], condition)[0]

        return {
            numRecieved
        }
    # if we are asking for the stock at a certain location, this queries the database for that.
    elif (message.requestType == "locationIndex"):
        tblName = "Stock"
        locationIndex = message.data.locationIndex
        condition = "locationIndex = \"" + locationIndex + "\""
        locationStock = getValuesQuery(tblName, ["*"], condition)

        return {
            locationStock
        }
    # if we are asking to check whether a certain login's password matches the one on file, this queries the database for that.
    elif (message.requestType =="checkLogin"):
        table_name = "Auth"
        name = message.data.name
        passwd = message.data.password
        returnVal = "CASE WHEN Password = \"" + passwd + "\" THEN true ELSE false END"
        condition = "name = \"" + name + "\""
        ans = getValuesQuery(table_name, returnVal, condition)[0]
        return { ans }

    # if the request type is invalid, we simply return None
    return None
    