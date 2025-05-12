import { Request, Response } from "express";

const DB_URL = "http://Database:3000/";


export const getPlannedDonations = async (req: Request, res: Response) => {
  const name = req.params.userId;

  try {
    const dbResponse = await fetch(DB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "numPlanned",
        data: { name }
      })
    });

    const data = await dbResponse.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch planned donations" });
  }
};

export const addPlannedDonation = async (req: Request, res: Response) => {
  const { name, foodType, location, date } = req.body;

  try {
    const dbResponse = await fetch(DB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "insert",
        data: {
          tableName: "plannedDonations",
          values: [[`"${name}"`, `"${foodType}"`, `"${location}"`, `"${date}"`]]
        }
      })
    });

    if (!dbResponse.ok) {
      throw new Error("DB insertion failed");
    }

    res.status(200).json({ message: "Planned donation added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add planned donation." });
  }
};


export const deletePlannedDonation = async (req: Request, res: Response) => {
  const { name, foodType, location, date } = req.body;

  const condition = `name = "${name}" AND foodType = "${foodType}" AND location = "${location}" AND date = "${date}"`;

  try {
    const dbResponse = await fetch(DB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "delete",
        data: {
          tableName: "plannedDonations",
          condition: condition
        }
      })
    });

    if (!dbResponse.ok) {
      throw new Error("DB deletion failed");
    }

    res.status(200).json({ message: "Planned donation deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete planned donation." });
  }
};
