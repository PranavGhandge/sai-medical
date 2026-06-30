import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
    declare id: string;
    declare name: string;
    declare created_at: Date;
    declare updated_at: Date;
}

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
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
        tableName: "categories",
        timestamps: false
    }
)

export default Category;