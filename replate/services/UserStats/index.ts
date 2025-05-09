import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";


async function requestDB_user_num_donations(name: string): Promise<Number | null>{
    try{
        const dbResponse = await fetch(`[db_URL HERE]`, {
            method: "POST",
            body: JSON.stringify({ requestType: "numDonations", data: {name: name}})

        });

        if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);
        const { numDonations } = await dbResponse.json();
        return numDonations
    }
    catch(err){
        //
        return null
    }
}

async function requestDB_user_num_recieved(name: string): Promise<Number | null>{
    try{
        const dbResponse = await fetch(`[db_URL HERE]`, {
            method: "POST",
            body: JSON.stringify({ requestType: "numRecieved", data: {name: name}})

        });

        if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);
        const { numRecieved } = await dbResponse.json();
        return numRecieved
    }
    catch(err){
        //
        return null
    }
}

async function requestDB_Locations_Visited(name: string): Promise<Number | null>{
    try{
        const dbResponse = await fetch(`[db_URL HERE]`, {
            method: "POST",
            body: JSON.stringify({ requestType: "numVisited", data: {name: name}})

        });

        if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);
        const { numVisited } = await dbResponse.json();
        return numVisited
    }
    catch(err){
        //
        return null
    }
}

async function requestDB_Donations_Planned(name: string): Promise<Number | null>{
    try{
        const dbResponse = await fetch(`[db_URL HERE]`, {
            method: "POST",
            body: JSON.stringify({ requestType: "plannedDonations", data: {name: name}})

        });

        if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);
        const { numPlanned } = await dbResponse.json();
        return numPlanned
    }
    catch(err){
        //
        return null
    }
}