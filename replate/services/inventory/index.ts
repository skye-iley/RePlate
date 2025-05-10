import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();

async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const { item_name, quantity, donor_id, location } = req.body;

    const dbResponse = await fetch("http://sql-service:PORT/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "insertInventory",
        data: { item_name, quantity, donor_id, location },
      }),
    });

    if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);

    const { insertedItem } = await dbResponse.json();
    res.json(insertedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
}

async function getAllItems(_req: Request, res: Response): Promise<void> {
  try {
    const dbResponse = await fetch("http://sql-service:PORT/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "getAllInventory",
      }),
    });

    if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);

    const { items } = await dbResponse.json();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
}

async function updateItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { item_name, quantity, donor_id, location } = req.body;

    const dbResponse = await fetch("http://sql-service:PORT/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "updateInventory",
        data: { id, item_name, quantity, donor_id, location },
      }),
    });

    if (!dbResponse.ok) throw new Error(`Status ${dbResponse.status}`);

    const { updatedItem } = await dbResponse.json();
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
}
