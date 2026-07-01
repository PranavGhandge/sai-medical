import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import SaleItem from "./sale_item.model";


class Sale extends Model {
    declare id: string;
    declare customer_name: string;
    declare customer_phone: string;
    declare total_amount: string | number;
    declare sale_date: Date;
    declare created_at: Date;
    declare updated_at: Date;
    declare items: SaleItem[]
}


Sale.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    customer_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    sale_date: {
        type: DataTypes.DATE,
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
        tableName: "sales",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)


export default Sale;