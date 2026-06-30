import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class StockTransaction extends Model {
    declare id: string;
    declare medicine_id: string;
    declare type: string;
    declare quantity: number;
    declare created_at: Date;
}

StockTransaction.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    medicine_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM("IN", "OUT"),
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
    }
},

    {
        sequelize,
        tableName: "stock_transaction",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"

    }
);

export default StockTransaction;