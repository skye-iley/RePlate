import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";


async function requestDB_user_num_donations(name: string): Promise<int | null>{
    try{
        const dbResponse = await fetch(`[db_URL HERE]`, {
            method: "POST",
            body: JSON.stringify({ requestType: "numDonations", name: name})

        });

        if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);
        const { numDonations } = await dbResponse.json();

    }
    catch(err){
        log.error(`Could not find user ${name}: ${(err as Error).message}`);
        return null
    }
}