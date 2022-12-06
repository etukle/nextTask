import { NextFunction, Request, Response } from 'express';
import { SongInstance } from '../models/songModel';
var sqlite3 = require('sqlite3').verbose();
var sqlite = require('sqlite');

async function connect() {
    return sqlite.open({
        filename: 'database.sqlite',
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE
    });
}

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
    const term = req.body.search_term;
    const offset = req.body.offset;
    try {
        const query = `SELECT * FROM songs WHERE
        title LIKE '%${term}%' OR
        artist LIKE '%${term}%' OR
        album LIKE '%${term}%' LIMIT 10 OFFSET ${offset}`;

        const result = await connect().then(function (db) {
            return db.all(query).then((rows: any) => {
                return rows;
            });
        });
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};

export default { getSongs };
