import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


class Supplier extends Model {
    declare id: string;
    declare name: string;
    declare phone: string;
    declare email: string;
    declare address: string;
    declare created_at: Date;
    declare updated_at: Date;
}


Supplier.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
    {
        sequelize,
        tableName: "suppliers",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)


export default Supplier;