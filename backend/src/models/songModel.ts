import { Model, DataTypes } from 'sequelize';
import db from '../config/databaseConfig';

interface SongAttributes {
    id: string;
    title: string;
    artist: string;
    album: string;
}

export class SongInstance extends Model<SongAttributes> {}

SongInstance.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: 'top1000_songs'
    }
);
