import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


class PurchaseItem extends Model {

    declare id: string;
    declare purchase_id: string;
    declare medicine_id: string;
    declare quantity: number;
    declare price: string | number;
    declare created_at: Date;
}


PurchaseItem.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },


    purchase_id: {
        type: DataTypes.UUID,
        allowNull: false
    },


    medicine_id: {
        type: DataTypes.UUID,
        allowNull: false
    },


    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },


    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },


    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
    {
        sequelize,
        tableName: "purchase_items",
        timestamps: false
    }
)


export default PurchaseItem;