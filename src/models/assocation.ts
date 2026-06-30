import Medicine from "./medicine.model";
import Category from "./category.model";
import StockTransaction from "./stock.model";


Category.hasMany(Medicine,{
    foreignKey:"category_id",
    as:"medicines"
});


Medicine.belongsTo(Category,{
    foreignKey:"category_id",
    as:"category"
});

Medicine.hasMany(StockTransaction,{
 foreignKey:"medicine_id",
 as:"stock_history"
})


StockTransaction.belongsTo(Medicine,{
 foreignKey:"medicine_id",
 as:"medicine"
})