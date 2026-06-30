import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


class Purchase extends Model {
    declare id: string;
    declare supplier_id: string;
    declare total_amount: string | number;
    declare purchase_date: Date;
    declare created_at: Date;
    declare updated_at: Date;
}

Purchase.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },


    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false
    },


    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },


    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
        tableName: "purchases",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"

    }
)


export default Purchase;