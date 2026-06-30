import Medicine from "./medicine.model";
import Category from "./category.model";


Category.hasMany(Medicine,{
    foreignKey:"category_id",
    as:"medicines"
});


Medicine.belongsTo(Category,{
    foreignKey:"category_id",
    as:"category"
});