import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Medicine extends Model {
    declare id: string;
    declare name: string;
    declare company: string;
    declare price: string | number;
    declare quantity: number;
    declare expiry_date: Date;
    declare category_id: string;
    declare created_at: Date;
    declare updated_at: Date;
}

Medicine.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        company: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },

        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        category_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        },

        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW()
        }
    },
    {
        sequelize,
        tableName: "medicines",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)

export default Medicine;